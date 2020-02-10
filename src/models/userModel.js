const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    email: { type: String},
    password: { type: String },
    cpf: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    birthday: { type: String },
    requestedAmount: {type: mongoose.Schema.Types.Decimal128, default: "0.0"},
    phoneNumber: [
      {
        _id:false,
        data: { type: Number },
        updatedAt: { type: Date, default: Date.now }
      }
    ],
    address: [
      {
        _id:false,
        cep: { type: String},
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
