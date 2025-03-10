
const KakaoSignUp = () => {
    return (
        <div>
            
        </div>
    );
};

export default KakaoSignUp;

// import React, { useState } from "react";
// import styles from "./SignUpStep2.module.css";
// import { useNavigate } from "react-router-dom";
// import SearchIcon from "@mui/icons-material/Search";

// import profile1 from "../../assets/profile/profile_1.png";
// import profile2 from "../../assets/profile/profile_2.png";
// import profile3 from "../../assets/profile/profile_3.png";
// import profile4 from "../../assets/profile/profile_4.png";
// import profile5 from "../../assets/profile/profile_5.png";
// import profile6 from "../../assets/profile/profile_6.png";

// const profileImages = [profile1, profile2, profile3, profile4, profile5, profile6];

// const SignUpStep2 = () => {
//     const navigate = useNavigate();
//     const [selectedProfile, setSelectedProfile] = useState(profileImages[0]);
//     const [tempSelectedProfile, setTempSelectedProfile] = useState(null);
//     const [nickname, setNickname] = useState("");
//     const [nicknameError, setNicknameError] = useState(false);
//     const [isModalOpen, setIsModalOpen] = useState(false); 
//     const [isClosing, setIsClosing] = useState(false);
//     const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false); 

//     const handleProfileClick = () => {
//         setIsModalOpen(true);
//         setIsClosing(false);
//     };

//     const handleTempSelect = (image) => {
//         setTempSelectedProfile(image);
//     };

//     const handleConfirmSelection = () => {
//         if (tempSelectedProfile) {
//             setSelectedProfile(tempSelectedProfile);
//         }
//         setIsClosing(true);
//         setTimeout(() => {
//             setIsModalOpen(false);
//         }, 300);
//     };

//     const handleSignUp = () => {
//         if (!nickname.trim()) {
//             setNicknameError(true);
//             return;
//         }
//         setNicknameError(false);
//         setIsSignUpModalOpen(true); 
//     };

//     const handleNavigateToLogin = () => {
//         setIsSignUpModalOpen(false);
//         navigate("/login"); 
//     };

//     return (
//         <div className={styles.container}>
//             <h2 className={styles.title}>사용자 설정</h2>

//             <div className={styles.profileContainer} onClick={handleProfileClick}>
//                 <img src={selectedProfile} alt="Profile" className={styles.profileImage} />
//                 <div className={styles.searchIcon}>
//                     <SearchIcon />
//                 </div>
//             </div>

//             <input
//                 type="text"
//                 className={`${styles.nicknameInput} ${nicknameError ? styles.inputError : ""}`}
//                 placeholder="별명"
//                 value={nickname}
//                 onChange={(e) => setNickname(e.target.value)}
//             />
//             {nicknameError && <p className={styles.errorText}>별명을 입력해 주세요</p>}

//             <button className={styles.signUpButton} onClick={handleSignUp}>
//                 가입하기
//             </button>

