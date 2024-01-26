const axios = require('axios');
const dotenv = require('dotenv');

const { endpoints } = require('../utils/constants');

dotenv.config();

const BASE_URL = process.env.API_BASE_URL;
const CLIENT_ID = process.env.CLIENT_ID;

async function getClientAllProjects() {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoints.projects}/${CLIENT_ID}`)

    return response.data.projects
  } catch (error) {
    console.log(error)    
  }
}

module.exports = {
  getClientAllProjects
}
