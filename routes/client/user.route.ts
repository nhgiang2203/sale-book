import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/client/user.controller"
import * as validate from "../../validate/client/user.validate"

router.get('/register', controller.register);
router.post('/register', validate.registerPost, controller.registerPost);
router.get('/login', controller.login);
router.post('/login', validate.loginPost, controller.loginPost);
router.get('/logout', controller.logout);

export const userRoutes: Router = router;
