const mongoose = require('mongoose');
const bcrypt  = require('bcrypt');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique : true,
        lowercase : true
    },
    password:{
        type:String,
        required:true,
        minLength : 6,
    },
    gender : {
        type : String,
    },
    address :{
        type : String,
    },
    dob : {
        type : String,
    },
    state : {
        type :String,
    },
    pincode :{
        type : String,
    }
},{
    timestamps:true
});

userSchema.post('save',function(doc , next){
    console.log('new user has been created and saved' ,doc);
    next();
});
userSchema.pre('save' , async function(next){

    const salt = await bcrypt.genSalt();

    this.password = await bcrypt.hash(this.password ,salt);
    next();

} );

userSchema.statics.login = async function(email , password){

    const user = await this.findOne({email}) // with same email
    if(user)
    {
        const auth = await bcrypt.compare(password , user.password);
        if(auth)
        {
            return user;
        }
        
        throw Error("Invalid Password");
    }
    else{
        throw Error("incorrect email")
    }

    
}

const userModel = mongoose.model('users' , userSchema);

module.exports = userModel;