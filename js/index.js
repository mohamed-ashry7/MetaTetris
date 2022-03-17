

const express = require('express')
const app = express()

const PORT = 3000

app.get('/',(req,res)=>{

    res.send("<h1> The tetris game is running </h1>")
}); 

app.listen(PORT,()=>{
    console.log(`The Server is running on the port ${PORT}`)
}); 