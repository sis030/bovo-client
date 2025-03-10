import { useState } from "react";
import { Box, Typography, Button, Modal } from "@mui/material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NoteCompleteModal from "./NoteCompleteModal";
import axios from "axios"; 

const API_URL = import.meta.env.VITE_BACKEND_SEARCH_API_URL;

const NoteStateModal = ({ open, onClose, book, userId }) => {
    const [selectedState, setSelectedState] = useState(null);
    const [isRegisterCompleteOpen, setIsRegisterCompleteOpen] = useState(false);
    const [loading, setLoading] = useState(false); 

    const handleSelect = (state) => {
        setSelectedState(state);
    };

    console.log("NoteStateModal - book:", book);
    console.log("NoteStateModal - book?.id:", book?.id);

    const handleRegister = async () => {
        if (!selectedState || !book?.id || !userId) {
            console.log('데이터 입력 에러');
            console.log("selectedState:", selectedState);
            console.log("book?.id:", book?.id);
            console.log("userId:", userId);
            return;
        }

        setLoading(true); 

        try {
            const response = await axios.post(
                `${API_URL}/save/${book.id}`, 
                {
                    book_id: book.id,
                    is_complete_reading: selectedState, 
                },
                {
                    headers: {
                        user_id: userId, 
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201) {
                setIsRegisterCompleteOpen(true); 
            }
        } catch (error) {
            console.error("도서 상태 저장 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal open={open} onClose={onClose} sx={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "45.5rem",
                        backgroundColor: "#E8F1F6",
                        borderRadius: "1.5rem 1.5rem 0 0",
                        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
                        padding: "2rem",
                        textAlign: "center",
                    }}
                >
                    <Box sx={{ width: "15rem", height: "0.3rem", backgroundColor: "#739CD4", borderRadius: "10px", margin: "0 auto 1rem", }} />

                    <Typography variant="h6" sx={{ fontSize: "2.1rem", fontWeight: "600", margin: "1.5rem",}}>
                        이 책을
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "3rem" }}>
                        <Button
                            onClick={() => handleSelect("ing")}
                            sx={{
                                width: "15rem",
                                height: "17rem",
                                borderRadius: "1rem",
                                backgroundColor: selectedState === "ing" ? "#739CD4" : "#FFFFFF",
                                color: selectedState === "ing" ? "#FFFFFF" : "#303030",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "none",
                                fontSize: "2rem",
                                "&:hover": {
                                    backgroundColor: selectedState === "ing" ? "#739CD4" : "#F0F0F0",
                                },
                            }}
                        >
                            <HourglassBottomIcon sx={{ fontSize: "6rem", marginBottom: "0.5rem" }} />
                            읽는 중
                        </Button>

                        <Button
                            onClick={() => handleSelect("end")}
                            sx={{
                                width: "15rem",
                                height: "17rem",
                                borderRadius: "1rem",
                                backgroundColor: selectedState === "end" ? "#739CD4" : "#FFFFFF",
                                color: selectedState === "end" ? "#FFFFFF" : "#303030",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "none",
                                fontSize: "2rem",
                                "&:hover": {
                                    backgroundColor: selectedState === "end" ? "#739CD4" : "#F0F0F0",
                                },
                            }}
                        >
                            <CheckCircleOutlineIcon sx={{ fontSize: "6rem", marginBottom: "0.5rem" }} />
                            다 읽음
                        </Button>

                        <Button
                            onClick={() => handleSelect("wish")}
                            sx={{
                                width: "15rem",
                                height: "17rem",
                                borderRadius: "1rem",
                                backgroundColor: selectedState === "wish" ? "#739CD4" : "#FFFFFF",
                                color: selectedState === "wish" ? "#FFFFFF" : "#303030",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "none",
                                fontSize: "2rem",
                                "&:hover": {
                                    backgroundColor: selectedState === "wish" ? "#739CD4" : "#F0F0F0",
                                },
                            }}
                        >
                            <FavoriteBorderIcon sx={{ fontSize: "6rem", marginBottom: "0.5rem" }} />
                            읽고 싶음
                        </Button>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={handleRegister}
                        disabled={!selectedState || loading} 
                        sx={{
                            fontSize: "2.2rem",
                            fontWeight: "600",
                            backgroundColor: loading ? "#A5D8E8" : "#BDE5F1", 
                            padding: "1rem",
                            borderRadius: "0.8rem",
                            boxShadow:"none",
                            width: "100%",
                            marginBottom: "1rem",
                            "&:hover": {
                                backgroundColor: loading ? "#A5D8E8" : "#A5D8E8",
                            },
                        }}
                    >
                        {loading ? "기록 중..." : "기록하기"}
                    </Button>
                </Box>
            </Modal>

            <NoteCompleteModal 
                open={isRegisterCompleteOpen} 
                onClose={() => setIsRegisterCompleteOpen(false)} 
                book={book} 
            />
        </>
    );
};

export default NoteStateModal;
