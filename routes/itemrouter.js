const express = require('express')
//const Item = require('../models/item')
const mongoose = require('mongoose')
const auth=require('C:/Users/anuny/OneDrive/Desktop/ammu/middileware/auth')

const Item = require('C:/Users/anuny/OneDrive/Desktop/ammu/models/item')
//const { router } = require('../app')
//const { findByIdAndDelete } = require('../models/user')
const router = express.Router();


router.get('/items', async (req,res) =>{
try{
    const items = await Item.find({})
    res.status(200).json({
        Totalitems : items.length,
        items
    })
}catch (error) {
    res.status(400).send(error)
}
})

router.get('/items/:id', async(req,res) => {
    try{
        const items = await Item.findOne({_id: req.params.id})
        if(!items) {
            res.status(404).send({error: "Item not found"})
        }
res.status(200).send(items)
    }catch(error) {

    }
})


router.get('/itemsbyName/:name', async(req,res) => {
    try{
        const items = await Item.find({name:req.params.name})
        if(!items) {
            res.status(404).send({error: "Item not found"})
        }
res.status(400).json(items)
    }catch(error) {
        res.status(400).json({error})
        console.log(error)
        
    }
})



router.post('/create',(req,res,next)=>{
    const item = new Item(req.body)
    item.save()
    .then(result => {
        res.status (201).json({
            message: "Item created" ,
            createdItem: item
            
        })
    })
    .catch(error => {
        res.status(400).json({Error: error})
    })

})

router.put('/items/:id',async(req,res) => {
    const updates=object.keys(req.body)
    const allowedUpdates= ['name','description','category','price']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation) {
        return res.status(400).json({ error : 'invalid updates'})
    }
    try{
        const item=await Item.findOne({_id:req.params.id})
        if(!item){
            return res.status(404).json({ message:'Invalid Item'})
        }
            updates.forEach((update) => item [update] =req.body[update])
            await item.save()
            res.send(item)
    } catch (error) {
        res.stauts(400).send(error)
    }
})
  

router.delete('/items/:id' ,async(req,res)=> {
    try{
        const deletedItem = await Item.findByIdAndDelete ( {_id:req.params.id} )
        if(!deletedItem) {
            res.status(404).json({error: "Item not found"})

        }
        res.status(400).json({message: "Item Deleted",
        deletedItem})
    } catch (error) {
        res.status(400).send (error)
    }
    
})


//fetch all items
/*router.get('/items', async(req, res) => {
    try {
        const items = await Item.find({})
        res.status(200).send(items)
    } catch (error) {
        res.status(400).send(error)
    }
})

//fetch an item
router.get('/items/:id', async(req, res) => {
    try{
        const item = await Item.findOne({_id: req.params.id})
        if(!item) {
            res.status(404).send({error: "Item not found"})
        }
        res.status(200).send(item) 
    } catch (error) {
        res.status(400).send(error)
    }
})

//create an item
router.post('/items',Auth, async(req, res) => {
    try {
        const newItem = new Item({
            ...req.body,
            owner: req.user._id
        })
        await newItem.save()
        res.status(201).send(newItem)
    } catch (error) {
        console.log({error})
        res.status(400).send({message: "error"})
    }
})

//update an item

router.patch('/items/:id', Auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description', 'category', 'price']

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({ error: 'invalid updates'})
    }

    try {
        const item = await Item.findOne({ _id: req.params.id})
    
        if(!item){
            return res.status(404).send()
        }

        updates.forEach((update) => item[update] = req.body[update])
        await item.save()
        res.send(item)
    } catch (error) {
        res.status(400).send(error)
    }
})

//delete item
router.delete('/items/:id', Auth, async(req, res) => {
    try {
        const deletedItem = await Item.findOneAndDelete( {_id: req.params.id} )
        if(!deletedItem) {
            res.status(404).send({error: "Item not found"})
        }
        res.send(deletedItem)
    } catch (error) {
        res.status(400).send(error)
    }
})
*/

module.exports = router ;