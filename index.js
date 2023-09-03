import dotenv from 'dotenv'


dotenv.config()
import express from 'express'
import bootstrap from './src/app.routes.js'
import cartRouter from './src/modules/carts/carts.routes.js'
const app = express()
const port = 3000
app.use(express.json())

app.use(express.static('uploads'))
app.use(cartRouter)
bootstrap(app, express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))