const express = require ("express")
const app = express()

app.get("/hola", (req, res)=>{
    res.json({name: "giuliano"})
})

app.listen(3000)