import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import axios from "axios";
import kakaoBtn from "../../assets/button/btn_kakao.png";

axios.defaults.withCredentials = true;


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const refreshAccessToken = async () => {
        try {
            const response = await axios.post(
                "https://3fde-112-158-33-80.ngrok-free.app/refresh-token",
                {}, 
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                console.log("Access Token 갱신 성공:", response.data);
                const newAccessToken = response.data.access_token;

                if (newAccessToken) {
                    sessionStorage.setItem("AccessToken", newAccessToken); 
                    axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`; 
                }
            }
        } catch (error) {
            console.error("Access Token 갱신 실패:", error);
            sessionStorage.removeItem("AccessToken"); 
            navigate("/login"); 
        }
    };

    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
    
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true; 
    
                try {
                    await refreshAccessToken(); 
                    const newAccessToken = sessionStorage.getItem("AccessToken"); 
                    axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
                    
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`; 
                    return axios(originalRequest);
                } catch (refreshError) {
                    console.error("토큰 갱신 중 오류 발생:", refreshError);
                    return Promise.reject(refreshError); 
                }
            }
    
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        const accessToken = sessionStorage.getItem("AccessToken");
        if (accessToken) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        }
    }, []);

    const handleSignUp = () => {
        navigate("/sign-up/basic");
    };

    const handleLogin = async () => {
        setEmailError("");
        setPasswordError("");

        try {
            const response = await axios.post(
                `https://3fde-112-158-33-80.ngrok-free.app/login`,
                { email, password },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                console.log("로그인 성공:", response.data);

                const accessToken = response.data.access_token;
                if (accessToken) {
                    sessionStorage.setItem("AccessToken", accessToken);
                    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                }

                navigate("/");
            }
        } catch (error) {
            console.error("로그인 오류:", error);
            if (error.response) {
                console.log("응답 데이터:", error.response.data);
                console.log("응답 상태 코드:", error.response.status);

                if (error.response.status === 404) {
                    setErrorMessage("등록되지 않은 이메일입니다.");
                } else if (error.response.status === 401) {
                    setErrorMessage("비밀번호가 일치하지 않습니다.");
                } else {
                    setErrorMessage("로그인 중 오류가 발생했습니다.");
                }
            } else {
                setErrorMessage("서버와의 연결에 실패했습니다.");
            }
        }
    };




    return (
        <Container sx={{ maxWidth: "45rem"}}>
            <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
                <Box display="flex" flexDirection="column" gap={5} width="100%">
                    <TextField
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일"
                        sx={{ 
                            backgroundColor: "#E8F1F6",
                            borderRadius: "1.5625rem",
                            padding: "0.8rem 0rem",
                            border: "none",
                            marginTop: "-2rem",
                            "& fieldset": { border: "none" } 
                        }}
                        inputProps={{
                            style: { fontSize: "1.8rem", paddingLeft: "1.4rem" },
                        }}
                    />
                    {emailError && (
                        <Typography textAlign="right" color="#FF0000" fontSize="1.3rem" sx={{ margin:"-1.8rem", marginRight:"0.2rem"}}>
                            {emailError}
                        </Typography>
                    )}
                    
                    <TextField
                        fullWidth
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호"
                        sx={{ 
                            backgroundColor: "#E8F1F6",
                            borderRadius: "1.5625rem",
                            padding: "0.8rem 0rem",
                            border: "none",
                            "& fieldset": { border: "none" } 
                        }}
                        inputProps={{
                            style: { fontSize: "1.8rem", paddingLeft: "1.4rem" },
                        }}
                    />
                    {passwordError && (
                        <Typography textAlign="right" color="#FF0000" fontSize="1.3rem" sx={{ margin:"-1.8rem", marginRight:"0.2rem"}}>
                            {passwordError}
                        </Typography>
                    )}
                </Box>

                <Box display="flex" flexDirection="column" alignItems="center" width="100%">
                    <Button 
                        fullWidth 
                        variant="contained" 
                        color="primary" 
                        disableRipple 
                        disableElevation 
                        onClick={handleLogin}
                        sx={{
                            fontSize: "2.3rem",
                            fontWeight: "700",
                            marginTop: "1.5rem",
                            padding: "1rem 0rem",
                            borderRadius: "1.2rem",
                            backgroundColor: "#BDE5F1",
                            boxShadow: "none",
                            transition: "none", 
                            "&:hover, &:focus, &:active": {
                                backgroundColor: "#BDE5F1"
                            }
                        }}
                    >
                        로그인
                    </Button>
                    <Box display="flex" justifyContent="flex-end" width="100%" marginTop="1.2rem">
                        <Typography 
                            textAlign="right" 
                            color="#7B7B7B" 
                            fontSize="1.5rem"
                            sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                        >
                            비밀번호 찾기
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" flexDirection="column" gap={2} sx={{ marginTop: "5rem" }} alignItems="center">
                    <Button 
                        fullWidth 
                        variant="contained" 
                        color="secondary" 
                        onClick={handleSignUp}
                        sx={{
                            fontSize: "2rem",
                            fontWeight: "500",
                            width: "25rem",
                            padding: "1.4rem",
                            borderRadius: "0.8rem",
                            backgroundColor: "#739CD4",
                            boxShadow: "none",
                            transition: "none",
                            "&:hover, &:focus, &:active": {
                                backgroundColor: "#739CD4"
                            }
                        }}
                    >
                        이메일로 회원가입
                    </Button>
                    <Button 
                        fullWidth 
                        variant="contained"
                        sx={{
                            backgroundColor: "transparent",
                            padding: 0,
                            boxShadow: "none",
                            transition: "none",
                            "&:hover, &:focus, &:active": {
                                backgroundColor: "transparent"
                            }
                        }}
                    >
                        <img 
                            src={kakaoBtn} 
                            alt="카카오 로그인" 
                            style={{ width: "25rem", boxShadow: "none", cursor: "pointer" }} 
                        />
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
