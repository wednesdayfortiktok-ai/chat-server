const io = require('socket.io')(3000, {
    cors: { origin: '*' }
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // ฟังก์ชันกระจายข่าว (ส่งมันทั้ง 2 ชื่อเลย กันพลาด)
    const broadcastMessage = (msg) => {
        console.log('Broadcasting:', msg);
        io.emit('chat message', msg); // ส่งให้แอปเวอร์ชั่นใหม่
        io.emit('message', msg);      // ส่งให้แอปเวอร์ชั่นเก่า
    };

    // 1. ถ้าแอปส่งมาชื่อ 'chat message'
    socket.on('chat message', (msg) => {
        broadcastMessage(msg);
    });

    // 2. ถ้าแอปส่งมาชื่อ 'message'
    socket.on('message', (msg) => {
        broadcastMessage(msg);
    });
});

console.log('Server started on port 3000');