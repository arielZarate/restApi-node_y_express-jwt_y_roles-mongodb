import mongoose from "mongoose";

const SchemaRole = mongoose.Schema(
  {
    nameRole: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    collection: "Role",
  }
);

const Role = mongoose.models.Role || mongoose.model("Role", SchemaRole);
export default Role;
