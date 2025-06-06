const router = require('express').Router();
const sponsorsController = require('../controllers/sponsors');
const { validateSponsorId, validateSponsor } = require('../middleware/sponsorValidator');
const handleValidationErrors = require('../middleware/validateResult');

router.get('/', sponsorsController.getAll);
router.get('/:id', validateSponsorId, handleValidationErrors, sponsorsController.getSingle);

router.post('/', validateSponsor, handleValidationErrors, sponsorsController.createSponsor);

router.put('/:id', validateSponsorId, validateSponsor, handleValidationErrors, sponsorsController.updateSponsor);

router.delete('/:id', validateSponsorId, handleValidationErrors, sponsorsController.deleteSponsor);

module.exports = router;