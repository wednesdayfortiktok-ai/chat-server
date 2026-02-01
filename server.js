const io = require('socket.io')(3000, { cors: { origin: '*' } });
let inbox = {};
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('join', (id) => { inbox[id] = inbox[id] || []; });
  socket.on('send_offline', (data) => {
    if (inbox[data.targetId]) inbox[data.targetId].push(data.encryptedContent);
  });
  socket.on('check_inbox', (id) => {
    socket.emit('receive_offline', inbox[id] || []);
    inbox[id] = [];
  });
});
console.log('Server started on port 3000');
