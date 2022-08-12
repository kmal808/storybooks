const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Story = require('../models/Story')

//* @desc Login/Landing page
//* @route GET /

router.get('/', ensureGuest, (req, res) => {
	res.render('login', {
		layout: 'login',
	})
})

//* @desc Dashboard
//* @route GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
	try {
		const stories = await Story.find({ user: req.user.id }).lean()
		res.render('Dashboard', {
			name: req.user.displayName,
			stories,
		})
	} catch (error) {
		console.error(error)
	}
})

module.exports = router
