const temperamentsRouter = require('express').Router();
const { getTemperaments } = require('../controllers/controllersTemperaments')

temperamentsRouter.get('/', getTemperaments)

module.exports = temperamentsRouter;