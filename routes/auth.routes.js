const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router()


// /api/auth/register
router.post(
    '/register', 
    [
        check('email', 'Incorrect email').isEmail(),
        check('userName', 'minimum size is 3 symbols').isLength({min: 3}),
        check('password', 'minimum size is 6 symbols').isLength({ min: 6})

    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "incorrect data entry in registration field"
            })
        }

        const {email, password, userName} = req.body

        const candidate = await User.findOne({ email })

        if (candidate) {
           return res.status(400).json({ message: "This email is exist, try another email "})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({ email, password: hashedPassword, userName })

        await user.save()

        res.status(201).json({message: `User ${userName} is created`})

    } catch (e) {
        res.status(500).json({message:"Something wrong, try again"})
    }
})

// /api/auth/login
router.post(
    '/login', 
    [
        check('email', 'enter correct email').normalizeEmail().isEmail(),
        check('password', 'enter password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
    
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "incorrect data entry in login"
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'user is not exists' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                 return res.status(400).json({ message:"Incorrect password" })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })
    
        } catch (e) {
            res.status(500).json({ message:"Something wrong, try again" })
    }
})


module.exports = router