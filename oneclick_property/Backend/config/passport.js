
import User from 'Backend/model/User';
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'

passport.use(new GoogleStrategy({
    clientID: '632911683736-7mr2jvb48jk46lt9o8edghb6r2pjatto.apps.googleusercontent.com',
    clientSecret: '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'
}),()=>{
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
      });
})