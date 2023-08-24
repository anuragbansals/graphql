import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/User.js"
import { SECRET_KEY } from "../../config.js";

export default {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // TODO: Validate user data
      // TODO: Make sure user doesnt already exist

      const user = await User.findOne({username});
      if(user){
        throw new Error("Username is taken")
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = jwt.sign({
        id: res.id,
        email: res.email,
        username: res.username,
      }, SECRET_KEY, {expiresIn: '1h'});

      return {
        ...res._doc,
        id: res._id,
        token
      }
    },
  },
};
