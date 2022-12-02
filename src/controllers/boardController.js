const Board = require('../models/board')


function boardController(){
    return{
       async PostBoard(req,res){
        try {
            
          
   

            let multipleEmail = []
                
            if (req.body.email) {
                req.body.email.map((email) => {
                    multipleEmail.push(email)
                    
                })
            }
            console.log(req.files + " board-file")

                       
            const fileData = []
       
            if(req.file){
              fileData.push(req.file.filename)
            }
          

        // let tasksData = []
     

            // req.body.tasks.map((taskData)=>{
            //  tasksData.push(taskData)
            // })

          
            const createBoard = new Board({
                title:req.body.title,
                description:req.body.description,
                assignee:req.body.assignee,
                important:req.body.important,
                email:multipleEmail,
                images:"/image/" + fileData,

                // category:req.body.category,
                owner:req.user._id
            })

            await createBoard.save()
            res.status(201).send({
                sucess: true,
                message: 'Board created successfully',
                data: createBoard
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                sucess: false,
                message: 'Not Able to Create Boards'
            })
        }
        },
        async getBoard(req,res){
            try {
                
                await req.user.populate('boards')
                
                const fecthData = await Board.find({})
          
                res.status(200).send({
                    sucess:true,
                    data:fecthData
                })

            } catch (error) {
                console.log(error)
                res.status(500).send({
                    success: false,
                    message: "Not able to fetch Data"
                })
            }
        },
        async deleteBoard(req,res){
            try {
            const deleteData = await Board.findByIdAndDelete(req.params.id)
                if(!deleteData){
                    res.status(404).send({
                        sucess:false,
                        message:"Not able to delete"
                    })
                }
                res.status(200).send({
                    sucess:true,
                    message:"Board Deleted Successfully"
                })
            } catch (error) {
        res.status(500).send({
            sucess:false,
            message:"Something went wrong"
        })         
            }
        }
    }
}


module.exports = boardController