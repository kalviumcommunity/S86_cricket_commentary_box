const express = require('express');
const router = express.Router();
const { getProfile, updateBio } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getProfile);        // GET /api/profile
router.put('/bio', authMiddleware, updateBio);      // PUT /api/profile/bio

module.exports = router;
