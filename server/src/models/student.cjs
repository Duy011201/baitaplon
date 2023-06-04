'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init({
    fullName: DataTypes.STRING,
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    cccd: DataTypes.STRING,
    province: DataTypes.STRING,
    nation: DataTypes.STRING,
    idDetailStudent: DataTypes.UUID,
    course_name:DataTypes.STRING,
    gk_test: DataTypes.DOUBLE,
    exam_ends:DataTypes.DOUBLE,
    hp_summary: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'student',
  });
  return Student;
};