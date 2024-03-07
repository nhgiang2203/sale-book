import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/client/home-page.controller";

router.get("/", controller.index);

export const homePageRoute = router;