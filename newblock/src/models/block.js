import mongoose from "mongoose";

//Blockschema list out all the property we want
const blockSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    value: { type: [], required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
//model represnt entire collection
const Block = mongoose.model("Block", blockSchema);
export { Block };
