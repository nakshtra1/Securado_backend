import express, { Express } from 'express';
import path from 'path';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import routes from './routes/index';
dotenv.config();
import { cronJob } from './middleware/cron';

cronJob();
const router: Express = express();

router.use((req, res, next) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

// Configure the middleware to serve static content
// const publicPath = path.join(__dirname, '../public');

// router.use(express.static(publicPath));

router.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

router.use(morgan('dev'));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// ---------------------------------------------
// --------- Calling Router --------------------
// ------------------------------------------

router.use('/api', routes);
// site
const adminPath = path.join(__dirname, './admin');
router.use(express.static(adminPath));
router.get('*', (req, res) => {
  res.sendFile(path.join(adminPath, 'index.html'));
});

router.use((req, res, next) => {
  const error = new Error('Not found');
  return res.status(404).json({
    message: error.message,
  });
});

export default router;
