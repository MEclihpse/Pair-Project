'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.hasMany(models.Course)
      Admin.hasOne(models.Profile)
    }
  }
  Admin.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Email is required`
        },
        notNull: {
          msg: `Email is required`
        },
        unique: {
          msg: `email has been used`
        },
        isEmail: {
          msg: `input must email format`
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `Username is required`
        },
        notNull: {
          msg: `Username is required`
        },
        unique: {
          msg: `username has been used`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `password is required`
        },
        notNull: {
          msg: `password is required`
        },
        isAlphanumeric: {
          msg: `password must be alphanumeric`
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `role is required`
        },
        notNull: {
          msg: `role is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Admin',
  });

  Admin.beforeCreate((value) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(value.password, salt);
    value.password = hash
  })
  return Admin;
};