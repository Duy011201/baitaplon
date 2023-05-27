import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, FormControl, FormLabel } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { createStudent, deleteStudentById, updateStudentById } from './InfomationService.js';
import { gender, province, nation } from "../../common/constants";
import LoaderPage from "../../components/loader-page/Loader.jsx";
import moment from 'moment/moment.js';

export function AddStudentDialog(setOpenPopup) {
    const [loading, setLoading] = useState(false);
    const [student, setStudent] = useState({
        'cccd': '',
        'dateOfBirth': '',
        'fullName': '',
        'gender': '',
        'nation': '',
        'province': ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const res = await createStudent(student);
        // if (res.status === 200) {
        //     setLoading(true);
        //     setTimeout(function () {
        //         let loadpage = document.querySelector(".loading-page");
        //         loadpage.innerHTML = "";
        //         setOpenPopup(false);
        //     }, 500);
        // } 
        
        if (true) {
            setLoading(true);
            setTimeout(function () {
                setOpenPopup(false);
                window.location.reload();
            }, 500);
        }
        console.log(loading);
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
                        placeholder="Nhập họ và tên" onMouseLeave={handleChange} onBlur={handleChange} required>
                    </TextField>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Giới tính</FormLabel>
                    <Autocomplete
                        options={gender.map((option) => option.label)}
                        renderInput={(params) =>
                            <TextField name='gender' onMouseLeave={handleChange}
                                value={student.gender} onChange={handleChange} onBlur={handleChange} required {...params} />}
                    />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Ngày sinh</FormLabel>
                    <TextField
                        type="date" name='dateOfBirth' required value={student.dateOfBirth}
                        onChange={handleChange} onBlur={handleChange} onMouseLeave={handleChange}>
                    </TextField>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>CCCD</FormLabel>
                    <TextField
                        type="text" name='cccd' value={student.cccd} onChange={handleChange} required
                        onMouseLeave={handleChange} onBlur={handleChange} helperText="" placeholder="Nhập số cccd"
                    />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Tỉnh</FormLabel>
                    <Autocomplete
                        options={province.map((option) => option.value)}
                        renderInput={(params) =>
                            <TextField name='province' onMouseLeave={handleChange} onBlur={handleChange}
                                value={student.province} onChange={handleChange} {...params} />}
                    />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Quốc gia</FormLabel>
                    <Autocomplete
                        options={nation.map((option) => option.name)}
                        renderInput={(params) =>
                            <TextField name='nation' onMouseLeave={handleChange} onBlur={handleChange}
                                value={student.nation} onChange={handleChange} required {...params} />}
                    />
                </Box>

                <Box sx={{ width: "100%", textAlign: "end" }}>
                    <Button sx={{ mr: 2 }} variant="contained" onClick={() => setOpenPopup(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Box>
            </Box>
        </FormControl>
    )
}

export function ChangeStudentDialog(props, setOpenPopup) {

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
                </Box>

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

