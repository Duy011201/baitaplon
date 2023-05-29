import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, FormControl, FormLabel } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { createUser, getUserById, updateUserById, deleteUserById } from './UserService.js';
import { gender, province, nation } from "../../common/constants";
import LoaderPage from "../../components/loader-page/Loader.jsx";
import moment from 'moment/moment.js';

export function AddUserDialog(setOpenPopup) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        'fullName': '',
        'email': '',
        'username': '',
        'password': '',
        'role': '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createUser(user);
        console.log(res);
        if (res.status === 201) {
            setLoading(true);
            setTimeout(function () {
                window.location.reload();
                setOpenPopup(false);
            }, 500);
        } 
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
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
                    <FormLabel>FullName</FormLabel>
                    <TextField
                        type="text" name='fullName' value={user.fullName} onChange={handleChange}
                        placeholder="Nhập họ và tên" onMouseLeave={handleChange} onBlur={handleChange} required>
                    </TextField>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Email</FormLabel>
                    <TextField
                        type="text" name='email' value={user.email} onChange={handleChange}
                        placeholder="Nhập email" onMouseLeave={handleChange} onBlur={handleChange} required>
                    </TextField>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Username</FormLabel>
                    <TextField
                        type="text" name='username' value={user.username} onChange={handleChange}
                        placeholder="Nhập tên đăng nhập" onMouseLeave={handleChange} onBlur={handleChange} required>
                    </TextField>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Password</FormLabel>
                    <TextField
                        type="text" name='password' value={user.password} onChange={handleChange}
                        placeholder="Nhập mật khẩu" onMouseLeave={handleChange} onBlur={handleChange} required>
                    </TextField>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Role</FormLabel>
                    <TextField
                        type="text" name='role' value={user.role} onChange={handleChange}
                        placeholder="Nhập mật khẩu" onMouseLeave={handleChange} onBlur={handleChange} required>
                    </TextField>
                </Box>

                <Box sx={{ width: "100%", textAlign: "end" }}>
                    <Button sx={{ mr: 2 }} variant="contained" onClick={() => setOpenPopup(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Box>
            </Box>
        </FormControl>
    )
}

export function ChangeUserDialog(props, setOpenPopup) {

    const [loading, setLoading] = useState(false);
    const { ...data } = props;
    const [user, setUser] = useState({
        'id' : '',
        'fullName': '',
        'email': '',
        'username': '',
        'password': '',
        'role': ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        user.id = data.id;
        console.log(user);
        const res = await updateUserById(user);
        if (res.status === 200) {
            setLoading(true);
            setTimeout(function () {
                window.location.reload();
                setOpenPopup(false);
            }, 500);

        }
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    function checkIsNull (value) {
        return value === null && value === undefined ? '' : value;
    }

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
                    <FormLabel>FullName</FormLabel>
                    <TextField
                        type="text" name='fullName' value={user.fullName === '' ? user.fullName = 
                        (data.fullName === null ? data.fullName = '' : data.fullName): user.fullName} onChange={handleChange}
                        placeholder="Nhập họ và tên" onMouseLeave={handleChange} onBlur={handleChange} required>
                    </TextField>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Email</FormLabel>
                    <TextField
                        type="text" name='email' value={user.email === '' ? user.email = 
                        (data.email === null ? data.email = '' : data.email) : user.email} onChange={handleChange}
                        placeholder="Nhập email" onMouseLeave={handleChange} onBlur={handleChange} required>
                    </TextField>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Username</FormLabel>
                    <TextField
                        type="text" name='username' value={user.username === '' ? user.username = checkIsNull(data.username) : user.username} onChange={handleChange}
                        placeholder="Nhập tên đăng nhập" onMouseLeave={handleChange} onBlur={handleChange} required>
                    </TextField>
                    
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Password</FormLabel>
                    <TextField
                        type="text" name='password' value={user.password === '' ? user.password = data.password : user.password} onChange={handleChange}
                        placeholder="Nhập mật khẩu" onMouseLeave={handleChange} onBlur={handleChange} required>
                    </TextField>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
                    <FormLabel>Role</FormLabel>
                    <TextField
                        type="text" name='role' value={user.role === '' ? user.role = data.role : user.role} onChange={handleChange}
                        placeholder="Nhập mật khẩu" onMouseLeave={handleChange} onBlur={handleChange} required>
                    </TextField>
                </Box>

                <Box sx={{ width: "100%", textAlign: "end" }}>
                    <Button sx={{ mr: 2 }} variant="contained" onClick={() => {setOpenPopup(false), window.location.reload()}}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Box>
            </Box>
        </FormControl>
    )
}
export function DeleteUserDialog(props, setOpenPopup) {

    const { ...data } = props;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await deleteUserById(data.id);
        if (res.status === 200) {
            setTimeout(function () {
                setOpenPopup(false);
            }, 500);
        }
    }

    return (
        <Box sx={{ display: "flex", justifyContent: 'space-between', width: '200px' }}>
            <Button variant="contained" onClick={() => {setOpenPopup(false)}}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>Delete</Button>
        </Box>
    )
}

// export default {AddStudentDialog, ChangeStudentDialog};

