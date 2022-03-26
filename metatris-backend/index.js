

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

const playRoutes = require('./routes/play');
const PORT = process.env.PORT;


app.use(cors({
    origin:process.env.ALLOWED_ORIGINS
}));
app.use(bodyParser.json());

app.get('/',(_,res)=>{

    res.send("<h1> The tetris game is running </h1>");

}); 

app.use(playRoutes);

app.use((_,res)=>{
    res.status(404).send("<h1>The page you are trying to access is not found</h1>");
});

app.listen(PORT,()=>{
    console.log(`The Server is running on the port ${PORT}`);
}); 