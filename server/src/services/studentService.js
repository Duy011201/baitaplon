import { db, sequelize } from "../config/connect.js";
// import db  from "../models/index.cjs";
import logger from "../config/winston.js";
import moment from "moment";

const studentService = {
  getAllStudent: async (pageSize) => {
    try {
      return await db.Student.findAndCountAll({
        limit: pageSize,
        logging: (sql) => {
          logger.info(sql);
        },
      });
    } catch (err) {
      logger.error(err);
    }
  },
  getStudentById: async (id) => {
    try {
      return await db.Student.findOne({
        where: { id: id },
        logging: (sql) => {
          logger.info(sql);
        },
      });
    } catch (err) {
      logger.error(err);
      return null;
    }
  },
  getStudentByCCCD: async (cccd) => {
    try {
      return await db.Student.findOne({
        where: { cccd: cccd },
        logging: (sql) => {
          logger.info(sql);
        },
      });
    } catch (err) {
      logger.error(err);
      return null;
    }
  },
  createStudent: async (student) => {
    try {
      return sequelize.query(`INSERT INTO students 
      (id, fullName, gender, dateOfBirth, cccd, province, nation, createdAt, updatedAt, course_name, gk_test, exam_ends, hp_summary) 
      VALUES ('${student.id}', N'${student.fullName}', N'${student.gender}', '${student.dateOfBirth}', 
        '${student.cccd}', N'${student.province}', N'${student.nation}', '${student.createdAt}', '${student.updatedAt}',N'${student.course_name}','${student.gk_test}','${student.exam_ends}','${student.hp_summary}')
      `, { logging: console.log });
    } catch (err) {
      logger.error(err);
    }
  },
  updateStudent: async (student) => {
    try {
      let date = new Date();
      date = moment(date).format('YYYY-MM-DD')
      return sequelize.query(`UPDATE students SET fullName = N'${student.fullName}',gender = N'${student.gender}', dateOfBirth = '${student.dateOfBirth}',` 
      + `cccd = '${student.cccd}',province = N'${student.province}',nation = N'${student.nation}',updatedAt = '${date}', course_name = N'${student.course_name}', gk_test = '${student.gk_test}' ,exam_ends = '${student.exam_ends}', hp_summary = '${student.hp_summary}' WHERE id = '${student.id}'`, { logging: console.log });
    } catch (err) {
      logger.error(err);
    }
  },
  deleteStudentById: async (id) => {
    try {
      // return sequelize.query(`DELETE FROM students WHERE fullName  ` , { logging: console.log });
      console.log(id);
      return db.Student.destroy({ where: { id: id } });
    } catch (err) {
      logger.error(err);
    }
  },
};

export default studentService;
