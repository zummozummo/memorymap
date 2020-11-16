import mongoose from "mongoose";
import { Password } from "../services/password";
//interface that discribe the properties required to
//create a new user
interface UserAttrs {
  email: string;
  password: string;
}

//interface that describe the properties that a user
//model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//An interface that describes the properteis that
//user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String, //this is mongoose not ts
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    //transforming the json response
    //this code should be into view side of the code MVC
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
//<a,b> generics
//return type will be 2nd parameter of type UserModel
//allow us to customeize types in  class interfcce or function
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
