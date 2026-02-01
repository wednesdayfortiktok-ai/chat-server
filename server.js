const io = require('socket.io')(3000, {
    cors: { origin: '*' }
});

io.on('connection', (socket) => {
    // 1. แจ้งเตือนเมื่อมีคนเข้า
    console.log('User connected:', socket.id);

    // 2. รอรับข้อความ (ชื่อช่อง 'message')
    socket.on('chat message', (msg) => {
        console.log('ข้อความเข้า:', msg); // โชว์ใน Log ให้เราเห็น
        io.emit('message', msg);         // ส่งต่อให้ทุกคนในห้องเห็น
    });
});

console.log('Server started on port 3000');