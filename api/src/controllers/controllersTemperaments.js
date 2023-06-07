require('dotenv').config();
const {
    YOUR_API_KEY,
  } = process.env;
const API = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
const axios = require('axios')
const { Temperaments } = require('../db');

const getTemperaments = async (req, res) => {
    try {
      const tempApi = await axios(API);
      const tempDB = tempApi.data
        .map((t) => t.temperament)
        .toString()
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 1);
  
      const uniqueTemperaments = [...new Set(tempDB)];
  
      const temperaments = await Promise.all(
        uniqueTemperaments.map((t) =>
          Temperaments.findOrCreate({ where: { name: t } })
        )
      );
  
      const totalTemp = temperaments.map((t) => t[0]);
      res.status(200).json(totalTemp);
    } catch (error) {
      console.log("Error al obtener los temperamentos", error);
      res.status(400).json(error);
    }
  };
  
  module.exports = {
    getTemperaments,
  };
  