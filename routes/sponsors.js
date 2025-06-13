const router = require('express').Router();
const sponsorsController = require('../controllers/sponsors');
const {
  validateSponsorId,
  validateSponsor,
} = require('../middleware/sponsorValidator');
const handleValidationErrors = require('../middleware/validateResult');
const { isAdmin } = require('../middleware/authenticate');

router.get(
    '/',
    //#swagger.tags = ['Sponsors']
    //#swagger.summary = "Requires Admin"
    isAdmin, 
    sponsorsController.getAll
);
router.get(
  '/:id',
    //#swagger.tags = ['Sponsors']
    //#swagger.summary = "Requires Admin"
  isAdmin,
  validateSponsorId,
  handleValidationErrors,
  sponsorsController.getSingle
);

router.post(
  '/',
  /* 
    #swagger.tags = ['Sponsors']
    #swagger.summary = "Requires Admin"
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Sponsor fields to use',
      required: true,
      schema: {
        name: "string",
        email: "example@email.com",
        phone: "1234567890",
        website: "example.com",
        supplierID: "string"
      }
    }
  */ 
  isAdmin,
  validateSponsor,
  handleValidationErrors,
  sponsorsController.createSponsor
);

router.put(
  '/:id',
  /* 
    #swagger.tags = ['Sponsors']
    #swagger.summary = "Requires Admin"
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Sponsor fields to update',
      required: true,
      schema: {
        name: "string",
        email: "example@email.com",
        phone: "1234567890",
        website: "example.com",
        supplierID: "string"
      }
    }
  */ 
  isAdmin,
  validateSponsorId,
  validateSponsor,
  handleValidationErrors,
  sponsorsController.updateSponsor
);

router.delete(
  '/:id',
    //#swagger.tags = ['Sponsors']
    //#swagger.summary = "Requires Admin"
  isAdmin,
  validateSponsorId,
  handleValidationErrors,
  sponsorsController.deleteSponsor
);

module.exports = router;
