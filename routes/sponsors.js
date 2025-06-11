const router = require('express').Router();
const sponsorsController = require('../controllers/sponsors');
const {
  validateSponsorId,
  validateSponsor,
} = require('../middleware/sponsorValidator');
const handleValidationErrors = require('../middleware/validateResult');
const { isAdmin } = require('../middleware/authenticate');

router.get('/', isAdmin, sponsorsController.getAll);
router.get(
  '/:id',
  isAdmin,
  validateSponsorId,
  handleValidationErrors,
  sponsorsController.getSingle
);

router.post(
  '/',
  isAdmin,
  validateSponsor,
  handleValidationErrors,
  sponsorsController.createSponsor
);

router.put(
  '/:id',
  isAdmin,
  validateSponsorId,
  validateSponsor,
  handleValidationErrors,
  sponsorsController.updateSponsor
);

router.delete(
  '/:id',
  isAdmin,
  validateSponsorId,
  handleValidationErrors,
  sponsorsController.deleteSponsor
);

module.exports = router;
