const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    cpf: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    birthday: { type: String },
    phoneNumber: { type: Number },
    address: {
      cep: { type: Number },
      street: { type: String },
      number: { type: Number },
      complement: { type: String },
      city: { type: String },
      state: { type: String }
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
