const express = require('express');
const router = express.Router();
const {
  allInitiatives,
  updateInitiative,
  getInitiative,
} = require('../controllers/initiativesControllers');

const { protect } = require('../middleware/protect.middleware');
router.route('/').get(protect, allInitiatives).post(protect, createUser);

router
  .route('/:id')
  .get(getInitiative)
  .put(updateInitiative)

module.exports = router;