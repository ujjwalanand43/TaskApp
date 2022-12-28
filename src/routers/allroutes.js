const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const boardController = require('../controllers/boardController')
const taskController = require('../controllers/taskController')
const subTaskController = require('../controllers/subTaskController')
const notesController = require('../controllers/notesController')
const auth = require('../middleware/verify')

// For Boards
router.post('/board',auth,upload.single('images'),boardController().PostBoard)
router.get('/board',auth,boardController().getBoard)


// For Category
// router.post('/category',auth,bo)

// For All Tasks
router.post('/task',auth, upload.array('images'), taskController().postTask)
router.get('/task',auth, taskController().getTask)
router.patch('/task/:id',auth, taskController().updateTask)
router.delete('/task/:id',auth, taskController().deleteTask)
router.get('/onetask',auth,taskController().findATask)

// For Subtask
router.post('/subtask',auth, subTaskController().postSubTask)
router.get('/subtask',auth, subTaskController().getSubTask)
router.patch('/subtask/:id',auth, subTaskController().updateSubTask)
router.delete('/subtask/:id',auth, subTaskController().deleteSubTask)



// For Notes

router.post('/notes',auth, upload.array('images'), notesController().postNotes)
router.get('/notes',auth, notesController().getNotes)
router.patch('/notes/:id',auth, notesController().updateNotes)
router.delete('/notes/:id',auth, notesController().deleteNotes)


module.exports = router



