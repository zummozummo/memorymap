import mongoose from "mongoose";

interface BlockAttrs {
  title: string;
  price: number;
  userId: string;
}

interface BlockDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

interface BlockModel extends mongoose.Model<BlockDoc> {
  build(attrs: BlockAttrs): BlockDoc;
}

const blockSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

blockSchema.statics.build = (attrs: BlockAttrs) => {
  return new Block(attrs);
};

const Block = mongoose.model<BlockDoc, BlockModel>("Block", blockSchema);

export { Block };
