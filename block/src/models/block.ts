import mongoose, { Schema, model } from "mongoose";

interface BlockAttrs {
  type: string;
  value: [];
}

//Blockschema list out all the property we want
const blockSchema = new Schema<BlockAttrs>(
  {
    type: { type: String, required: true },
    value: { type: [], required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret.id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);
//model represnt entire collection
const Block = model<BlockAttrs>("Block", blockSchema);
export { Block, BlockAttrs };
