const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/event', eventController.createEvent );

router.get('/event',async function (req, res){
res.json('hello world')
})


module.exports = router