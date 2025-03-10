import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button, Link } from "@mui/material";
import NoteStateModal from "./NoteStateModal";
import ForumCompleteModal from "./ForumCompleteModal"; 
import styles from "./BookSearchDetail.module.css";

const BookSearchDetail = () => {
    const location = useLocation();
    const book = location.state?.book;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isForumModalOpen, setIsForumModalOpen] = useState(false); 

    if (!book) {
        return <Typography className={styles.errorMessage}>책 정보를 찾을 수 없습니다.</Typography>;
    }

    const daumBookUrl = book.title
        ? `https://search.daum.net/search?w=book&q=${encodeURIComponent(book.title)}`
        : "#";

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenForumModal = () => {
        setIsForumModalOpen(true);
    };

    const handleCloseForumModal = () => {
        setIsForumModalOpen(false);
    };

    console.log("BookSearchDetail - book:", book);

    return (
        <Box className={styles.container}>
            <Box className={styles.bookInfoContainer}>
                <img src={book.thumbnail || "default_thumbnail.png"} alt={book.title} className={styles.bookCover} />
                <Box className={styles.bookDetails}>
                    <Typography className={styles.bookTitle} sx={{
                        fontSize: "2.3rem",
                        fontWeight: "700",
                        lineHeight: "2.4rem",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        paddingRight: "4rem",
                        marginBottom: "0.2rem",
                    }}>
                        {book.title}
                    </Typography>
                    <Typography className={styles.bookAuthor} sx={{
                        fontSize: "1.7rem",
                        fontWeight: "400",
                        lineHeight: "2.4rem",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        paddingRight: "4rem",
                    }}>
                        저자 : {book.authors ? book.authors.join(", ") : "정보 없음"}
                    </Typography>
                    <Typography className={styles.bookPublisher} sx={{
                        fontSize: "1.5rem",
                        fontWeight: "400",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        paddingRight: "4rem",
                    }}>
                        출판사 : {book.publisher || "정보 없음"}
                    </Typography>
                    <Typography className={styles.bookDate} sx={{
                        fontSize: "1.5rem",
                        fontWeight: "400",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        paddingRight: "4rem",
                    }}>
                        출판일 : {book.datetime ? book.datetime.split("T")[0] : "정보 없음"}
                    </Typography>
                    <Typography className={styles.bookISBN} sx={{
                        fontSize: "1.5rem",
                        fontWeight: "400",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        paddingRight: "4rem",
                    }}>
                        ISBN : {book.isbn || "정보 없음"}
                    </Typography>
                </Box>
            </Box>

            <Box className={styles.buttonContainer}>
                <Button
                    variant="outlined"
                    className={styles.discussion}
                    onClick={handleOpenForumModal}  
                    sx={{
                        fontSize: "1.9rem",
                        fontWeight: "600",
                        padding: "0.8rem 5rem",
                        borderRadius: "0.5rem",
                        marginTop: "1rem",
                        border: "none",
                        backgroundColor: "#E8F1F6",
                        color: "#5F5F5F",
                    }}
                >
                    토론방 만들기
                </Button>

                <Button
                    variant="contained"
                    className={styles.note}
                    onClick={handleOpenModal}
                    sx={{
                        fontSize: "1.9rem",
                        fontWeight: "600",
                        padding: "0.8rem 5.6rem",
                        marginTop: "1rem",
                        borderRadius: "0.5rem",
                        backgroundColor: "#BDE5F1",
                        color: "#5F5F5F",
                        outline: "none",
                        boxShadow: "none",
                        "&:hover": {
                            boxShadow: "none",
                        },
                        "&:active": {
                            boxShadow: "none",
                        },
                    }}
                >
                    기록하기
                </Button>
            </Box>

            <Box className={styles.sectionHeader}>
                <Typography className={styles.sectionTitle}
                sx={{
                    fontSize: "2.1875rem",
                    fontWeight: "500",
                    marginRight: "2.3rem",
                    marginLeft: "2.5rem",
                }}>책 소개</Typography>
                <hr className={styles.sectionLine} />
            </Box>

            <Box className={styles.descriptionContainer}>
                <Typography className={styles.bookDescription} sx={{
                    fontSize: "1.8rem",
                    fontWeight: "400",
                    lineHeight: "2.2rem",
                    marginTop: "0.5rem",
                    paddingBottom: "2rem",
                }}>
                    {book.contents || "책 소개 정보가 없습니다."}
                </Typography>
            </Box>

            <Box className={styles.moreInfoContainer}>
                <Link
                    href={daumBookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.moreInfo}
                    sx={{
                        fontSize: "1.6rem",
                        fontWeight: "600",
                        textDecoration: "none",
                        color: "#4682B4",
                    }}
                >
                    추가 정보 확인하기
                </Link>
                <Typography className={styles.bookInfoSource}
                sx={{ fontSize: "1.3rem", color: "#454545" }}>
                    책 정보 제공 : 다음카카오
                </Typography>
            </Box>

            {/* <NoteStateModal open={isModalOpen} onClose={handleCloseModal} book={book}/> */}
            <NoteStateModal open={isModalOpen} onClose={handleCloseModal} book={{ ...book, id: book.isbn }} />
            <ForumCompleteModal open={isForumModalOpen} onClose={handleCloseForumModal} book={book} />
        </Box>
    );
};

export default BookSearchDetail;
