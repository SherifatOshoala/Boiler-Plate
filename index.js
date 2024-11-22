require("dotenv").config()
const Express = require('express')
const app = Express()
const port = process.env.APP_PORT || 3000
const displayRoutes = require('express-routemap')
const sequelize = require('./config/sequelize')
const user = require('./routes/user.routes')
const admin = require('./routes/admin.routes')
const invalidRoutes = require('./controllers/invalid')

app.use(Express.json())
app.use(user)
app.use(admin)

app.get('/', (req, res) =>{
    res.status(200).json({
        status: "success",
        message: 'Welcome to Mentorship!'
    })
})

try {
    (async()=> {
      await sequelize.authenticate();
    //   await sequelize.sync();
      console.log('Connection has been established successfully.');
      app.listen(port, () => {
        displayRoutes(app)
        console.log(`Mentorship listening on port ${port}`) 
      })
    })()
  
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1)
  }
  










  

  app.use(invalidRoutes)

  