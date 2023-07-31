"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const tenantController_1 = require("../controllers/tenantController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.get('/getAll', tenantController_1.tenantsGetAll);
router.get('/getById', auth_1.default.verifyToken, tenantController_1.tenantGetById);
// router.post("/create",Auth.verifyToken,createTenant)
router.post("/create", tenantController_1.createTenant);
router.put('/updateProfile', auth_1.default.verifyToken, tenantController_1.updateTenantProfile);
router.put('/updateRole', auth_1.default.verifyToken, tenantController_1.updateRoleTenant);
module.exports = router;
