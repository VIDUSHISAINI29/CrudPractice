import express from "express";
import studentRoutesIndex from './studentsRoutes/index.js'

const router = express.Router();

router.get('/', studentRoutesIndex);

export default router;