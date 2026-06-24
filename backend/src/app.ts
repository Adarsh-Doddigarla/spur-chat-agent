import express from "express";
import cors from "cors";
import { config } from "./config/env";
import healthRouter from "./routes/health";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(cors({ origin: config.ALLOWED_ORIGIN }));

app.use("/health", healthRouter);

app.use(errorHandler);

export default app;