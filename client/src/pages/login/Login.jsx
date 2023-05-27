import React, { useState, useEffect, useMemo } from "react";
import "./style.scss";
import { userLogin } from "./LoginService.js";
import { useDispatch } from "react-redux";
// import {setToken} from "../../store/action";
import { setToken } from "../../store/index";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CopyRight from "../../components/copy-right/CopyRight";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import LoaderPage from "../../components/loader-page/Loader";

export default function Login() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [singIn, setSingIn] = useState(false);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const user = {
        username: username,
        password: password,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.trim().length > 5 && password.trim().length > 8) {
            const res = await userLogin(user);
            if (res.status === 200) {
                setSingIn(true);
                setTimeout(function () {
                    let loading = document.querySelector(".loading-page");
                    loading.innerHTML = "";
                    dispatch(setToken(res.data.accessToken));
                    window.localStorage.setItem("access_token", res.data.accessToken);
                    window.localStorage.setItem("user_id", res.data.user.id);
                    navigate("/dashboard");
                }, 500);
            } else {
                let messInvalid = document.querySelector(".mess-notify");
                messInvalid.innerHTML = "Invalid username or password";
                messInvalid.style.display = "block";
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className="loading-page">
                {singIn ? <LoaderPage></LoaderPage> : null}
            </div>
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h4">
                    Sign in
                </Typography>
                <div className="mess-notify"></div>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1, width: 400 }}
                >
                    <Grid
                        container
                        spacing={1}
                        sx={{ mt: 1 }}
                        justify="center"
                        alignItems="center"
                        alignContent="center"
                    >
                        <Grid item xs={2}>
                            <FontAwesomeIcon size={"2x"} icon={faEnvelope} />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                placeholder="Ex. Pizza"
                                color="primary"
                                variant="outlined"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={2}
                        sx={{ mt: 1 }}
                        justify="center"
                        alignItems="center"
                        alignContent="center"
                    >
                        <Grid item xs={2}>
                            <FontAwesomeIcon size={"2x"} icon={faLock} />
                        </Grid>
                        <Grid item xs={10}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                color="primary"
                                variant="outlined"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Log in
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="#">Forgot password?</Link>
                        </Grid>
                        <Grid item>
                            <Link to="#">Sign Up</Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <CopyRight sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}

// Login.propTypes = {
//   setToken: PropTypes.string.isRequired,
// };
