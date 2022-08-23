import mongoose from "mongoose";

export const Opportunity = mongoose.model("Opportunity", {
  name: String,
  status: String,
  customer_id: String,
});