const University = require('../models/universityModel');
const axios = require('axios');
const { logger } = require('../config/logger');

const getUniversitiesByCountry = async (req, res) => {
  const country = req.query.country;
  if (!country) {
    return res.status(400).json({ error: 'Country parameter is required.' });
  }

  try {
    let universities = await University.find({ country: { $regex: new RegExp(`^${country}$`, 'i') } });

    if (universities.length === 0) {
      const response = await axios.get(`http://universities.hipolabs.com/search?country=${country}`);
      universities = response.data;

      if (Array.isArray(universities) && universities.length > 0) {
        await University.insertMany(universities);
        logger.info(`Fetched and stored ${universities.length} universities for ${country}.`);
      }
    }

    res.json({ count: universities.length, universities });
  } catch (error) {
    logger.error(`Error in getUniversitiesByCountry: ${error.message}`);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const getUniversityWebPage = async (req, res) => {
  const name = req.query.name;
  if (!name) {
    return res.status(400).json({ error: 'University name parameter is required.' });
  }

  try {
    const university = await University.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });

    if (!university) {
      const response = await axios.get(`http://universities.hipolabs.com/search?name=${name}`);
      const universities = response.data;

      if (Array.isArray(universities) && universities.length > 0) {
        // Insert into DB
        await University.insertMany(universities);
        logger.info(`Fetched and stored university data for ${name}.`);
        const webPages = universities.map((uni) => uni.web_pages).flat();
        console.log(`Web Pages for ${name}:`, webPages);
        res.json({ name, web_pages: webPages });
      } else {
        res.status(404).json({ error: 'University not found.' });
      }
    } else {
      console.log(`Web Pages for ${name}:`, university.web_pages);
      res.json({ name: university.name, web_pages: university.web_pages });
    }
  } catch (error) {
    logger.error(`Error in getUniversityWebPage: ${error.message}`);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const addUniversity = async (req, res) => {
  const { name, country, web_pages, alpha_two_code, domains } = req.body;

  if (!name || !country) {
    return res.status(400).json({ error: 'Name and country are required.' });
  }

  try {
    const existingUniversity = await University.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existingUniversity) {
      return res.status(400).json({ error: 'University already exists.' });
    }

    const newUniversity = new University({
      name,
      country,
      web_pages,
      alpha_two_code,
      domains,
    });

    await newUniversity.save();
    logger.info(`Added new university: ${name} in ${country}.`);
    res.status(201).json({ message: 'University added successfully.', university: newUniversity });
  } catch (error) {
    logger.error(`Error in addUniversity: ${error.message}`);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const deleteUniversity = async (req, res) => {
  const { id } = req.params;

  try {
    const university = await University.findById(id);
    if (!university) {
      return res.status(404).json({ error: 'University not found.' });
    }

    await University.findByIdAndDelete(id);
    logger.info(`Deleted university: ${university.name}.`);
    res.json({ message: 'University deleted successfully.' });
  } catch (error) {
    logger.error(`Error in deleteUniversity: ${error.message}`);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const updateUniversity = async (req, res) => {
  const { id } = req.params;
  const { name, country, web_pages, alpha_two_code, domains } = req.body;

  try {
    const university = await University.findById(id);
    if (!university) {
      return res.status(404).json({ error: 'University not found.' });
    }

    if (name) university.name = name;
    if (country) university.country = country;
    if (web_pages) university.web_pages = web_pages;
    if (alpha_two_code) university.alpha_two_code = alpha_two_code;
    if (domains) university.domains = domains;

    await university.save();
    logger.info(`Updated university: ${university.name}.`);
    res.json({ message: 'University updated successfully.', university });
  } catch (error) {
    logger.error(`Error in updateUniversity: ${error.message}`);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const findUniversitiesInCapitals = async (req, res) => {
  const capitals = {
    Pakistan: 'Islamabad',
    USA: 'Washington',
    UK: 'London',
    Canada: 'Ottawa',
    Australia: 'Canberra',
  };

  try {
    const results = {};
    for (const [country, capital] of Object.entries(capitals)) {
      const universities = await University.find({
        country: { $regex: new RegExp(`^${country}$`, 'i') },
        
      });
      results[country] = universities;
    }

    res.json(results);
  } catch (error) {
    logger.error(`Error in findUniversitiesInCapitals: ${error.message}`);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = {
  getUniversitiesByCountry,
  getUniversityWebPage,
  addUniversity,
  deleteUniversity,
  updateUniversity,
  findUniversitiesInCapitals,
};
