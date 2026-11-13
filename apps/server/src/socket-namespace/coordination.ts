import { Server } from "socket.io";
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "@repo/types/socket-namespaces/coordination";

export default function registerCoordinate(
  io: Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
) {
  const chat = io.of("/coordinate");

  chat.on("connection", (socket) => {
    console.log("Chat connected:", socket.id);

    socket.on("send-coordinate", () => {
      socket.emit("coordinate-sent");
    });

    socket.on("disconnect", () => {
      console.log("Chat disconnected:", socket.id);
    });
  });
}
