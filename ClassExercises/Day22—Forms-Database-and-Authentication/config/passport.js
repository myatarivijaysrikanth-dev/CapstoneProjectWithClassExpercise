const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = function(passport){

passport.use(new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {

        const user = await User.findOne({ email });

        if(!user){
            return done(null,false,{message:"User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:"Wrong password"});
        }
}));

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser(async(id,done)=>{
    const user = await User.findById(id);
    done(null,user);
});
};