# TaskApp

<h1>FrontEnd Design of Task App</h1>


<img src="https://github.com/ujjwalanand43/TaskApp/blob/d9a51ca84ea4b5e61ebbb67fd4b8621aa0858cb6/src/public/uploads/1663442623343taskApp.png" alt="FrontEnd Design of Task App" >


  .
    ├── node_modules                   # Node_modules (alternatively `Dependancy`)
    ├── docs                    # Documentation files (alternatively `doc`)
    ├── src                     # Source files (alternatively `lib` or `app`)
         ├── Controllers  
              ├── subTaskController.js
              ├── taskController.js
              ├── userController.js
         ├── db   
              ├── database.js
         ├── middleware   
              ├── multer.js
              ├── nodemailer.js
              ├── roles.js
              ├── verify.js
         ├── models   
              ├── subtask.js
              ├── task.js
              ├── user.js
         ├── public   
                ├── uploads
                       ├── All the images are stored here 
         ├── routers
                 ├── allroutes.js
                 ├── userrouter.js
         ├── app.js   
    ├── package-lock.json               # Automated tests (alternatively `spec` or `tests`)
    ├── package.json                    # Detail of the Application(Task-App)
    └── README.md
