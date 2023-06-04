const jwt =require("jsonwebtoken");
const bcrypt =require("bcrypt")
const users = require("../models/auth.model")

const register = async(req,res)=>{
  try {

    const {email,name,password}=req.body;

    const findEmail = await users.findOne({email:email});
    if(findEmail){
      return res.status(400).send({message:"User already exists"})
    }
    
    const findUserName = await users.findOne({name:name});
    if(findUserName){
      return res.status(400).send({message:"Username already taken!"})
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password,salt);

    delete password;

    const createUser = await new users({
      name:name,
      email:email,
      password:hashedPassword
    });

    await createUser.save();

    if(createUser){
      return res.status(201).send({message:"User registered successfully!"})
    }

    return res.status(400).send({message:"Error registering user"})

  } catch (error) {
    return res.status(500).send({message:"Internal server error"})
  }
}


//   const { email, password } = req.body;
//   try {
//     const existinguser = await users.findOne({ email });
//     if (!existinguser) {
//       return res.status(404).json({ message: "User don't Exist" });
//     }

//     const isPasswordCrt = await bcrypt.compare(password, existinguser.password);

//     if (!isPasswordCrt) {
//       return res.status(400).json({ message: "Invalid Credentials" });
//     }
//     const token = jwt.sign(
//       { email: existinguser.email, id: existinguser._id },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1h",
//       }
//     );
//     res.status(200).json({ result: existinguser, token });
//   } catch (error) {
//     res.status(500).json("something went Wrong...");
//   }
// };

const login =async(req,res)=>{

  try {
    const {email,password}=req.body;
    const findingEmail = await users.findOne({email:email});

    if(!findingEmail){
      return res.status(400).send({message:"Email doesn't exist! Please try registering"})
    }

    const comparePassword = await bcrypt.compare(password,findingEmail.password);

    if(!comparePassword){
      return res.status(400).send({message:"Incorrect password!"})
    }

    const token = jwt.sign({email:findingEmail.email,id:findingEmail._id},process.env.JWT_SECRET,{expiresIn:"1h"});

    const data = {
      email:findingEmail.email,
      id:findingEmail._id,
      name:findingEmail.name
    }

    return res.status(200).send({message:"Login successful",result:data,accessToken:token})
  } catch (error) {
    return res.status(500).send({message:"Internal server error"})
  }
}



module.exports = {register,login};