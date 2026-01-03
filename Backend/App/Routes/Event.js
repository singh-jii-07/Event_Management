import Express from 'express'
import Auth from '../Middleware/Auth.js'
import isAdmin from '../Middleware/isAdmin.js'
import { create, deleteEvent, getevent } from '../Controller/Event.js'

const eventRoutes=Express.Router()

eventRoutes.post("/create",Auth,isAdmin,create)
eventRoutes.get("/get",getevent)
eventRoutes.delete("/delete/:id",Auth,isAdmin,deleteEvent)
export default eventRoutes