import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const KakaoCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get("code");

        if (authCode) {
            axios.post(
                `${API_URL}/kakao/login`, 
                { code: authCode }, 
                { withCredentials: true } 
            )
            .then((response) => {
                console.log("카카오 로그인 성공:", response.data);

                const accessToken = response.data.access_token;
                if (accessToken) {
                    sessionStorage.setItem("AccessToken", accessToken);
                    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                }

                const { isNewUser, kakaoId, nickname, profileImage } = response.data;
                sessionStorage.setItem("kakaoId", kakaoId);
                sessionStorage.setItem("nickname", nickname);
                sessionStorage.setItem("profileImage", profileImage);
                
                if (isNewUser) {
                    navigate("/sign-up/kakao");
                } else {
                    navigate("/");
                }
            })
            .catch((error) => {
                console.error("카카오 로그인 실패:", error);
                navigate("/login");
            });
        }
    }, [navigate]);

    return <div>로그인 처리 중</div>;
};

export default KakaoCallback;
