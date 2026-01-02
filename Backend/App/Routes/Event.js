import Express from 'express'
import Auth from '../Middleware/Auth.js'
import isAdmin from '../Middleware/isAdmin.js'
import { create } from '../Controller/Event.js'

const eventRoutes=Express.Router()

eventRoutes.post("/create",Auth,isAdmin,create)

export default eventRoutes