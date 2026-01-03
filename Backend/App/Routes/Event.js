import Express from 'express'
import Auth from '../Middleware/Auth.js'
import isAdmin from '../Middleware/isAdmin.js'
import { create, deleteEvent, editEvent, getevent,getSingleEvent } from '../Controller/Event.js'

const eventRoutes=Express.Router()

eventRoutes.post("/create",Auth,isAdmin,create)
eventRoutes.get("/get",getevent)
eventRoutes.get("/single/:id",getSingleEvent)
eventRoutes.delete("/delete/:id",Auth,isAdmin,deleteEvent)
eventRoutes.put("/edit/:id",Auth,isAdmin,editEvent)
export default eventRoutes