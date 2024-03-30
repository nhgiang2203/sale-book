import { Router } from "express";
import multer from "multer";
const router: Router = Router();
const upload = multer();

import * as controller from "../../controllers/admin/book.controller";
import * as middleware from "../../middlewares/admin/uploadToCloudinary.middleware";

router.get('/', controller.index);
router.get('/edit/:id/:typeBook', controller.edit);
router.patch('/edit/:id/:typeBook',upload.single("thumbnail"), middleware.uploadSingle, controller.editPatch);
router.get('/create', controller.create);
router.post('/create', upload.single("thumbnail"), middleware.uploadSingle, controller.createPost);
router.get('/detail/:id/:typeBook', controller.detail);
router.delete('/delete/:id/:typeBook', controller.deleteBook);

export const bookRoutes: Router = router;