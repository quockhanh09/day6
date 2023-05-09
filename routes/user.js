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

userRouter.post('/create', authorizationCheck, async () => {

})

userRouter.delete('/:username', authorizationCheck, async(req, res) => {
    // Lay username tu params
    const username = req.params.username
    // Check xem username co phai cua user hien tai khong?
    const currentUser = req.user
    if (currentUser.username === username) {
        res.status(400).send('Khong the xoa user nay')
        return
    }
    // Tim xem user co trong db khong?? userModel.findOne({username})
    const user = await userModel.findOne({username})
    // Neu co thi xoa
    if (user) {
        await userModel.deleteOne({username})
        res.send('Da xoa,')
    } else {
        res.send('Khong co user')
    }
})

module.exports = { userRouter }