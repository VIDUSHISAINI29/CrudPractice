import {Router} from "express";
import { getSingleStudentData } from "../../controller/studentsController/singleStudentDataController.js";

const router = Router();

router.get('/',getSingleStudentData);

export default router;