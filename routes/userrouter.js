const express = require('express')
const User = require('../models/user')
const Auth = require('../middileware/auth')

const router = new express.Router()

//signup
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).json({
            registeredUser:user
            , token})
        } catch (error) {
        res.status(400).json(error)
        console.log(error)
    }

})

//login

router.post('/users/login', async (req, res) => {
   
    try {
        console.log('jhvjkdf')
        const user = await User.findByCredentials(req.body.email, req.body.password)
        console.log(user)
        const token = await user.generateAuthToken()
        console.log(token)
        res.status(201).json({token})
    } catch (error) {
        res.status(400).json(error)
    }
})

//logout
router.post('/users/logout', Auth, async (req, res) => {
   
    try {
       req.user.tokens =  req.user.tokens.filter((token) => {
            return token.token !== req.token 
        })

        await req.user.save()
        res.status(200).json({
            message:'logout'
        })
    } catch (error) {
        res.status(500).send()
    }
})

//Logout All 
router.post('/users/logoutAll', Auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()        
    }
})
module.exports = router