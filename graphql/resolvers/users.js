import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

import User from "../../models/User.js";
import { SECRET_KEY } from "../../config.js";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../../utils/validator.js";

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

export default {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      const user = await User.findOne({ username });

      if(!valid){
        throw new Error("Invalid Input");
      }

      if (!user) {
        errors.general = "User not found";
        throw new Error("User not found");
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentails";
        throw new Error("Wrong credentials!");
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      // TODO: Validate user data

      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new GraphQLError(
          { errors },
          {
            extensions: { code: "GRAPHQL_VALIDATION_FAILED" },
          }
        );
      }
      // TODO: Make sure user doesnt already exist

      const user = await User.findOne({ username });
      if (user) {
        throw new Error("Username is taken");
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
