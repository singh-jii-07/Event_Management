import express from 'express'
import { createBookinng, deleteBooking, getbook, getMyBookings } from '../Controller/Booking.js'
import Auth from '../Middleware/Auth.js'
import isAdmin from '../Middleware/isAdmin.js'

const bookRoute=express.Router()
bookRoute.post("/book",Auth, createBookinng)
bookRoute.get ("/getbook",Auth,isAdmin,getbook)
bookRoute.put ("/delete/:id",Auth,deleteBooking)
bookRoute.get ("/getMyBookings",Auth,getMyBookings)
export default bookRoute