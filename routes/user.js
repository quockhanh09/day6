const express = require('express')
const jwt = require('jsonwebtoken')
const { users, getAllUsers, userModel } = require('../models/user')

const userRouter = express.Router()

const authorizationCheck = (req, res, next) => {
    const userRoles = req.user.role
    console.log(userRoles)
    // Check xem user nay co quyen lay toan bo user khong (Authorization) == check role
    if (userRoles.includes('admin')) {
        next()
    } else {
        res.send('User khong co quyen')
    }

}

userRouter.get('/',authorizationCheck, async (req, res) => {
    const users = await userModel.find({})
    res.send(users)
})

userRouter.get('/me', (req, res) => {
    res.send(req.user)
})


userRouter.get('/', authorizationCheck, async (req,res)=>{
    const users= await userModel.find({})
    const user = req.user
})

userRouter.patch('/', async(req,res)=>{
    const{password} = req.body
})

userRouter.delete('/:username', authorizationCheck, async() => {
    // Lay username tu params
    
    // Tim xem user co trong db khong??

    // Xoa

    res.send('Da xoa')
})

module.exports = { userRouter }