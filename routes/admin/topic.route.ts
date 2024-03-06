import { Router } from "express";
import multer from "multer";
const router: Router = Router();
const upload = multer();

import * as middleware from "../../middlewares/admin/uploadToCloudinary.middleware";
import * as controller from "../../controllers/admin/topic.controller";

router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create', upload.single("thumbnail"), middleware.uploadSingle, controller.createPost);
router.get('/detail/:id', controller.detail);
router.get('/edit/:id', controller.edit);
router.patch('/edit/:id', upload.single("thumbnail"), middleware.uploadSingle, controller.editPatch);
router.delete('/delete/:id', controller.deleteItem);

const topicRoutes = router;
export default topicRoutes;