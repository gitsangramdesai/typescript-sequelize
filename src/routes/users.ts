import express from 'express';
import { getLogger } from '@/utils/loggers';
const router = express.Router();
const logger = getLogger('USER_ROUTE');
import { User } from '../models';
import bcrypt from "bcrypt";


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

export default router;
