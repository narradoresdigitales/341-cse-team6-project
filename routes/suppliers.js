const express = require('express');
const router = express.Router();
const suppliersController = require('../controllers/suppliers');
const { isAdmin } = require('../middleware/authenticate');

router.get('/', isAdmin, suppliersController.getAll);
router.get('/:id', isAdmin, suppliersController.getSingle);
router.post('/', isAdmin, suppliersController.createSupplier);
router.put('/:id', isAdmin, suppliersController.updateSupplier);
router.delete('/:id', isAdmin, suppliersController.deleteSupplier);

module.exports = router;
