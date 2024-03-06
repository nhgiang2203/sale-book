import { Router } from 'express';
const router: Router = Router();

import * as controller from '../../controllers/client/order.controller';
import * as middleware from '../../middlewares/client/auth.middleware';

router.post('/', middleware.requireAuth, controller.order);
router.get('/success', controller.success);

export const orderRoutes = router;