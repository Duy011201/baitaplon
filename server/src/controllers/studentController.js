import _ from "lodash";
import { validationResult } from "express-validator";
import Constant from "../common/constant.js";
import studentService from "../services/studentService.js";
import { v4 as uuidv4 } from "uuid";
import moment from 'moment';

const getAllStudent = async (req, res) => {
  const { pageIndex, pageSize, search } = req.body;
  let data = await studentService.getAllStudent(pageSize);
  return res.status(Constant.HttpStatusCode.OK).json(data);
};

const getStudentById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(Constant.HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  try {
    const id = req?.params?.id ?? "";
    const student = await studentService.getStudentById(id);
    if (student) {
      return res.status(Constant.HttpStatusCode.OK).json(student);
    }
  } catch {
    return res
      .status(Constant.HttpStatusCode.FORBIDDEN)
      .json({ message: Constant.OutputType.NOT_FOUND });
  }
};

const updateStudentById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(Constant.HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  try {
    const id = req?.params?.id ?? "";
    const check = await studentService.getStudentById(id);
    if (check) {
      let student = await studentService.updateStudent(req.body.student);

      if (student) {
        return res.status(Constant.HttpStatusCode.OK).json({ message: Constant.OutputType.UPDATE_SUCCESS });
      }
    }
  } catch {
    return res
      .status(Constant.HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: Constant.OutputType.ERROR });
  }
};

const createStudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(Constant.HttpStatusCode.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  try {
    let student = req?.body?.student;
    const cccd = student?.cccd ?? "";
    //let checkCCCD = await studentService.getStudentByCCCD(cccd);
    if (false) {
      return res
        .status(Constant.HttpStatusCode.CONFLICT)
        .json({ message: Constant.OutputType.ACCOUNT_ALREADY_EXIST });
    } else {
      student.id = uuidv4();
      const date = moment(new Date()).format('YYYY-MM-DD');
      student.createdAt = date;
      student.updatedAt = date;
      student = await studentService.createStudent(student);
      return res.status(Constant.HttpStatusCode.OK)
        .json({ student: student, message: Constant.OutputType.CREATE_SUCCESS });
    }
  } catch (ex) {
    console.log(ex);
    return res
      .status(Constant.HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: Constant.OutputType.ERROR });
  }
};

const deleteStudentById = async (req, res) => {
  const id = req?.params?.id ?? "";
  const student = await studentService.getStudentById(id);
  if (!student) {
    return res
      .status(Constant.HttpStatusCode.FORBIDDEN)
      .json({ message: Constant.OutputType.NOT_FOUND });
  } else {
    await studentService
      .deleteStudentById(id)
      .then(() => {
        return res.status(Constant.HttpStatusCode.OK).json({
          message: Constant.OutputType.DELETE_SUCCESS,
        });
      })
      .catch((err) => {
        return res.status(Constant.HttpStatusCode.BAD_REQUEST).json({
          message: Constant.OutputType.ERROR_PROCESSING_DELETE,
          error: err,
        });
      });
  }
};

export default {
  getAllStudent,
  getStudentById,
  createStudent,
  updateStudentById,
  deleteStudentById,
};
