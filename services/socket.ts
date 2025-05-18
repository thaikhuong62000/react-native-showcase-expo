import { io } from "socket.io-client";

const socket = io("http://18.141.121.121");

const join = (id: string) => {
  socket.emit("join", { id });
};

const send = (senderId: string, message: string) => {
  socket.emit("chat", { id: senderId, message });
};

const invite = (id: string, senderId: string) => {
  socket.emit("invite", { id, message: senderId });
};

const on = (ev: "chat" | "invite", cb: (data: string) => void) => {
  socket.on(ev, cb);
  return () => {
    socket.off(ev, cb);
  };
};

const onAny = () => {
  const cb = (ev: any, args: any) => {
    console.log(ev, args);
  };

  socket.onAny(cb);
  return () => {
    socket.offAny(cb);
  };
};

export const AppSocket = {
  socket,
  join,
  send,
  invite,
  on,
  onAny,
};
