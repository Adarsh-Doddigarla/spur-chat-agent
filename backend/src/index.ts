import "dotenv/config";
import { config } from "./config/env";
import { logger } from "./lib/logger";
import app from "./app";

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});