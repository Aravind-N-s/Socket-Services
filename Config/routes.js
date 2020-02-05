const express = require ('express')
const router = express.Router()
const passport = require('passport')
const chatController = require('../Controller/chatController')

router.get('/val', function (req, res) {
  res.json('Value')
})

//chat
router.get('/list',passport.authenticate('jwt',{session:false}), chatController.list)
router.get('/show/:id',passport.authenticate('jwt',{session:false}), chatController.show)
router.post('/create',passport.authenticate('jwt',{session:false}), chatController.create)
router.put('/update/:id',passport.authenticate('jwt',{session:false}), chatController.update)
router.delete('/destroy/:id',passport.authenticate('jwt',{session:false}), chatController.destroy)

module.exports = router