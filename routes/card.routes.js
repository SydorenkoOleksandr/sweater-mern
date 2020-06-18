const {Router} = require('express')
const config = require('config')
// const shortid = require('shortid')
const Card = require('../models/Card')
const auth = require('../middleware/auth.middleware')
const { remove } = require('../models/Card')
const router = Router()

router.post('/generate',auth,
async (req, res) =>{
    
    try {
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
        res.status(500).json({ message:"Something wrong, try it again" })

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


    router.delete('/delete', auth, async (req, res) => {
        try {
            const { message } = req.body
            const existing = await Card.deleteOne({ message })
            

            if (existing) {
               
                return res.json({ card: remove })
            }
    
          
        } catch (e) {
            res.status(500).json({message: "Something wrong, try delete again"})
        }
    })


router.get('/:id',auth, async (req, res) => {
    try {
        console.log(req.params.id)
        const card = await Card.findById(req.params.id)
        res.json(card)
    } catch (e) {
        res.status(500).json({message:"Something wrong,and  try again"})
    }
})

module.exports = router