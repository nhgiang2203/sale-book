import { Router } from 'express';
const router: Router = Router();

import * as controller from '../../controllers/client/cart.controller';
import * as middleware from '../../middlewares/client/auth.middleware';

router.get('/', middleware.requireAuth, controller.index);
router.post('/list-json', controller.listJson);


export const cartRoutes = router;