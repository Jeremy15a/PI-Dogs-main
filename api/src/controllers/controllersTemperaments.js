require('dotenv').config();
const {
    YOUR_API_KEY,
  } = process.env;
let API = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
const axios = require('axios')
const { Dog, Temperaments } = require('../db');

const getTemperaments = async(req,res)=>{
    const tempApi = await axios(API);
    const tempDB = tempApi.data
        .map((t) => t.temperament) 
        .toString() 
        .split(",") 
        .map((t) => t.trim()) 
        .filter((t) => t.length > 1)
    const filtro = tempDB.filter((t) => t); 
    let tempFilt = [...new Set(filtro)]; 

    tempFilt.forEach((t) => {
        
        Temperaments.findOrCreate({ 
            where: { name: t },
        });
    });

    const totalTemp = await Temperaments.findAll(); 
    res.status(200).json(totalTemp);
}

module.exports = {
    getTemperaments,
}