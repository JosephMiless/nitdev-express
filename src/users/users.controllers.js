import { users } from "./users.services.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { loginUserSchema } from "../validators/users.js";
import { aToken } from "../config/jwt.js";
import { User } from "../models/user.js";
import { generateStateSecurityNumber } from "../utils/helpers.js";

export const signUpuserController = async (req, res) => {
  try {
    // destructure data from the frontend
    let { firstName, lastName, email, password } = req.body;

    // validate user input

    if (!firstName)
      return res.status(400).json({ error: `firstName is required` });
    if (!lastName)
      return res.status(400).json({ error: `lastName is required` });
    if (!email) return res.status(400).json({ error: `email is required` });
    if (!password)
      return res.status(400).json({ error: `password is required` });

    // check if a user exists
    let user = await User.findOne({ where: { email: email } });
    
    // throw an error if a user is found
    if (user)
      return res
        .status(400)
        .json({ error: `User exists with email: ${email}` });

    const hashedPassword = await hashPassword(password);

    const newUser = User.create({
      ...req.body,
      password: hashedPassword,
      SSN: generateStateSecurityNumber(),
    });

    return res.status(201).json({
      message: `User registered successfulyy`,
      user: newUser,
    });
  } catch (error) {
    console.error("Error signing up user", error);

    return res.status(500).json({ error: `Intrnal Server error` });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { error, value } = loginUserSchema.validate(req.body);

    if (error) return res.status(400).json({ error: error.message });

    const { email, password } = value;

    const userExists = await User.findOne({ where: { email: email } });

    if (!userExists)
      return res
        .status(404)
        .json({ error: `User not found. Kindly create an account to login!` });

    const isMatch = await comparePassword(value.password, userExists.password);

    if (!isMatch) return res.status(400).json({ error: `Invalid credentials` });


    const accessTokeen = aToken({ id : userExists.id,  });

    return res
      .status(200)
      .json({ message: `User logged in succeessfuly!`, accessTokeen });
  } catch (error) {
    console.error(`Error logging in user. Error: ${error}`);

    return res.status(500).json({ error: `Internal Server Error.` });
  }
};

export const getUserProfileeControlleer = async (req, res) => {
  try {
      const loggedIn = req.user;
      
      console.log(loggedIn)

    if (!loggedIn) return res.status(401).json({ error: `Unauthorized!` });

    const id = loggedIn.id;

      const user = await  User.findOne({ where: { id: id } });
      console.log(user)
    if (!user)
      return res.status(404).json({ error: `user not found with id: ${id}` });

    return res.status(200).json({ user });
  } catch (error) {}
};
