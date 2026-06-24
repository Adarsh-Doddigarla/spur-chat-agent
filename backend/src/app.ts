import express from "express";
import cors from "cors";
import { config } from "./config/env";
import healthRouter from "./routes/health";
import chatRouter from "./routes/chat";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(cors({ origin: config.ALLOWED_ORIGIN }));

app.use("/health", healthRouter);
app.use("/chat", chatRouter);

app.use(errorHandler);

export default app;