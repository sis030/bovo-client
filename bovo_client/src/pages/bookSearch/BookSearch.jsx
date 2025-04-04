import { useState, useEffect } from "react";
import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import api from "../../api/Auth";
import BookSearchBar from "./BookSearchBar";
import BookList from "./BookList";
import styles from "./BookSearch.module.css";

const BookSearch = () => {
    const [books, setBooks] = useState([]); 
    const [sort, setSort] = useState("accuracy"); 
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1); 
    const [hasMore, setHasMore] = useState(true); 

    const fetchBooks = async (query, newPage = 1) => {
        if (!query.trim()) {
            setBooks([]);
            return;
        }

        setLoading(true);
        try {
            const response = await api.get(`/search?query=${encodeURIComponent(query)}&sort=${sort}&size=20&page=${newPage}`);
            console.log("서버에서 받은 데이터:", response.data);

            if (response.data && response.data.documents) {
                if (newPage === 1) {
                    setBooks(response.data.documents);
                } else {
                    setBooks((prevBooks) => [...prevBooks, ...response.data.documents]);
                }

                setHasMore(response.data.documents.length >= 20);
            } else {
                console.error("잘못된 API 응답 형식:", response.data);
                setBooks([]);
                setHasMore(false);
            }
        } catch (error) {
            console.error("도서 검색 API 오류:", error);
            setBooks([]);
            setHasMore(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        setPage(1);
        fetchBooks(searchTerm, 1);
    }, [searchTerm, sort]);

    const fetchMoreBooks = () => {
        setPage((prevPage) => {
            const nextPage = prevPage + 1;
            fetchBooks(searchTerm, nextPage);
            return nextPage;
        });
    };

    return (
        <Box className={styles.container}>
            <BookSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Box className={styles.resultContainer}>
                <Typography sx={{ fontSize: "1.7rem", fontWeight: "600", color: "#333", marginBottom: "1rem" }}>
                    검색 결과 {books.length} 권
                </Typography>

                <FormControl className={styles.sortSelect}>
                    <Select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        sx={{
                            border: "none",
                            boxShadow: "none",
                            backgroundColor: "transparent",
                            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                            "& .MuiSelect-select": {
                                padding: "0.5rem 2rem",
                                fontSize: "1.6rem",
                            },
                            "& .MuiSelect-icon": {
                                color: "#3B3B3B", 
                                fontSize: "3.7rem",
                                right: "-1.6rem",
                                top: "-0.7rem",
                            },
                        }}
                        MenuProps={{
                            transitionDuration: 100, 
                            sx: {
                                "& .MuiPaper-root": {
                                    borderRadius: "0.4rem",
                                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
                                    backgroundColor: "white",
                                },
                                "& .MuiMenuItem-root": {
                                    fontSize: "1.5rem",
                                    padding: "1rem 3rem",
                                    "&:hover": {
                                        backgroundColor: "#E8F1F6", 
                                    },
                                },
                            },
                        }}
                    >
                        <MenuItem value="accuracy">정확도순</MenuItem>
                        <MenuItem value="latest">최신순</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <BookList books={books} loading={loading} searchTerm={searchTerm} fetchMoreBooks={fetchMoreBooks} hasMore={hasMore} />
        </Box>
    );
};

export default BookSearch;
