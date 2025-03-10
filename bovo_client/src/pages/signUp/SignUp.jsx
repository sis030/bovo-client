import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import ProfileBottomSheet from "../../components/profileImgBottomsheet/ProfileBottomSheet";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import logo from "../../assets/logo/logo.png";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;


const SignUpStep1 = () => {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState("/src/assets/profile/profile_3.png");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const checkNickname = async () => {
        if (!nickname.trim()) return;
        try {
            await axios.post(`${API_URL}/register/nickname`, { nickname }); 
            setNicknameError("");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setNicknameError(error.response.data.message);
            } else {
                console.error("닉네임 확인 실패", error);
            }
        }
    };

    const checkEmail = async () => {
        if (!email.trim()) return;
        try {
            await axios.post(`${API_URL}/register/email`, { email }); 
            setEmailError("");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setEmailError(error.response.data.message);
            } else {
                console.error("이메일 확인 실패:", error);
            }
        }
    };

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            setPasswordError("영어 또는 숫자 조합, 8자 이상으로 입력해 주세요.");
        } else {
            setPasswordError("");
        }
    };

    const validateConfirmPassword = () => {
        if (password !== confirmPassword) {
            setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
        } else {
            setConfirmPasswordError("");
        }
    };

    const handleProfileSelect = (profile) => {
        setProfileImage(profile.src);
        setIsBottomSheetOpen(false);
    };

    //사용자가 아무것도 입력하지 않은 경우의 검사가 없음 -> 추가 필요
    //중복 확인 안하고 사용
    const handleSignUp = async () => {
        if (nicknameError || emailError || passwordError || confirmPasswordError) {
            return;
        }
    
        try {
            await axios.post(`${API_URL}/register`, {
                email,
                password,
                nickname,
                profile_picture: profileImage,
            });
    
            console.log("회원가입 성공");
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const message = error.response.data.message;
                if (message.includes("이메일")) setEmailError(message);
                if (message.includes("닉네임")) setNicknameError(message);
                if (message.includes("비밀번호")) setPasswordError(message);
            }
        }
    };
    
    return (
        <Container sx={{ width: "45rem", marginTop: "18.26rem" }}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={5}>
                <Box
                    position="relative"
                    onClick={() => setIsBottomSheetOpen(true)}
                    sx={{
                        width: "18.75rem",
                        height: "18.75rem",
                        backgroundColor: "#E8F1F6",
                        borderRadius: "1.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img src={profileImage} alt="프로필 이미지" style={{ width: "14rem", height: "14rem", marginTop: "4.7rem" }} />
                    <SearchIcon
                        sx={{
                            position: "absolute",
                            top: "6%",
                            right: "6%",
                            fontSize: "3.8rem",
                            color: "#739CD4",
                        }}
                    />
                </Box>
            </Box>
            <Box display="flex" flexDirection="column" gap={5.2}>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    onBlur={checkNickname}
                    placeholder="닉네임"
                    sx={{ backgroundColor: "#E8F1F6", borderRadius: "1.3rem", "& fieldset": { border: "none" }, padding: "0.8rem 0rem", marginTop:"2.5rem" }}
                    inputProps={{ style: { fontSize: "1.8rem", color: "#6D6D6D", paddingLeft:"2.5rem" } }}
                />
                {nicknameError && <Typography textAlign="right" color="#FF0000" fontSize="1.3rem" sx={{ margin:"-1.8rem", marginRight:"0.2rem" }}>{nicknameError}</Typography>}
                
                <TextField
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={checkEmail}
                    placeholder="이메일"
                    sx={{ backgroundColor: "#E8F1F6", borderRadius: "1.3rem", "& fieldset": { border: "none" }, padding: "0.8rem 0rem" }}
                    inputProps={{ style: { fontSize: "1.8rem", color: "#6D6D6D", paddingLeft:"2.5rem" }}}
                />
                {emailError && <Typography textAlign="right" color="#FF0000" fontSize="1.3rem" sx={{ margin:"-1.8rem", marginRight:"0.2rem" }}>{emailError}</Typography>}
            
            <TextField
                    fullWidth
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={validatePassword}
                    placeholder="비밀번호"
                    sx={{ backgroundColor: "#E8F1F6", borderRadius: "1.3rem", "& fieldset": { border: "none" }, padding: "0.8rem 0rem" }}
                    inputProps={{ style: { fontSize: "1.8rem", color: "#6D6D6D", paddingLeft:"2.5rem" } }}
                />
                {passwordError && <Typography textAlign="right" color="#FF0000" fontSize="1.3rem"sx={{ margin:"-1.8rem", marginRight:"0.2rem"}}>{passwordError}</Typography>}

                <TextField
                    fullWidth
                    type="password"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={validateConfirmPassword}
                    placeholder="비밀번호 확인"
                    sx={{ backgroundColor: "#E8F1F6", borderRadius: "1.3rem", "& fieldset": { border: "none" }, padding: "0.8rem 0rem" }}
                    inputProps={{ style: { fontSize: "1.8rem", color: "#6D6D6D", paddingLeft:"2.5rem" } }}
                />
                {confirmPasswordError && <Typography textAlign="right" color="#FF0000" fontSize="1.3rem"sx={{ margin:"-1.8rem", marginRight:"0.2rem"}}>{confirmPasswordError}</Typography>}
            </Box>

            <Box marginTop="3rem">
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleSignUp}
                    sx={{
                        fontSize: "2.2rem",
                        fontWeight: "600",
                        padding: "1rem",
                        borderRadius: "1rem",
                        backgroundColor: "#BDE5F1",
                        boxShadow: "none",
                        transition: "none",
                        "&:hover": { backgroundColor: "#BDE5F1" },
                        "&:focus": { backgroundColor: "#BDE5F1" },
                        "&:active": { backgroundColor: "#BDE5F1" },
                    }}
                >
                    회원가입
                </Button>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "7rem" }}>
                <img src={logo} alt="Bovo 로고" style={{ width: "10rem", marginRight: "1rem" }} />
                <Typography fontSize="1.8rem" fontWeight= "500" color="#343434" marginLeft="2rem">
                    소통하는 독서 플랫폼, <br /> 보보에 오신 것을 환영합니다!
                </Typography>
            </Box>

            <ProfileBottomSheet open={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} onSelectProfile={handleProfileSelect} selectedProfile={profileImage} />
        </Container>
    );
};

export default SignUpStep1;