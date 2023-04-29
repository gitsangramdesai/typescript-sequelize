import passport from 'passport';
import { User } from '../models';
import bcrypt from 'bcrypt';
import passportJwt from 'passport-jwt';

var ExtractJwt = passportJwt.ExtractJwt;
var JwtStrategy = passportJwt.Strategy;


var strategy = new JwtStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY,
    }, function (jwtToken, done) {
        var user = User.findOne({
            where: { id: jwtToken.id }
        })
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });

passport.use(strategy);