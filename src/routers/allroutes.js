const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')

const taskController = require('../controllers/taskController')
const subTaskController = require('../controllers/subTaskController')


// For All Tasks
router.post('/task', upload.array('images'), taskController().postTask)
router.get('/task', taskController().getTask)
router.patch('/task/:id', taskController().updateTask)
router.delete('/task/:id', taskController().deleteTask)


// For Subtask
router.post('/subtask', subTaskController().postSubTask)
router.get('/subtask', subTaskController().getSubTask)
router.patch('/subtask/:id', subTaskController().updateSubTask)
router.delete('/subtask/:id', subTaskController().deleteSubTask)



module.exports = router