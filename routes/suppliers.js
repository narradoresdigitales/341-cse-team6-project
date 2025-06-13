const express = require("express");
const router = express.Router();
const suppliersController = require("../controllers/suppliers");
const { isAdmin } = require("../middleware/authenticate");
const {
  validateCreateSupplier,
  validateUpdateSupplier,
  validateSupplierId,
} = require("../middleware/suppliersValidator");
const handleValidationErrors = require("../middleware/validateResult");

router.get("/", isAdmin, suppliersController.getAll);

router.get(
  "/:id",
  isAdmin,
  validateSupplierId,
  handleValidationErrors,
  suppliersController.getSingle
);

router.post(
  "/",
  isAdmin,
  validateCreateSupplier,
  handleValidationErrors,
  suppliersController.createSupplier
);

router.put(
  "/:id",
  isAdmin,
  validateSupplierId,
  validateUpdateSupplier,
  handleValidationErrors,
  suppliersController.updateSupplier
);

router.delete(
  "/:id",
  isAdmin,
  validateSupplierId,
  handleValidationErrors,
  suppliersController.deleteSupplier
);

module.exports = router;
