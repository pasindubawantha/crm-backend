import mongoose from "mongoose";

export const Customer = mongoose.model("Customer", {
  status: String,
  creation_date: Number,
  name: String,
  email: String,
  mobile_number: String,
  address: String,
});