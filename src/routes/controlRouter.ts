import express from 'express';
import { getControls} from '../controllers/controlsController';



const router = express.Router();
router.get("/get",getControls);

export= router;