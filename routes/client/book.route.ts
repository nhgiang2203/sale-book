import { Router } from 'express';
const router: Router = Router();

import * as controller from '../../controllers/client/book.controller';

router.get('/:slugCategory', controller.index);
router.get('/detail/:bookId', controller.info);

export const bookRoutes = router;