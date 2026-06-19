module.exports = function initSockets(io) {
  io.on("connection", (socket) => {
    socket.on("join", (room) => socket.join(room));
    socket.on("partner:location", ({ partnerId, lat, lng }) => {
      io.emit(`partner:${partnerId}:location`, { lat, lng });
    });
    socket.on("order:track", (orderId) => socket.join(`order:${orderId}`));
  });
  console.log("[socket.io] initialized");
};
