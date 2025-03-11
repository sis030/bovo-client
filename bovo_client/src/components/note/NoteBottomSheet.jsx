import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { bookPropType } from "../../utils/propTypes";
import {
    Box, Modal, Typography, Button,
    ToggleButton, ToggleButtonGroup, Rating, Slide
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useDelete from "../../hooks/useDelete";
import DeleteModal from "../deleteModal/DeleteModal";
import useUpdateMemo from "../../hooks/useUpdateMemo";

const NoteBottomSheet = ({ open, onClose, book }) => {
    console.log("book:", book); // book 값 확인

    const [status, setStatus] = useState("ing");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [rating, setRating] = useState(0);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    // 기존 데이터 불러오기
    useEffect(() => {
        if (open && book) {
            console.log(" 실행됨", book);
            setStatus(book.status || "ing");
            setStartDate(book.start_date ? dayjs(book.start_date) : null);
            setEndDate(book.end_date ? dayjs(book.end_date) : null);
            setRating(book.star || 0);
        }
    }, [open, book]);

    const handleStatusChange = (event, newStatus) => {
        if (newStatus !== null) setStatus(newStatus);
    };

    const { deleteItem } = useDelete();
    const handleDeleteBook = () => {
        deleteItem(book.book_id, "book", null, () => {
          setOpenDeleteModal(false);
          onClose();
        });
      };

      const { updateMemo } = useUpdateMemo();

      const handleSave = async () => {
          if (!book) return;
      
          try {
              const updatedMemo = {
                  status,
                  start_date: startDate ? startDate.format("YYYY-MM-DD") : null,
                  end_date: endDate ? endDate.format("YYYY-MM-DD") : null,
                  star: rating
              };
      
              await updateMemo(book.book_id, updatedMemo); // 수정 API 요청
              console.log("수정 완료");
              onClose(); // 모달 닫기
          } catch (error) {
              console.error("수정 실패:", error);
          }
      };

    return (
        <>
            {/* 모달 */}        
            <Modal 
                open={open} 
                onClose={onClose}
                disableAutoFocus    //자꾸 오류 생겨서 넣어둠
                disableEnforceFocus //얘도
                sx={{ 
                    display: "flex", 
                    alignItems: "flex-end", 
                    justifyContent: "center" 
                }}
                >
                <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                    <Box
                    aria-hidden="false" //오류 생겨서 넣어둠
                        sx={{
                            width: "100%",
                            maxWidth: "45.5rem",
                            backgroundColor: "#E8F1F6",
                            borderRadius: "1.5rem 1.5rem 0 0",
                            boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
                            padding: "1rem 4rem 6rem 4rem",
                            textAlign: "center",
                        }}
                    >
                        
                    {/* 상단 바 */}
                    <Box 
                        sx={{
                            width: "20rem",
                            height: "0.4rem",
                            backgroundColor: "#739CD4",
                            margin: "0 auto 2rem"
                        }} 
                    />
                        {/* 독서 상태 선택 */}
                        <Typography 
                            sx={{ 
                                fontSize: "1.75rem", 
                                fontWeight: "bold", 
                                mb: "1.5rem" 
                            }}
                        >
                            독서 상태
                        </Typography>
                        {/* 독서 상태 버튼 */}
                        <ToggleButtonGroup 
                            value={status} 
                            exclusive 
                            onChange={handleStatusChange} 
                            sx={{ 
                                display: "flex", 
                                gap: "1rem", 
                                mb: "3rem" 
                            }}
                        >
                            {[
                                { 
                                    value: "ing", 
                                    label: "읽는 중", 
                                    icon: <HourglassBottomIcon 
                                        sx={{ 
                                            fontSize: "6rem", 
                                            marginBottom: "0.5rem" 
                                        }} 
                                    /> 
                                },
                                { 
                                    value: "end", 
                                    label: "다 읽음", 
                                    icon: <CheckCircleOutlineIcon 
                                        sx={{ 
                                            fontSize: "6rem", 
                                            marginBottom: "0.5rem" 
                                        }} 
                                    /> 
                                },
                                { 
                                    value: "wish", 
                                    label: "읽고 싶음", 
                                    icon: <FavoriteBorderIcon 
                                        sx={{ 
                                            fontSize: "6rem", 
                                            marginBottom: "0.5rem" 
                                        }} 
                                    /> 
                                }
                            ].map(({ value, label, icon }) => (
                                <ToggleButton 
                                    key={value} 
                                    value={value} 
                                    sx={{ 
                                        flex: 1, 
                                        height: "11rem", 
                                        borderRadius: "1.25rem", 
                                        backgroundColor: status === value ? "#739CD4" : "#FFFFFF", 
                                        color: status === value ? "#FFFFFF" : "#303030", 
                                        fontSize: "1.5rem", 
                                        display: "flex", 
                                        flexDirection: "column", 
                                        alignItems: "center", 
                                        justifyContent: "center" 
                                    }}
                                >
                                    {icon}
                                    {label}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>

                        {/* 독서 기간 선택 */}
                        <Typography 
                            sx={{ 
                                fontSize: "1.75rem", 
                                fontWeight: "bold", 
                                mb: "1.5rem" 
                            }}
                        >
                            독서 기간
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box 
                                sx={{ 
                                    display: "flex", 
                                    gap: "1rem", 
                                    justifyContent: "center", 
                                }}
                            >
                                <DatePicker
                                    value={startDate}
                                    onChange={(newValue) => setStartDate(newValue)}
                                    format="YY.MM.DD"
                                    sx={{
                                        width: "14rem",
                                        "& .MuiInputBase-root": {
                                            height: "5rem",
                                            fontSize: "2rem",
                                            borderRadius: "1.25rem",
                                            backgroundColor: "white",
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { 
                                                borderColor: "#739CD4" 
                                            },
                                            "&:hover fieldset": { 
                                                borderColor: "#0056b3" 
                                            },
                                            "&.Mui-focused fieldset": { 
                                                borderColor: "#003f7f" 
                                            },
                                        }
                                    }}
                                />
                                <Typography 
                                    sx={{ 
                                        fontSize: "3rem", 
                                        fontWeight: "bold", 
                                        color: "black" 
                                    }}
                                >
                                    ~
                                </Typography>
                                <DatePicker
                                    value={endDate}
                                    onChange={(newValue) => setEndDate(newValue)}
                                    format="YY.MM.DD"
                                    sx={{
                                        width: "14rem",
                                        "& .MuiInputBase-root": {
                                            height: "5rem",
                                            fontSize: "2rem",
                                            borderRadius: "1.25rem",
                                            backgroundColor: "white",
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { 
                                                borderColor: "#739CD4" 
                                            },
                                            "&:hover fieldset": { 
                                                borderColor: "#0056b3" 
                                            },
                                            "&.Mui-focused fieldset": { 
                                                borderColor: "#003f7f" 
                                            },
                                        }
                                    }}
                                />
                            </Box>
                        </LocalizationProvider>

                         {/* 별점 */}
                        <Typography 
                            sx={{ 
                                fontSize: "1.75rem", 
                                fontWeight: "bold", 
                                mb: "1.5rem", 
                                mt: "1.5rem" 
                            }}
                        >
                            별점
                        </Typography>
                        <Rating 
                            name="size-large" 
                            value={rating / 2} 
                            precision={0.5} 
                            size="large" 
                            onChange={(event, newValue) => setRating(newValue * 2)} 
                            sx={{ 
                                mb: "2rem", 
                                fontSize: "5rem" 
                            }} 
                        />

                         {/* 삭제 수정 버튼 */}
                        <Box 
                            sx={{ 
                                display: "flex", 
                                justifyContent: "space-evenly", 
                                mt: "3rem" 
                            }}
                        >
                            <Button 
                                variant="contained" 
                                disableElevation 
                                onClick={() => setOpenDeleteModal(true)} 
                                sx={{ 
                                    fontSize: "2rem", 
                                    fontWeight: "500", 
                                    backgroundColor: "white", 
                                    color: "red", 
                                    borderRadius: "1.25rem", 
                                    width: "40%" 
                                }}
                            >
                                책 삭제하기
                            </Button>
                            <Button 
                                variant="contained" 
                                disableElevation 
                                onClick={handleSave} 
                                sx={{ 
                                    fontSize: "2rem", 
                                    fontWeight: "500", 
                                    backgroundColor: "white", 
                                    color: "#739CD4", 
                                    borderRadius: "1.25rem", 
                                    width: "40%" 
                                }}
                            >
                                수정하기
                            </Button>
                        </Box>
                    </Box>
                </Slide>
            </Modal>

            <DeleteModal
                open={openDeleteModal}
                 onClose={() => setOpenDeleteModal(false)}
                onConfirm={handleDeleteBook}
            />;
        </>
    );
};

NoteBottomSheet.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    book: bookPropType.isRequired,
};

export default NoteBottomSheet;