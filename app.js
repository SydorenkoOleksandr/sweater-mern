const express = require('express')   
const config = require ('config')           
const path = require('path')        //default configs 
const mongoose = require("mongoose")

const app = express()
app.use(express.json({ extended:true }))

app.use('/api/auth', require('./routes/auth.routes'));    // router authorization
// app.use('/api/cards', require('./routes/cards.routes'));   // router to DB cards


const PORT = config.get("port") || 5000  // port for localhost from config

async function start() {
    try {
        await mongoose.connect(config.get('mongoURL'),{
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex:true

        })
        
        
    app.listen(PORT, () => { console.log(`APP has been started on port ${PORT} ...`)})      // server's start on port PORT
    } catch (e) {
        console.log(`Server error `, e.message)
        process.exit(1)
    }   
}

start();