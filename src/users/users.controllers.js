import { users } from "./users.services.js";
import { comparePassword, hashPassword } from '../utils/bcrypt.js';
import { loginUserSchema } from '../validators/users.js';
import { aToken } from '../config/jwt.js';


export const signUpuserController = async (req, res) => {
    try {

        // destructure data from the frontend
          let {id, name, email, password} = req.body;
        
          // validate user input
          if(!id) return res.status(400).json({error: `id is required`});
          if(!name) return res.status(400).json({error: `name is required`});
          if(!email) return res.status(400).json({error: `email is required`});
          if(!password) return res.status(400).json({error: `password is required`});
        
          // check if a user exists
          let user = users.find((user) => user.email === email);
        
          // throw an error if a user is found
          if(user) return res.status(400).json({error: `User exists with email: ${email}`});
        
          req.body.password = await hashPassword(password);
        
          user = users.push(req.body);
        
          return res.status(201).json({message: `Account registered successfulyy`,user:  users[users.length-1]});
        
    } catch (error) {

        console.error("Error signing up user", error);
        
        return res.status(500).json({error: `Intrnal Server error`})
        
    }
};

export const loginUserController = async (req, res) => {
    try {

        const {error, value} = loginUserSchema.validate(req.body);

    if(error) return res.status(400).json({error: error.message});

    const {email, password} = value;

    const userExists = users.find((user) => user.email === value.email);

    if(!userExists) return res.status(404).json({error: `User not found. Kindly create an account to login!`});

    const isMatch = await comparePassword(value.password, userExists.password);

    if(!isMatch) return res.status(400).json({error: `Invalid credentials`});

    const id = userExists.id;
    const role = userExists.role;

    const accessTokeen = aToken({id, role});

    return res.status(200).json({message: `User logged in succeessfuly!`, accessTokeen});
        
    } catch (error) {

        console.error(`Error logging in user. Error: ${error}`);

        return res.status(500).json({error: `Internal Server Error.`});
        
    }
};

export const getUserProfileeControlleer = async (req, res) => {
    try {

        const loggedIn = req.user;

        if(!loggedIn) return res.status(401).json({error: `Unauthorized!`});

            const id = loggedIn.id;
        
            const user = users.find((user) => user.id === parseInt(id));
            if(!user) return res.status(404).json({error: `user not found with id: ${id}`})

            return res.status(200).json({user});
        
    } catch (error) {
        
    }
};