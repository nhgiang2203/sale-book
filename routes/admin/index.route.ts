import { Express } from "express";
import { systemConfig } from "../../config/config";

import dashboardRoutes from "./dashboard.route";
import topicRoutes from "./topic.route";
import { bookRoutes } from "./book.route";

const adminRoutes = (app: Express) => {
  const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

  app.use(`${PATH_ADMIN}/dashboard`, dashboardRoutes);
  app.use(`${PATH_ADMIN}/topics`, topicRoutes);
  app.use(`${PATH_ADMIN}/books`, bookRoutes);
}

export default adminRoutes;