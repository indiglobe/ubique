import z from "zod";

const serverToClientEvents = z.object({
  "coordinate-sent": z.function({
    input: [],
    output: z.void(),
  }),
});

type ServerToClientEvents = z.infer<typeof serverToClientEvents>;

const clientToServerEvents = z.object({
  "send-coordinate": z.function({
    input: [],
    output: z.void(),
  }),
});

type ClientToServerEvents = z.infer<typeof clientToServerEvents>;

const interServerEvents = z.object({
  ping: z.function({
    input: [],
    output: z.void(),
  }),
});

type InterServerEvents = z.infer<typeof interServerEvents>;

const socketData = z.object({});

type SocketData = z.infer<typeof socketData>;

export type {
  //

  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
};
