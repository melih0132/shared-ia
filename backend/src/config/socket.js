import jwt from 'jsonwebtoken';
import { pool } from './database.js';

// Stockage des utilisateurs connectés : userId -> socketId
const connectedUsers = new Map();
let ioInstance = null;

// Middleware d'authentification Socket.io
export function setupSocketIO(io) {
  ioInstance = io;
  // Middleware d'authentification
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return next(new Error('Token manquant'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Vérifier que l'utilisateur existe toujours
      const result = await pool.query('SELECT id, username FROM users WHERE id = $1', [decoded.userId]);
      
      if (result.rows.length === 0) {
        return next(new Error('Utilisateur introuvable'));
      }

      socket.userId = decoded.userId;
      socket.username = result.rows[0].username;
      next();
    } catch (error) {
      next(new Error('Token invalide'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`Utilisateur connecte: ${socket.username} (${socket.userId})`);
    connectedUsers.set(socket.userId, socket.id);

    // Émettre la connexion réussie
    socket.emit('authenticated', { userId: socket.userId, username: socket.username });

    // Gestion des rooms
    socket.on('join-room', async (roomId) => {
      try {
        // Vérifier que l'utilisateur est membre de la room
        const result = await pool.query(
          'SELECT * FROM room_members WHERE user_id = $1 AND room_id = $2',
          [socket.userId, roomId]
        );

        if (result.rows.length === 0) {
          socket.emit('error', { message: 'Vous n\'etes pas membre de cette room' });
          return;
        }

        socket.join(`room:${roomId}`);
        console.log(`${socket.username} a rejoint la room ${roomId}`);

        // Récupérer les infos de la room
        const roomResult = await pool.query(
          `SELECT r.*, 
            json_agg(json_build_object('id', u.id, 'username', u.username, 'role', rm.role)) as members
           FROM rooms r
           LEFT JOIN room_members rm ON r.id = rm.room_id
           LEFT JOIN users u ON rm.user_id = u.id
           WHERE r.id = $1
           GROUP BY r.id`,
          [roomId]
        );

        // Récupérer les messages
        const messagesResult = await pool.query(
          `SELECT m.*, u.username, rm.role
           FROM messages m
           LEFT JOIN users u ON m.user_id = u.id
           LEFT JOIN room_members rm ON m.user_id = rm.user_id AND m.room_id = rm.room_id
           WHERE m.room_id = $1
           ORDER BY m.created_at ASC
           LIMIT 50`,
          [roomId]
        );

        socket.emit('room-joined', {
          room: roomResult.rows[0],
          members: roomResult.rows[0]?.members || [],
          messages: messagesResult.rows,
        });
      } catch (error) {
        console.error('Erreur lors de la jointure à la room:', error);
        socket.emit('error', { message: 'Erreur lors de la jointure à la room' });
      }
    });

    socket.on('leave-room', (roomId) => {
      socket.leave(`room:${roomId}`);
      console.log(`${socket.username} a quitte la room ${roomId}`);
    });

    // Gestion des messages (sera implémenté dans les prochaines phases)
    socket.on('send-message', async (data) => {
      // TODO: Implémenter dans Phase 3
      console.log('send-message recu:', data);
    });

    socket.on('disconnect', () => {
      console.log(`Utilisateur deconnecte: ${socket.username} (${socket.userId})`);
      connectedUsers.delete(socket.userId);
    });
  });

  return io;
}

// Helper pour obtenir le socket d'un utilisateur
export function getUserSocket(userId) {
  if (!ioInstance) return null;
  const socketId = connectedUsers.get(userId);
  return socketId ? ioInstance.sockets.sockets.get(socketId) : null;
}

