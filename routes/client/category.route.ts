import { Router } from 'express';
const router: Router = Router();

import * as controller from '../../controllers/client/category.controller';
import * as middleware from '../../middlewares/client/auth.middleware';

router.get('/detail/:bookId/:typeBook', controller.detail);

export const categoryRoutes = router;