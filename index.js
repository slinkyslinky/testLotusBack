import express from 'express';
import { TURN_TIME } from './config.js';
import cors from "cors"
import setNextTurn from './functions/setNextTurn.js';


const app = express()
const PORT = 3001
app.use(cors())


app.listen(PORT, () => {
   console.log(`Working on ${PORT} port...`)
})

const serverStartTime = new Date()

let turn = 1
let startTime = Math.floor(serverStartTime.getTime() / 1000)
let finishTime = Math.floor(serverStartTime.getTime() / 1000) + TURN_TIME



const timer = setInterval(() => {

   turn = setNextTurn(turn, 2)
   startTime = finishTime
   finishTime = startTime + TURN_TIME
   console.log("Turn: ", turn);


}, TURN_TIME * 1000)



app.get("/getTimer", (req, res) => {
   console.log('send: ', turn);
   res.send({
      turn: turn,
      finishTime: finishTime
   })
})