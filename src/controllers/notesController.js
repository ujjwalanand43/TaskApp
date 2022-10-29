const Notes = require('../models/notes');


function notesController(){
    return{
        async postNotes(req,res){
            try {
                
            const pussedImages = [];
            
            const fileGet = req.files.map((file) => {
                pussedImages.push(file.filename)
                
                // console.log(file.filename)
                // console.log(pussedImages[0].originalname);
            });
            
            console.log(pussedImages)

            const createNotes = new Notes({
                title: req.body.title,
                description: req.body.description,
                tags: req.body.tags,
                subtitle: req.body.subtitle,
                topic: req.body.topic,
                path: '/image',
                images: pussedImages,
                owner:req.user._id
            })

            await createNotes.save()

            // console.log(createNotes)
            res.status(201).send({
                sucess: true,
                message: 'Notes created successfully',
                data: createNotes
            })
            } catch (error) {
                res.status(500).send({
                    sucess: false,
                    message: 'Not Able to Create Notes'
                })
            }


        },

        async getNotes(req,res){
            try {
           const fetchedData =   await req.user.populate('notes')

             if (!fetchedData) {
                res.status(200).send({
                    success: true,
                    message: 'No Data To Show Please Add A New Notes'
                })
            }

            res.status(200).send({
                success: true,
                data: req.user.notes
            })


            } catch (error) {
                res.status(500).send({
                    success: false,
                    message: "Not able to fetch Data"
                })
            }
        },

        async updateNotes(req,res){
            try {


                const updateNote = await Notes.findByIdAndUpdate(req.params.id,req.body);
                if (!updateNote) {
                    res.status(401).send({
                        success: false,
                        message: "Data not found"
                    })
                }
                res.status(200).send({
                    success: true,
                    data: updateNote
                })
            } catch (error) {
                console.log(error)
                res.status(500).send({
                    success: false,
                    message: "Not able to Update Data"
                })
            }
        },

        async deleteNotes(req,res){
            try {
                const deleteNotes = await Notes.findByIdAndDelete(req.params.id)
                if (!deleteNotes) {
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



module.exports = notesController