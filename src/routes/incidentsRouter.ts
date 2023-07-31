import express from 'express';
import { incidents } from '../controllers/incidentsController';
import Auth from '../middleware/auth'
const router = express.Router();

router.post('/getAll',incidents)

export = router;
