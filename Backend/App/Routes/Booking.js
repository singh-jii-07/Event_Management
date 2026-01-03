import express from 'express'
import { createBookinng, getbook } from '../Controller/Booking.js'
import Auth from '../Middleware/Auth.js'
import isAdmin from '../Middleware/isAdmin.js'

const bookRoute=express.Router()
bookRoute.post("/book",Auth, createBookinng)
bookRoute.get ("/getbook",Auth,isAdmin,getbook)

export default bookRoute