const { body, param } = require("express-validator");

// POST Supplier route validator
const validateCreateSupplier = [
  body("companyName")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Company name is required"),
  body("contactName")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Contact name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").isString().trim().notEmpty().withMessage("Phone is required"),
  body("address")
    .isObject()
    .withMessage(
      `Address must be an object. Fields to fill: street, city, state, postalCode, tax_id, country.`
    ),
  body("address.street")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Street is required"),
  body("address.city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City is required"),
  body("address.state")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("State is required"),
  body("address.postalCode")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Postal code is required"),
  body("address.tax_id")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Tax ID is required"),
  body("address.country")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Country is required"),
  body("productsSupplied")
    .isArray({ min: 1 })
    .withMessage("Products supplied must be a non-empty array"),
  body("productsSupplied.*")
    .isString()
    .withMessage("Each product must be a string"),
  body("isActive").isBoolean().withMessage("isActive must be a boolean"),
  body("createdAt")
    .optional()
    .isISO8601()
    .withMessage("createdAt must be a valid ISO date string"),
];

// PUT Supplier route validator
const validateUpdateSupplier = [
  body("companyName")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Company name must be a string"),
  body("contactName")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Contact name must be a string"),
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("phone")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Phone must be a string"),
  body("address")
    .optional()
    .isObject()
    .withMessage(
      `Address must be an object. Fields to fill: street, city, state, postalCode, tax_id, country.`
    ),
  body("address.street")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Street must be a string"),
  body("address.city")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City must be a string"),
  body("address.state")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("State must be a string"),
  body("address.postalCode")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Postal code must be a string"),
  body("address.tax_id")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Tax ID must be a string"),
  body("address.country")
    .optional()
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Country must be a string"),
  body("productsSupplied")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Products supplied must be a non-empty array"),
  body("productsSupplied.*")
    .optional()
    .isString()
    .withMessage("Each product must be a string"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
  body("createdAt")
    .optional()
    .isISO8601()
    .withMessage("createdAt must be a valid ISO date string"),
];

//
const validateSupplierId = [
  param("id").isMongoId().withMessage("Invalid supplier ID format"),
];

module.exports = {
  validateCreateSupplier,
  validateUpdateSupplier,
  validateSupplierId,
};
