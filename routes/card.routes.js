const {Router} = require('express')
const config = require('config')
// const shortid = require('shortid')
const Card = require('../models/Card')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate',auth,
async (req, res) =>{
    
    try {
        const baseUrl = config.get('baseUrl')
        const { message } = req.body
        const existing = await Card.findOne({ message })

        if (existing) {
            return res.json({ card: existing })
        }

       
        const card = new Card({
            message, owner: req.user.userId
        })
       

        await card.save()

        res.status(201).json({ card })

    } catch (e) {
        res.status(500).json({ message:"Something wrong, try it again"})
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const cards = await Card.find({ owner: req.user.userId })
        res.json(cards)
    } catch (e) {
        res.status(500).json({message: "Something wrong, try  asdas again"})
    }
})

router.get('/:id',auth, async (req, res) => {
    console.log(req.params.id)
    try {
        const card = await Card.findById(req.params.id)
        res.json(card)
    } catch (e) {
        res.status(500).json({message:"Something wrong,and  try again"})
    }
})

module.exports = router