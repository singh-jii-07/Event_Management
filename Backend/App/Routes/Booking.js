import express from 'express'
import { createBookinng } from '../Controller/Booking.js'
import Auth from '../Middleware/Auth.js'

const bookRoute=express.Router()
bookRoute.post("/book",Auth, createBookinng)

export default bookRoute