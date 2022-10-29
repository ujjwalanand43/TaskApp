const Task = require('../models/task');

const sendEmails = require('../middleware/nodemailer')

function taskController() {
    return {
        async postTask(req, res) {
            try {
                console.log(req.user._id)
                const pussedImages = [];
                const multipleEmail = [];
                if (req.body.email) {
                    console.log('hii');
                    req.body.email.map((email) => {
                        multipleEmail.push(email)
                    })
                }


                if (req.body.files) {
                    const fileGet = req.files.map((file) => {
                        pussedImages.push(file.filename)
                        console.log(pussedImages);
                    });
                }


                const createTask = new Task({
                    title: req.body.title,
                    description: req.body.description,
                    completed: req.body.completed,
                    important: req.body.important,
                    assignee: req.body.assignee,
                    subTask: req.body.subTask,
                    topic: req.body.subTask,
                    email: multipleEmail,
                    path: '/image',
                    image: pussedImages,
                    owner:req.user._id
                })

                await createTask.save()
                res.status(201).send({
                    sucess: true,
                    message: 'Task created successfully',
                    data: createTask
                });

                let convertEmailToString = multipleEmail.toString();
                console.log(convertEmailToString)
                let subject = {
                    'title': createTask.title,
                    'description': createTask.description
                }
                sendEmails(convertEmailToString, `You Have Been assgined a new Task by ${createTask.assignee}`,
                    `Title :${createTask.title} \n Description : ${createTask.description}`);



            } catch (error) {
                console.log(error)
                res.status(500).send({
                    sucess: false,
                    message: 'Not Able to Create Tasks'
                })
            }


        },

        async getTask(req, res) {
            try {
                console.log()
              
                await req.user.populate('tasks')
                const fetchedData = await Task.find({})
                    .populate('subTask')

                if (!fetchedData) {
                    res.status(200).send({
                        success: true,
                        message: 'No Data To Show Please Add A New Task'
                    })
                }

                res.status(200).send({
                    success: true,
                    data: req.user.tasks
                })


            } catch (error) {
                console.log(error)
                res.status(500).send({
                    success: false,
                    message: "Not able to fetch Data"
                })
            }
        },

        async updateTask(req, res) {
            try {
                console.log(req.params.id);
                // const findData = await Task.findById(req.params.id)


                const updateData = await Task.findByIdAndUpdate(req.params.id, req.body)
                if (!updateData) {
                    res.status(401).send({
                        success: false,
                        message: "Data not found"
                    })
                }
                res.status(200).send({
                    success: true,
                    data: updateData
                })

            } catch (error) {
                console.log(error)
                res.status(500).send({
                    success: false,
                    message: "Not able to Update Data"
                })
            }
        },

        async deleteTask(req, res) {
            try {
                const deleteTodo = await Task.findByIdAndDelete(req.params.id);
                if (!deleteTodo) {
                    res.status(404).send({
                        sucess: false,
                        message: 'Not able to delete'
                    })
                }
                res.status(201).send({
                    sucess: true,
                    message: 'Data Deleted Successfully'
                })

            } catch (error) {
                res.status(500).send({
                    success: false,
                    message: 'Not able to Delete Data'
                })
            }
        }


    }
}


module.exports = taskController