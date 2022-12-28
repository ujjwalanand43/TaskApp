var mongoose = require('mongoose');
const SubTask = require('../models/subtask');
const Task = require('../models/task');

const sendEmails = require('../middleware/nodemailer')

function taskController() {
    return {
        async postSubTask(req, res) {
            try {


                const createSubTask = new SubTask({
                    title: req.body.title,
                    description: req.body.description,
                    completed: req.body.completed,

                })

                await createSubTask.save()



                const subTaskId = createSubTask._id
                // Here maintaskid represents the task id of maintaskid task not the subtask id
                var objectid = mongoose.Types.ObjectId(`${req.body.maintaskid}`);
                console.log(objectid)


                const getId = await Task.findByIdAndUpdate(objectid, {
                    $push: {
                        "subTask": subTaskId,
                    }
                })
                // if(num>10){
                //     console.log('hello world')
                //     console.table('something went wrong')
                //     console.warn('404 f')
                // }
                await getId.save()
                res.status(201).send({
                    sucess: true,
                    message: 'SubTask created successfully',
                    data: createSubTask
                })


            } catch (error) {
              console.log(error)
                res.status(500).send({
                    sucess: false,
                    message: 'Not Able to SubTask Tasks'
                })
            }


        },

        async getSubTask(req, res) {
            try {
                const fetchedData = await SubTask.find({})
                    // .populate('subtask')

                if (!fetchedData) {
                    res.status(200).send({
                        success: true,
                        message: 'No Data To Show Please Add A New Task'
                    })
                }

                res.status(200).send({
                    success: true,
                    data: fetchedData
                })


            } catch (error) {
               
                res.status(500).send({
                    success: false,
                    message: "Not able to fetch Data"
                })
            }
        },

        async updateSubTask(req, res) {
            try {
                const updateData = await SubTask.findByIdAndUpdate(req.params.id, req.body)
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
             
                res.status(500).send({
                    success: false,
                    message: "Not able to Update Data"
                })
            }
        },

        async deleteSubTask(req, res) {
            try {
                const deleteTodo = await SubTask.findByIdAndDelete(req.params.id);
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