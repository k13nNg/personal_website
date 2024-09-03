import express from "express";
import bcrypt from "bcryptjs";
import db from "../connection.js";
import createSecretToken from "../util/secretToken.js";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// router.get("/getUser/:username", async (req, res) => {
//     let collection = await db.collection(process.env.ADMIN_COLLECTION);
//     let query = {username: req.params.username};
//     let result = await collection.findOne(query);

//     if (!result) {
//         res.send({}).status(200);
//     } else {
//         res.send(result).status(200);
//     }
// })

router.post("/", async (req, res) => {
    try {

        let collection = await db.collection(process.env.ADMIN_COLLECTION);
        let {username, password} = req.body;
    
        if (!username || !password) {
            return res.json({message: "All fields are required!"});
        } 
    
        const user = await collection.findOne({username: username});    
    
        if (!user) {
            return res.json({message: "Username or Password is incorrect!"});
        }
    
        const auth = await bcrypt.compare(password, user.password);
    
        if (!auth) {
            return res.json({message: "Username or Password is incorrect!"});
        }
    
        const token = createSecretToken(user._id);

        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: 2 * 60 * 60 * 1000,
            sameSite: 'none',
            secure: true
        });
    
        res.status(201).json({message: "User logged in successfully", success: true});

    } catch (error) {
        console.error(error);
    }

})

export default router;
