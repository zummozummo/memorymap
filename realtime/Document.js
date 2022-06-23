const { Schema, model } = require("mongoose");

const Document = new Schema(
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

module.exports = model("Block", Document);
