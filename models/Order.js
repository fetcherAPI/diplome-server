import mongoose from "mongoose";

const OrderShema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    telNumber: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },

    orders: {
      type: [
        {
          id: String,
          title: String,
          isAddedBasket: Boolean,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderShema);
