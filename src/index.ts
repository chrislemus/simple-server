import express from 'express'
import { router } from './routes/loginRoutes'
import cookieSession from 'cookie-session'
import { AppRouter } from './AppRouter'
import './controllers/LoginController'
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(cookieSession({keys: ['secret']}))
app.use(router)
app.use(AppRouter.getInstance())

app.listen(3000, () => console.log('listening on port 3000'))