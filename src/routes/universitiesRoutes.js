const express = require('express');
const router = express.Router();
const path = require('path');
const universitiesController = require('../controllers/universitiesController');

router.get('/see_country_universities', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/see_country_universities.html'));
});

router.get('/search_university', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/search_university.html'));
});

router.get('/api/universities_by_country', universitiesController.getUniversitiesByCountry);
router.get('/api/university_webpage', universitiesController.getUniversityWebPage);

router.post('/api/add_university', express.json(), universitiesController.addUniversity);
router.delete('/api/delete_university/:id', universitiesController.deleteUniversity);
router.put('/api/update_university/:id', express.json(), universitiesController.updateUniversity);

router.get('/api/universities_in_capitals', universitiesController.findUniversitiesInCapitals);

module.exports = router;
