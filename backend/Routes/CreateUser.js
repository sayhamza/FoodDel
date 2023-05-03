const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult, Result } = require('express-validator')

const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")
const jwtSecret = "MyNameIs@SayedHamzaSajid"


//Signup router
router.post("/createuser", [
    //conditions
    body('email').isEmail(),
    body('name').isLength({ min: 2 }),
    body('password').isLength({ min: 5 })]



    , async (req, res) => {

        //Validation-Errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secpwd = await bcrypt.hash(req.body.password, salt)

        try {
            User.create({
                name: req.body.name,
                password: secpwd,
                email: req.body.email,
                location: req.body.location

            })

            res.json({ success: true });

        } catch (error) {
            console.log(error)
            res.json({ success: false });

        }

    })
//Login Router
router.post("/loginuser", [

    body('email').isEmail(),
    body('password').isLength({ min: 5 })]

    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Invalid Email" });
            }

            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Invalid Password" });
            }
            //JWT token 

            const data = {
                user: {
                    id: userData.id
                }
            }

            const authToken = jwt.sign(data,jwtSecret)

            return res.json({ success: true, authToken:authToken });

        }


        catch (error) {
            console.log(error)
            res.json({ success: false });

        }

    })
module.exports = router;