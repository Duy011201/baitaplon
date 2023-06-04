import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, FormControl, FormLabel } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { createStudent, deleteStudentById, updateStudentById } from './StudyService.js';
import { gender, province, nation } from "../../common/constants";
import LoaderPage from "../../components/loader-page/Loader.jsx";
import moment from 'moment/moment.js';

export function AddStudentDialog(setOpenPopup) {
    const [loading, setLoading] = useState(false);
    const [student, setStudent] = useState({
        'course_name': '',
        'gk_test': '',
        'fullName': '',
        'exam_ends': '',
        'hp_summary': ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createStudent(student);
        if (res.status === 200) {
            setLoading(true);
            setTimeout(function () {
                window.location.reload();
                setOpenPopup(false);
            }, 500);
        } 
        
        // if (true) {
        //     setLoading(true);
        //     setTimeout(function () {
        //         setOpenPopup(false);
        //         window.location.reload();
        //     }, 500);
        // }
        // console.log(loading);
    }

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
        console.log(student);
    };

    return (
        <FormControl>
            <div className="loading-page">
                {loading ? <LoaderPage></LoaderPage> : null}
            </div>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", rowGap: "20px" }}
                component="form"
                onSubmit={handleSubmit}
                noValidate>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Họ tên</FormLabel>
                    <TextField
                        type="text" name='fullName' value={student.fullName} onChange={handleChange}
                        placeholder="Nhập họ và tên" onBlur={handleChange} required>
                    </TextField>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Tên môn học</FormLabel>
                    <TextField
                        type="text" name='course_name' value={student.course_name} onChange={handleChange}
                        placeholder="Nhập tên môn học" onBlur={handleChange} required>
                    </TextField>
                </Box>

                {/* <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Lần thi</FormLabel>
                    <TextField
                        type="text" name='exam_times' value={study.exam_times} onChange={handleChange}
                        placeholder="Nhập lần thi" onBlur={handleChange} required>
                    </TextField>
                </Box> */}

                {/* <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Đánh giá</FormLabel>
                    <TextField
                        type="text" name='evaluate' value={study.evaluate} onChange={handleChange}
                        placeholder="Nhập đánh giá" onBlur={handleChange} required>
                    </TextField>
                </Box> */}

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Điểm kiểm tra giữa kỳ</FormLabel>
                    <TextField
                        type="text" name='gk_test' value={student.gk_test} onChange={handleChange}
                        placeholder="Nhập điểm kiểm tra giữa kỳ" onBlur={handleChange} required>
                    </TextField>
                </Box>

                {/* <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Điểm thực hành</FormLabel>
                    <TextField
                        type="text" name='practice' value={study.practice} onChange={handleChange}
                        placeholder="Nhập điểm thực hành" onBlur={handleChange} required>
                    </TextField>
                </Box> */}

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Điểm thi kết thúc</FormLabel>
                    <TextField
                        type="text" name='exam_ends' value={student.exam_ends} onChange={handleChange}
                        placeholder="Nhập điểm thi kết thúc" onBlur={handleChange} required>
                    </TextField>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Điểm tổng kết học phần</FormLabel>
                    <TextField
                        type="text" name='hp_summary' value={student.hp_summary} onChange={handleChange}
                        placeholder="Nhập điểm tổng kết học phần" onBlur={handleChange} required>
                    </TextField>
                </Box>

                {/* <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Điểm chữ</FormLabel>
                    <TextField
                        type="text" name='letter_poin' value={study.letter_poin} onChange={handleChange}
                        placeholder="Nhập điểm chữ" onBlur={handleChange} required>
                    </TextField>
                </Box> */}

                <Box sx={{ width: "100%", textAlign: "end" }}>
                    <Button sx={{ mr: 2 }} variant="contained" onClick={() => setOpenPopup(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Box>
            </Box>
        </FormControl>
    )
}

export function ChangeStudyDialog(props, setOpenPopup) {

    const [loading, setLoading] = useState(false);
    const { ...data } = props;
    const [student, setStudent] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        student.id = data.id;
        console.log(student);
        const res = await updateStudentById(student);
        if (res.status === 200) {
            setLoading(true);
            setTimeout(function () {
                window.location.reload();
                setOpenPopup(false);
            }, 500);

        }
    }

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    return (
        <FormControl>
            <div className="loading-page">
                {loading ? <LoaderPage></LoaderPage> : null}
            </div>
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", rowGap: "20px" }}
                component="form"
                onSubmit={handleSubmit}
                noValidate>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Họ tên</FormLabel>
                    <TextField
                        type="text" name='fullName' value={student.fullName === '' ? student.fullName = data.fullName : student.fullName}
                        placeholder="Nhập họ và tên" onChange={handleChange} onMouseLeave={handleChange} onBlur={handleChange} required>
                    </TextField>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Tên môn học</FormLabel>
                    <TextField
                        type="text" name='course_name' value={student.course_name === '' ? student.course_name = data.course_name : student.course_name}
                        placeholder="Nhập Tên môn học" onChange={handleChange} onBlur={handleChange} required>
                    </TextField>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Điểm giữa kỳ</FormLabel>
                    <TextField
                        type="text" name='gk_test' value={student.gk_test === '' ? student.gk_test = data.gk_test : student.gk_test}
                        placeholder="Nhập điểm gk" onChange={handleChange} onBlur={handleChange} required>
                    </TextField>
                </Box>
                {/* <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Họ tên</FormLabel>
                    <TextField
                        type="text" name='course_name' value={student.course_name === '' ? student.course_name = data.course_name : student.course_name}
                        placeholder="Nhập Tên môn học" onChange={handleChange} onBlur={handleChange} required>
                    </TextField>
                </Box> */}

                {/* <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Điểm kiểm tra gk</FormLabel>
                    <TextField
                        type="text" name='exam_times' value={student.exam_times === '' ? student.exam_times = data.exam_times : student.exam_times}
                        placeholder="Nhập điểm kiểm tra gk" onChange={handleChange} onBlur={handleChange} required>
                    </TextField>
                </Box> */}

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Điểm kết thúc</FormLabel>
                    <TextField
                        type="text" name='exam_ends' value={student.exam_ends === '' ? student.exam_ends = data.exam_ends : student.exam_ends}
                        placeholder="Nhập điểm thi kết thúc" onChange={handleChange} onBlur={handleChange} required>
                    </TextField>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Điểm tổng kết</FormLabel>
                    <TextField
                        type="text" name='hp_summary' value={student.hp_summary === '' ? student.hp_summary = data.hp_summary : student.hp_summary}
                        placeholder="Nhập điểm tổng kết" onChange={handleChange} onBlur={handleChange} required>
                    </TextField>
                </Box>

                {/* <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Giới tính</FormLabel>
                    <Autocomplete
                        options={gender.map((option) => option.label)}
                        renderInput={(params) =>
                            <TextField name='gender' onMouseLeave={handleChange}
                                value={student.gender} onBlur={handleChange}
                                onChange={handleChange} helperText={data.gender} required {...params} />}
                    />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Ngày sinh</FormLabel>
                    <TextField
                        type="date" name='dateOfBirth' onBlur={handleChange} required
                        value={student.dateOfBirth} onChange={handleChange} onMouseLeave={handleChange}
                        helperText={moment(data.dateOfBirth).format("DD/MM/YYYY")}>
                    </TextField>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>CCCD</FormLabel>
                    <TextField
                        type="text"
                        name='cccd'
                        value={student.cccd === '' ? student.cccd = data.cccd : student.cccd}
                        onChange={handleChange} onMouseLeave={handleChange} onBlur={handleChange}
                        helperText=""
                        placeholder="Nhập số cccd"
                        required></TextField>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Tỉnh</FormLabel>
                    <Autocomplete
                        options={province.map((option) => option.value)}
                        renderInput={(params) =>
                            <TextField name='province' onChange={handleChange} onMouseLeave={handleChange}
                                value={student.province} helperText={data.province} onBlur={handleChange} required {...params} />}
                    />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Quốc gia</FormLabel>
                    <Autocomplete
                        options={nation.map((option) => option.name)}
                        selectOnFocus
                        renderInput={(params) =>
                            <TextField name='nation'
                                value={student.nation} onChange={handleChange} onMouseLeave={handleChange}
                                helperText={data.nation} onBlur={handleChange} required {...params} />}
                    />
                </Box> */}

                <Box sx={{ width: "100%", textAlign: "end" }}>
                    <Button sx={{ mr: 2 }} variant="contained" onClick={() => setOpenPopup(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Box>
            </Box>
        </FormControl>
    )
}
export function DeleteStudentDialog(props, setOpenPopup) {

    const { ...data } = props;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await deleteStudentById(data.id);
        if (res.status === 200) {
            setTimeout(function () {
                setOpenPopup(false);
            }, 500);
        }
    }

    return (
        <Box sx={{ display: "flex", justifyContent: 'space-between', width: '200px' }}>
            <Button variant="contained" onClick={() => setOpenPopup(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>Delete</Button>
        </Box>
    )
}
function deltailStudentDialog() {
    return (
        <div></div>
    )
}

// export default {AddStudentDialog, ChangeStudentDialog};

