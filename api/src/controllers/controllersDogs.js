require('dotenv').config();
const {
    YOUR_API_KEY,
  } = process.env;
let API = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`
const axios = require('axios')
const { Dog, Temperaments } = require('../db');

const getDogsFromAPI = async () => {
      const { data } =  await axios(API)
      if (!data || !data.length) throw new Error (`error: esta mal`);
      const dogsFromAPI = await data.map(e => ({
        id: e.id,
        image_url: e.image.url,
        name: e.name,
        height: e.height.metric!='NaN' ? e.height.metric : e.height.imperial,
        weight: e.weight.metric.includes('NaN') ? '1 - 99' : e.weight.metric,
        life_span: e.life_span,
        temperaments: e.temperament
      }));
      return dogsFromAPI
  };

  const getDogsFromDb = async () => { 
      const dogsFromDb = await Dog.findAll({ 
        include: { 
            model: Temperaments,
            atributes: ['name'],
            through: {
                atributes: ['id', 'name'],
              }, } });
      const allDogs = await dogsFromDb?.map((e) => {
        return {
        id: e.id,
        image_url: e.image.url,
        name: e.name,
        height: e.height.metric,
        weight: e.weight.metric,
        life_span: e.life_span,
        temperaments: e.temperament
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
        const dogByName = allDogs.filter(doggy =>
            doggy.name.toLowerCase().includes(name.toLowerCase())
        );
      if(!dogByName.length) throw new Error({error:"No tenemos disponible la receta"});
      console.log('si esta el perrito');
      res.status(200).json(dogByName);
      } 
      else{
        console.log('te traemos todo desde by Name');
        res.status(200).json(allDogs);
      }
    } catch (error) {
        console.log('no tenemos ese perrito');
      res.status(400).json( error.message );
    }
  };

  const getDogById = async (req, res) =>{
    try {
        const {id} = req.params;
        const allDogs = await getAllInfoDogs();
        if(isNaN(id)){
            let dogNan = allDogs.find((e) => e.id === id);
            dogNan
            ? res.status(200).json(dogNan)
            : res.status(404).send({error: 'No se encontró perrote con ese id'});
        } else{
            let dogNumb = allDogs.find((el) => el.id === Number(id))
            dogNumb
            ? res.status(200).json(dogNumb)
            : res.status(404).send({error: 'No se encontró perrin con ese id'})
        }

    } catch (error) {
        console.log('No se encontró perrin con ese id');
        res.status(400).json(error.message);
    }
};


const createDog = async(name, height, weight, life_span, tempID, image_url) =>{
    
  const newDog = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image_url
  })

  await newDog.setTemperaments(tempID);

  const createdDog = await Dog.findByPk(newDog.id, {
      include: {
          model: Temperaments,
          attributes: ['name'],
          through: {
              attributes: []
          }
      }
  });

  return createdDog;
}


const postDog = async (req, res) => {
  const {name, height, weight, life_span, tempID, image_url} = req.body;
  if (!name || (!height) || (!weight) || !tempID){
      throw new Error({error:'MANDA TODOS LOS PARAMETROS'});
  }
  
  try {
      const newDog = await createDog(name, height, weight, life_span, tempID, image_url)
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
