//             {isModalOpen && (
//                 <div className={styles.modalOverlay} onClick={() => setIsClosing(true)}>
//                     <div
//                         className={`${styles.modalContent} ${isClosing ? styles.slideDown : styles.slideUp}`}
//                         onClick={(e) => e.stopPropagation()}
//                         onAnimationEnd={() => isClosing && setIsModalOpen(false)}
//                     >
//                         <div className={styles.profileGrid}>
//                             {profileImages.map((image, index) => (
//                                 <div
//                                     key={index}
//                                     className={`${styles.profileOption} ${
//                                         tempSelectedProfile === image ? styles.selectedProfile : ""
//                                     }`}
//                                     onClick={() => handleTempSelect(image)}
//                                 >
//                                     <img src={image} alt={`Profile ${index + 1}`} />
//                                 </div>
//                             ))}
//                         </div>
//                         <button className={styles.selectButton} onClick={handleConfirmSelection}>
//                             선택하기
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {isSignUpModalOpen && (
//                 <div className={styles.signUpmodalOverlay}>
//                     <div className={styles.signUpModal}>
//                         <h3 className={styles.signUpModalTitle}>회원가입 완료!</h3>
//                         <p className={styles.signUpModalText}>로그인 페이지로 이동합니다</p>
//                         <button className={styles.signUpModalButton} onClick={handleNavigateToLogin}>
//                             이동하기
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SignUpStep2;



//css디자인
/* .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    max-width: 30rem;
    margin-top: 20rem;
}

.title {
    font-size: 3.125rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #2F2F2F;
}

.profileContainer {
    position: relative;
    margin-top: 7.5rem;
    cursor: pointer;
    background-color: #E8F1F6;
    padding: 2rem;
    border-radius: 2.5rem;
    width: 16rem; 
    height: 16rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.profileImage {
    width: 90%; 
    height: 90%; 
    object-fit: cover;
}

.searchIcon {
    position: absolute;
    top: 0.9rem;
    right: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
}

.searchIcon svg {
    font-size: 3.8rem; 
    color: #739CD4;
}


.nicknameInput {
    width: 80%;
    max-width: 18rem;
    padding: 2rem;
    margin-top: 6.9375rem;
    font-size: 2rem;
    border: none;
    border-radius: 1.2rem;
    background-color: #E8F1F6;
    outline: none;
    text-align: center;
}

.errorText{
    color: #739CD4;
    margin-top: 1.3rem;
    font-size: 1.6rem;
}

.signUpButton {
    width: 43rem;
    padding: 1.8rem 5rem;
    background-color: #BDE5F1;
    color: #FFFFFF;
    font-size: 2.1rem;
    font-weight: bold;
    border: none;
    border-radius: 1.2rem;
    cursor: pointer;
    margin-top: 7.5rem;
}

.signUpButton:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
}

.modalOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: flex-end; 
}

@keyframes slideUp {
    from {
        transform: translateY(100%);
    }
    to {
        transform: translateY(0);
    }
}

@keyframes slideDown {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(100%);
    }
}

.modalContent {
    background: #E8F1F6;
    padding: 4rem;
    border-radius: 3rem 3rem 0 0;
    width: 100%;
    max-width: 49.125rem;
    height: 34rem;
    text-align: center;
    animation: slideUp 0.03s ease-out;
}

.slideUp {
    animation: slideUp 0.03s ease-out forwards;
}

.slideDown {
    animation: slideDown 0.03s ease-in forwards;
}

.profileGrid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-left: 0.8rem;
    margin-bottom: 2rem;
}

.profileOption {
    width: 13rem;
    height: 13rem;
    border-radius: 2rem;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out, transform 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
}

.profileOption img {
    width: 80%;
    height: 80%;
    border-radius: 2rem;
}

.selectedProfile {
    background-color: #BDE5F1;
    border-radius: 2rem;
}

.selectButton {
    padding: 1.2rem 2rem;
    width: 43rem;
    margin-top: 1rem;
    background: #BDE5F1;
    color: #FFFFFF;
    font-size: 2rem;
    font-weight: 700;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
}

.signUpmodalOverlay{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.signUpModal {
    background: #E8F1F6;
    padding: 3rem;
    border-radius: 1.5rem;
    text-align: center;
    width: 80%;
    max-width: 30rem;
}

.signUpModalTitle {
    font-size: 3.2rem;
    font-weight: 500;
    margin-bottom: 3.2rem;
}

.signUpModalText {
    font-size: 1.6rem;
    color: #666;
    margin-bottom: 3.2rem;
}

.signUpModalButton {
    width: 100%;
    padding: 1.5rem;
    background: #BDE5F1;
    color: #FFFFFF;
    font-size: 1.9rem;
    font-weight: bold;
    border: none;
    border-radius: 1rem;
    cursor: pointer;
}

.signUpModalButton:hover {
    background: #A0D8EF;
} */
