import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/admin/dashboard.controller"

router.get('/', controller.dashboard);

const dashboardRoutes = router;
export default dashboardRoutes;