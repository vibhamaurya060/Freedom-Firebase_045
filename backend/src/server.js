import express from 'express';

const app=express();
app.use(express.json());

const port=8080

app.get('/', (req, res)=>{
    res.send("This is home route");
})

app.listen(port, ()=>{
    console.log(`server is running at port: ${port}`)
})