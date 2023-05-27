import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, FormControl } from '@mui/material';
import LoaderPage from "../../components/loader-page/Loader.jsx";
import { getUserById, updateUserById } from './HeaderService.js';

export function ProfileDialog(setOpenPopup) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value.trim() });
    };

    async function fetchData() {
        const userId = window.localStorage.getItem('user_id');

        const res = await getUserById(userId);
        if (res.status === 200) {
            const data = res.data;
            setUser((user) => ({
                ...user = data,
            }));
        }
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await updateUserById(user);
        console.log(user);
        if (res.status === 200) {
            setLoading(true);
            setTimeout(function () {
                window.location.reload();
                setOpenPopup(false);
            }, 500);
        }
    }

    return (
        <FormControl>
            <div className="loading-page">
                {loading ? <LoaderPage></LoaderPage> : null}
            </div>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around", gap: "20px" }}
                component="form"
                onSubmit={handleSubmit}
                noValidate>

                <TextField
                    type="text" name='fullName' placeholder="Nhập họ tên" required
                    value={user.fullName !== null ? user.fullName : ''}
                    onChange={handleChange} onBlur={handleChange} onMouseLeave={handleChange}></TextField>

                <TextField
                    type="text" name='username' placeholder="Nhập username" required
                    value={user.username !== null ? user.username : ''}
                    onChange={handleChange} onMouseLeave={handleChange} onBlur={handleChange}
                >
                </TextField>

                <TextField
                    type="email" name='email' placeholder="Nhập email" required
                    value={user.email !== null ? user.email : ''}
                    onChange={handleChange} onMouseLeave={handleChange} onBlur={handleChange}>
                </TextField>

                <TextField
                    type="password" name='password' placeholder="Nhập password" required
                    value={user.password !== null ? user.password : ''}
                    onChange={handleChange} onMouseLeave={handleChange} onBlur={handleChange}>
                </TextField>

                <TextField
                    type="text" name='role' placeholder="Nhập role" required
                    value={user.role !== null ? user.role : ' '}
                    onChange={handleChange} onMouseLeave={handleChange} onBlur={handleChange}/>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Button variant="contained" onClick={() => setOpenPopup(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Box>
            </Box>
        </FormControl>
    )
}

