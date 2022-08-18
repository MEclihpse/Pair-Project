'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Admin)
    }

    static findCourse(id, filter, Admin){
      let opt = {
        include: Admin
      }
      if (filter) {
        opt.where = {
          id
        }
      }
      return Course.findAll(opt)
    }
  }
  Course.init({
    nameCourse: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `name of the course is required`
        },
        notNull: {
          msg: `name of the course is required`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `description is required`
        },
        notNull: {
          msg: `description is required`
        }
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `duration is required`
        },
        notNull: {
          msg: `duration is required`
        }
      }
    },
    AdminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: `AdminId is required`
        },
        notNull: {
          msg: `AdminId is required`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};