const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectsByClient,
  getUserProjects
} = require('../controllers/projectController');

router.use(auth);
router.get('/my', getUserProjects);
router.post('/',  createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', role('admin'), deleteProject);
router.get('/client/:clientId', getProjectsByClient);

module.exports = router;