

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const playGameRoutes = require('./routes/playGame')
const PORT = 3000



app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(_,res)=>{

    res.send("<h1> The tetris game is running </h1>")

}); 

app.use(playGameRoutes)

app.use((_,res)=>{
    res.status(404).send("<h1>The page you are trying to access is not found</h1>")
});

app.listen(PORT,()=>{
    console.log(`The Server is running on the port ${PORT}`)
}); 