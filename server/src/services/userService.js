import { db, sequelize } from "../config/connect.js";
// import db from "../models/index.cjs";
import logger from "../config/winston.js";
import moment from "moment";
import bcrypt from "bcrypt";

const userService = {
  getAllUser: async (pageSize) => {
    try {
      return await db.User.findAndCountAll({
        limit: pageSize,
        logging: (sql) => {
          logger.info(sql);
        },
      });
    } catch (err) {
      logger.error(sql);
      logger.error(err);
    }
  },
  getUserByUsername: async (username) => {
    try {
      return await db.User.findOne({
        where: { username: username },
        logging: (sql) => {
          logger.info(sql);
        },
      });
    } catch (err) {
      logger.error(err);
    }
  },
  getUserById: async (id) => {
    try {
      return await db.User.findOne({
        where: { id: id },
        logging: (sql) => {
          logger.info(sql);
        },
      });
    } catch (err) {
      logger.error(err);
    }
  },
  createUser: async (user) => {
    try {
      let date = new Date();
      date = moment(date).format('YYYY-MM-DD');

      let strQuery = `INSERT INTO users VALUES('${user.id}',`;

      strQuery += `'${user.fullName ? user.fullName : ''}',`;

      strQuery += `'${user.email}',`;

      strQuery += `'${user.username}',`;

      const salt = 10;
      const hashPassword = bcrypt.hashSync(user.password, salt);
      strQuery += `'${hashPassword}',`;

      strQuery += `'${user.role}',`;

      strQuery += `'${date}', '${date}')`

      return sequelize.query(strQuery, { logging: console.log });
    } catch (err) {
      logger.error(err);
    }
  },
  updateUserById: async (user) => {
    try {
      let date = new Date();
      date = moment(date).format('YYYY-MM-DD');

      let strQuery = `UPDATE users SET `;

      if (user.fullName) {
        strQuery += `fullName = N'${user.fullName}',`;
      }

      if (user.email) {
        strQuery += `email = '${user.email}',`;
      }

      if (user.username) {
        strQuery += `username = '${user.username}',`;
      }

      if (user.password) {
        const salt = 10;
        const hashPassword = bcrypt.hashSync(user.password, salt);
        strQuery += `password = '${hashPassword}',`;
      }

      if (user.role) {
        strQuery += `role = '${user.role}',`;
      }

      strQuery += `updatedAt = '${date}' WHERE id = '${user.id}'`

      return sequelize.query(strQuery, { logging: console.log });
    } catch (err) {
      logger.error(err);
    }
  },
  deleteUserById: async (id) => {
    try {
      return db.User.destroy({ where: { id: id } });
    } catch (err) {
      logger.error(err);
    }
  },
};

export default userService;
