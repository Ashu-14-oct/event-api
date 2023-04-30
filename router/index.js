const express = require('express');
const path = require('path');
const eventController = require('../controller/event_handler');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/'});

router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'../ApiDoc.html'));
});

router.get('/api/v3/app/events/:event_id', eventController.getEvent);
router.get('/api/v3/app/events', eventController.getEvents);
router.post('/api/v3/app/events', upload.single('image'),eventController.postEvent);
router.put('/api/v3/app/events/:id', upload.single('image'),eventController.updateEvent);
router.delete('/api/v3/app/events/:id', eventController.deleteEvent);

module.exports = router;