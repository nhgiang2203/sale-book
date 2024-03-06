import { Router } from "express";

const router: Router = Router();

import * as controller from "../../controllers/admin/book.controller";

router.get('/', controller.index);

export const bookRoutes: Router = router;