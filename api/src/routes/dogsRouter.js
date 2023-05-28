const dogsRouter = require('express').Router();
const { getAllDogs, getDogsByName, getDogById, postDog } = require('../controllers/controllersDogs')

// GET | /dogs
dogsRouter.get('/', getAllDogs);

// GET | /dogs/name?="..."
dogsRouter.get('/name', getDogsByName);

// //  GET | /dogs/:idRaza
dogsRouter.get('/:id', getDogById);

// // POST | /dogs
dogsRouter.post('/', postDog);


module.exports = dogsRouter;