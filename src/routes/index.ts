import express from 'express';
import Auth from '../middleware/auth';
import Tanants from './tenantRouter';
import Users from './userRouter';
import Controls from './controlRouter';
import graph from './graphRoutes';
import cron from './cronTabRouter';
import incident from './incidentsRouter';
// import cors from 'cors';
// import  '../controllers//cron'
import '../middleware/cron';
const router = express.Router();
router.use('/tenants', Tanants);
router.use('/users', Users);
router.use('/controls', Controls);
router.use('/graph', graph);
router.use('/cronTab', cron);
router.use('/incidents', incident);

export = router;
