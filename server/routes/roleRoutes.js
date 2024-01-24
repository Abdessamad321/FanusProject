const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Create role
router.post('/role/create', roleController.createRole);

// Get all roles
router.get('/roles', roleController.getRoles);

// Get one role by id
router.get('/role/:id', roleController.getRoleById);

// Update role by id
router.put('/role/:id', roleController.updateRole);

// Delete role by id
router.delete('/role/:id', roleController.deleteRole);

// Get roles sorted by name
router.get('/roles/sortByName', roleController.getRolesSortedByName);

module.exports = router;