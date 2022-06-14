import mongoose from "mongoose";
import bcrypt from "bcrypt"; //bluefish algo
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, require: true },
    verified: { type: String, required: true },
    googleId: { type: String },
  },
  {
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
  console.log("pre save");
  const salt = await bcrypt.genSalt(10);
  const hashedPassoword = await bcrypt.hash(this.password, salt);
  this.set("password", hashedPassoword);
  console.log(this.password);
  done();
});

const User = mongoose.model("User", userSchema);

export { User };
