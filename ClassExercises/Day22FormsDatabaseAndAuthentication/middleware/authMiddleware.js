module.exports = {

ensureAuthenticated: function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.send("Please login first");
},

ensureAdmin: function(req,res,next){
    if(req.isAuthenticated() && req.user.role === "admin"){
        return next();
    }
    res.send("Access Denied");
}

};