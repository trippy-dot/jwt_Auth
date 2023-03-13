const User=require('../model/user')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs')
const config=require('../config/config')
const securePassword=async(password)=>{
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        // res.status(400).send(error.message);
        console.log(error);
    }
}
const createToken=async(id)=>{
    try {
        const token = await jwt.sign({ _id: id }, config.secrect_key, { expiresIn: "1h" });
        return token;
    } catch (error) {
        // res.status(400).send(error.message);
        console.log(error);
    }
}


const create=async(req,res)=>{
    try{
        const setpassword = await securePassword(req.body.password)
        const userModel = new User({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: setpassword,
            image: req.file.filename,
            type: req.body.type,
        });
        const userData = await userModel.collection.findOne({ email: req.body.email })
        if (userData) {
            return res.status(404).json({ success: false, msg: "This email already exist" });
        } else {
            const user_data = await userModel.save();
            const tokendata = await createToken(user_data._id)
            return res.status(200).json({ success: true, data: user_data, "token": tokendata });
        }
    }catch (error) {
        return res.status(400).json(error.message);
       // console.log(error.message);
    }

}

module.exports={
    create
}