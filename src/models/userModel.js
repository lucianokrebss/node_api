const mongoose = require("mongoose");
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;


const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    cpf: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: String },
    requestedAmount: { type: Currency, required: true },
    phoneNumber: [
      {
        _id: false,
        data: { type: Number, required: true },
        updatedAt: { type: Date, default: Date.now }
      }
    ],
    address: [
      {
        _id: false,
        cep: { type: String },
        street: { type: String },
        number: { type: String },
        complement: { type: String },
        city: { type: String },
        state: { type: String },
        updatedAt: { type: Date, default: Date.now }
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true
  }
);


const Users = mongoose.model("Users", userSchema);

module.exports = Users;
