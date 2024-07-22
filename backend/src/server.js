import express from 'express';
import {config} from 'dotenv';
import ConnectToDb from './configs/db.js';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import eventRouter from './routes/eventRoute.js';
import detailRouter from './routes/eventdetailRoute.js';



config();
const app=express();

const PORT=process.env.PORT 
const db_uri=process.env.MONGO_URI 
app.use(cors({origin:process.env.FRONTEND_URL,credentials: true}))
app.use(express.json());

// home route
app.get('/',(req, res)=>{
  res.send('This is home route');
})

app.use("/users",userRouter) 
app.use("/events", eventRouter)
app.use('/details',detailRouter)


app.listen(PORT, async()=>{
    try{
      await ConnectToDb(db_uri);
      console.log(`Server is running at port ${PORT}`)
      console.log('Database is connected.')
    }
    catch(err){
      console.log(err)
    }
  })