import { createServer } from "node:http";

import { createRequestListener } from "@react-router/node";
import * as build from "./build/server/index.js";

const port = Number.parseInt(process.env.PORT ?? "3000", 10);
const mode = process.env.NODE_ENV ?? "production";

const server = createServer(
  createRequestListener({
    build,
    mode,
    getLoadContext: () => ({ env: process.env }),
  }),
);

const shutdown = (signal) => {
  console.log(`Received ${signal}, shutting down`);
  server.close(() => {
    process.exit(0);
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
