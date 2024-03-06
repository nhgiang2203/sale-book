import { Router } from 'express';
const router: Router = Router();

import * as controller from '../../controllers/client/category.controller';

router.get('/detail/:bookId/:typeBook', controller.detail);

export const categoryRoutes = router;