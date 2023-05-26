import {db} from "../config/connect.js";
// import db from "../models/index.cjs";
import logger from "../config/winston.js";

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
      return await db.User.create(user);
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
