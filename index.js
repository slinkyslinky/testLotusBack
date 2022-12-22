import express, { json, text } from 'express';

import fs from "fs"
import cors from "cors"
import setNextTurn from './functions/setNextTurn.js';



const app = express()
const PORT = process.env.PORT || 3001
app.use(cors())
app.use(text())

app.listen(PORT, () => {
   console.log(`Working on ${PORT} port...`)
})

const config = JSON.parse(fs.readFileSync("./files/tradeConfig.json"))
const turnTime = config.turnTime

const serverStartTime = new Date()

let turn = 1
let startTime = serverStartTime.getTime()

const latency = 1000
let finishTime = serverStartTime.getTime() + turnTime * 1000 + latency
const numberOfMembers = JSON.parse(fs.readFileSync("./files/tradeConfig.json")).members.length

const timer = setInterval(() => {

   turn = setNextTurn(turn, numberOfMembers)
   startTime = finishTime
   finishTime = startTime + turnTime * 1000 + latency



}, 1000 * turnTime + latency)



app.get("/getTimer", (req, res) => {

   res.send({
      turn: turn,
      finishTime: finishTime
   })
})


app.get("/getTrade", (req, res) => {

   const data = fs.readFileSync("./files/tradeConfig.json")
   res.send(data)

})

app.get("/getMembers", (req, res) => {

   const data = fs.readFileSync("./files/members.json")

   res.send(data)

})