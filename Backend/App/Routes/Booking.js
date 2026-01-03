import express from 'express'
import { createBookinng, deleteBooking, getbook } from '../Controller/Booking.js'
import Auth from '../Middleware/Auth.js'
import isAdmin from '../Middleware/isAdmin.js'

const bookRoute=express.Router()
bookRoute.post("/book",Auth, createBookinng)
bookRoute.get ("/getbook",Auth,isAdmin,getbook)
bookRoute.put ("/delete/:id",Auth,deleteBooking)

export default bookRoute