const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  lastName: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  userName: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  companyName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//static signup
userSchema.statics.register = async function (
  firstName,
  lastName,
  userName,
  companyName,
  password
) {
  const exists = await this.findOne({ userName });
  if (exists) {
    throw Error("Nom D'Utilisateur déja existant!");
  }

  const user = await this.create({
    firstName,
    lastName,
    userName,
    companyName,
    password,
  });

  return user;
};

// static login

userSchema.statics.login = async function (
  firstName,
  lastName,
  userName,
  companyName,
  password
) {
  const fName = await this.findOne({ firstName });

  if (!fName) {
    throw Error('Prénom Incorrect!');
  }

  const lName = await this.findOne({ lastName });

  if (!lName) {
    throw Error('Nom Incorrect!');
  }

  const user = await this.findOne({ userName });

  if (!user) {
    throw Error("Nom D'Utilisateur Incorrect!");
  }

  const company = await this.findOne({ companyName });

  if (!company) {
    throw Error('Nom de la Société Incorrect!');
  }

  const match = await this.findOne({ password });

  if (!match) {
    throw Error('Mot De Passe Incorrect!');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
