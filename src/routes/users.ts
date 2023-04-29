import express from 'express';
import { getLogger } from '@/utils/loggers';
const router = express.Router();
const logger = getLogger('USER_ROUTE');
import { User } from '../models';
import bcrypt from "bcrypt";
import jsonwebtoken from 'jsonwebtoken';
import passport from 'passport';


router.post('/signin', async function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      msg: 'Please enter email and password.'
    });
  } else {
    try {
      var foundUser = await User.findOne({
        where: { email: req.body.email }
      })
      if (foundUser) {
        res.status(400).send({
          msg: 'Email ' + foundUser.email + ' already taken ,please login'
        });
      } else {
        let hashedPassword = await bcrypt.hash(req.body.password, bcrypt.genSaltSync(8))
        let user = await User.create({
          email: req.body.email,
          password: hashedPassword,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        })

        var returnValue = JSON.parse(JSON.stringify(user))
        delete returnValue.password;

        res.status(201).send({
          msg: 'User created successfully',
          data: returnValue
        });
      }
    } catch (exp: any) {
      res.status(201).send({
        msg: 'Error Occured while creating User:' + exp.toString()
      });
    }

  }


});

router.post("/login", async function (req, res) {
  if (req.body.email && req.body.password) {
    var email = req.body.email
    var password = req.body.password;
  }
  // usually this would be a database call:
  var user = await User.findOne({
    where: { email: email }
  })

  if (!user) {
    res.status(401).json({ message: "no such user found" });
  } else {
    var re = await bcrypt.compare(req.body.password, user.password)
    if (re) {
      var payload = { id: user.id };
      var secretKey = process.env.SECRET_KEY || 'abcd1234'
      var token = jsonwebtoken.sign(payload, secretKey);
      res.json({ message: "ok", token: token });
    } else {
      res.status(401).json({ message: "passwords did not match" });
    }
  }
});

router.get("/secret", passport.authenticate('jwt', { session: false }), function (req, res) {
  res.json("Success! You can not see this without a token");
});

export default router;
