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

router.get(
  "/",
  //#swagger.tags = ['Suppliers']
  //#swagger.summary = "Requires Admin"
  isAdmin, 
  suppliersController.getAll
);

router.get(
  "/:id",
  //#swagger.tags = ['Suppliers']
  //#swagger.summary = "Requires Admin"
  isAdmin,
  validateSupplierId,
  handleValidationErrors,
  suppliersController.getSingle
);

router.post(
  "/",
  /* 
    #swagger.tags = ['Suppliers']
    #swagger.summary = "Requires Admin"
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Supplier fields to use',
      required: true,
      schema: {
        companyName: "string",
        contactName: "string",
        email: "example@email.com",
        phone: "1234567890",
        address: {
          street: "string",
          city: "string",
          state: "string",
          postalCode: "string",
          tax_id: "string",
          country: "string"
        },
        productsSupplied: [],
        isActive: true,
        createdAt: "2025-06-01T08:15:00Z"
      }
    }
  */ 
  isAdmin,
  validateCreateSupplier,
  handleValidationErrors,
  suppliersController.createSupplier
);

router.put(
  "/:id",
  /* 
    #swagger.tags = ['Suppliers']
    #swagger.summary = "Requires Admin"
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Supplier fields to update',
      required: true,
      schema: {
        companyName: "string",
        contactName: "string",
        email: "example@email.com",
        phone: "1234567890",
        address: {
          street: "string",
          city: "string",
          state: "string",
          postalCode: "string",
          tax_id: "string",
          country: "string"
        },
        productsSupplied: [],
        isActive: true,
        createdAt: "2025-06-01T08:15:00Z"
      }
    }
  */ 
  isAdmin,
  validateSupplierId,
  validateUpdateSupplier,
  handleValidationErrors,
  suppliersController.updateSupplier
);

router.delete(
  "/:id",
  //#swagger.tags = ['Suppliers']
  //#swagger.summary = "Requires Admin"
  isAdmin,
  validateSupplierId,
  handleValidationErrors,
  suppliersController.deleteSupplier
);

module.exports = router;
