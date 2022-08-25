import express from 'express'
import * as path from 'path'
import * as url from 'url'
import bodyParser from 'body-parser'
import indexrouter from './routes/index.js'
import mongoose from 'mongoose'
import db from './db/conn.js'

const app=express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.use("/",indexrouter)


app.listen(3000)

console.log("http://localhost:3000");