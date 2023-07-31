import express from 'express';
import { tenantsGetAll, tenantGetById, createTenant, updateRoleTenant, updateTenantProfile } from '../controllers/tenantController';
import Auth from '../middleware/auth'
const router = express.Router();

router.get('/getAll',tenantsGetAll)
router.get('/getById',Auth.verifyToken,tenantGetById)
// router.post("/create",Auth.verifyToken,createTenant)
router.post("/create",createTenant)
router.put('/updateProfile',Auth.verifyToken,updateTenantProfile)
router.put('/updateRole',Auth.verifyToken,updateRoleTenant)

export = router;

