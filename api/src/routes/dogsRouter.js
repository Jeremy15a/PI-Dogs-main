const dogsRouter = require('express').Router();
const { getAllDogs, getDogsByName, getDogById, postDog } = require('../controllers/controllersDogs')

dogsRouter.get('/', getAllDogs);

dogsRouter.get('/name', getDogsByName);

dogsRouter.get('/:id', getDogById);

dogsRouter.post('/', postDog);


module.exports = dogsRouter;