const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
 createOrUpdateClientProfile,
  getOwnClientProfile
} = require('../controllers/clientController');

router.use(auth);
router.post("/profile", createOrUpdateClientProfile)
router.get("/profile", getOwnClientProfile)
router.post('/', role('admin'), createClient);
router.get('/', getClients);
router.get('/:id', getClientById);
router.put('/:id', role('admin'), updateClient);
router.delete('/:id', role('admin'), deleteClient);


module.exports = router;