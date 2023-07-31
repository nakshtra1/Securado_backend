import express from 'express';
import {
  cronTableUpdate,
  cronTableGetAll,
} from '../controllers/cronTabController';

const router = express.Router();

router.get('/cronTableGetAll', cronTableGetAll);
router.post('/cronTableUpdate', cronTableUpdate);

export = router;
