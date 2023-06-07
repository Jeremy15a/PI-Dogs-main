require('dotenv').config();
const {
    YOUR_API_KEY,
  } = process.env;
const API = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
const axios = require('axios')
const { Dog, Temperaments } = require('../db');

const getDogsFromAPI = async () => {
  const { data } = await axios(API);
  if (!data || !data.length) throw new Error("Error: los datos son incorrectos");

  const dogsFromAPI = [];
  data.forEach((e) => {

    dogsFromAPI.push({
      id: e.id,
      image: e.image.url,
      name: e.name,
      height: e.height.metric,
      weight: e.weight.metric,
      life_span: e.life_span,
      temperaments: e.temperament,
    });
  });

  return dogsFromAPI;
};

  const getDogsFromDb = async () => { 
      const dogsFromDb = await Dog.findAll({ 
        include: { 
            model: Temperaments,
            atributes: ['name'],
            through: {
                atributes: ['temperaments', 'name'],
              }, } });
      const allDogs = await dogsFromDb?.map((e) => {
        return {
        id: e.id,
        image: e.image,
        name: e.name,
        height: e.height,
        weight: e.weight,
        life_span: e.life_span,
        temperaments: e.temperaments?.map((temp) => temp.name).join(', '),
        }
      });
      return allDogs
  };

const getAllInfoDogs = async () => {
    let allApi = await getDogsFromAPI();
    let allDb = await getDogsFromDb();
    let allInfo = allApi.concat(allDb)
    return allInfo
};

const getAllDogs = async (req, res) => {
    try {
        const allDogs = await getAllInfoDogs()
        if(!allDogs.length) throw new Error({error: 'No hay perros existentes'})
        console.log('te damos todos los perros');
        res.status(200).json(allDogs)

    } catch (error) {
        console.log('sin perros');
        res.status(400).json( error.message );
    }
};

const getDogsByName = async (req, res) => {
  try {
    const { name } = req.query;
    const allDogs = await getAllInfoDogs();

    if (name) {
      const dogByName = allDogs.filter((doggy) =>
        doggy.name.toLowerCase().includes(name.toLowerCase())
      );

      if (!dogByName.length) throw new Error("No tenemos disponible el perro");

      console.log("si está el perro by name");
      res.status(200).json(dogByName);
    } else {
      console.log("te traemos todo desde by Name");
      res.status(200).json(allDogs);
    }
  } catch (error) {
    console.log("no tenemos esta el perro by name");
    res.status(400).json(error.message);
  }
};

const getDogById = async (req, res) => {
  try {
    const { id } = req.params;
    const allDogs = await getAllInfoDogs();

    if (isNaN(id)) {
      const dogDb = allDogs.find((e) => e.id === id);
      dogDb
        ? res.status(200).json(dogDb)
        : res.status(404).send({ error: "No se encontró perro con ese id en Db" });
    } else {
      const dogApi = allDogs.find((el) => el.id === Number(id));
      dogApi
        ? res.status(200).json(dogApi)
        : res.status(404).send({ error: "No se encontró perro con ese id en API" });
    }
  } catch (error) {
    console.log("No se encontró perro con ese id");
    res.status(400).json(error.message);
  }
};


const createDog = async(name, height, weight, life_span, temperaments, image) =>{
    
  const newDog = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image
  })

  await newDog.setTemperaments(temperaments);

  const createdDog = await Dog.findByPk(newDog.id, {
      include: {
          model: Temperaments,
          attributes: ['name'],
      }
  });

  return createdDog;
}


const postDog = async (req, res) => {
  const {name, height, weight, life_span, temperaments, image} = req.body;
  if (!name || !height || !weight || !temperaments || !life_span || !image){
      throw new Error({error:'MANDA TODOS LOS PARAMETROS'});
  }
  
  try {
      const newDog = await createDog(name, height, weight, life_span, temperaments, image)
      console.log('se posteo el perro');
      return res.status(200).json(newDog);
  }
  catch (error) {
      return res.status(400).json(error.message);
  }
};


module.exports = {
    getAllDogs,
    getDogsByName,
    getDogById,
    postDog,
}