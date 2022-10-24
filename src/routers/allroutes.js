const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')

const taskController = require('../controllers/taskController')
const subTaskController = require('../controllers/subTaskController')

const auth = require('../middleware/verify')
// For All Tasks
router.post('/task',auth, upload.array('images'), taskController().postTask)
router.get('/task',auth, taskController().getTask)
router.patch('/task/:id',auth, taskController().updateTask)
router.delete('/task/:id',auth, taskController().deleteTask)


// For Subtask
router.post('/subtask',auth, subTaskController().postSubTask)
router.get('/subtask',auth, subTaskController().getSubTask)
router.patch('/subtask/:id',auth, subTaskController().updateSubTask)
router.delete('/subtask/:id',auth, subTaskController().deleteSubTask)



module.exports = router


