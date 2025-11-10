import express from "express";
import {generateImage} from '../controllers/imgController.js'
import { userAuth } from "../middleware/auth.js";

const imgRouter = express.Router();


imgRouter.post('/generate-image',userAuth,generateImage);

export default imgRouter;