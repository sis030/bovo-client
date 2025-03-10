import { useState, useEffect } from "react";
import axios from "axios";
import { Box, FormControl, MenuItem, Select, Typography, Button } from "@mui/material";
import BookSearchBar from "./BookSearchBar";
import BookList from "./BookList";
import styles from "./BookSearch.module.css";

const SEARCH_API = import.meta.env.VITE_BACKEND_SEARCH_API_URL;

const BookSearch = () => {
    const [books, setBooks] = useState([]); 
    const [sort, setSort] = useState("accuracy");
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1); 
    const [hasMore, setHasMore] = useState(true); 

    const fetchBooks = async (query, page = 1) => {
        if (!query.trim()) { 
            setBooks([]); 
            return;
        }
        
        setLoading(true);
        try {
            const response = await axios.get("https://dapi.kakao.com/v3/search/book?target=title", {
                params: {
                    query: query,
                    sort: sort,
                    page: page, 
                    size: 10, 
                },
                headers: {
                    Authorization: `KakaoAK ${SEARCH_API}`,
                },

            });

            if (page === 1) {
                setBooks(response.data.documents);
            } else {
                setBooks((prevBooks) => [...prevBooks, ...response.data.documents]); 
            }


            setHasMore(response.data.documents.length > 0);
        } catch (error) {
            console.error("도서 검색 API 오류:", error);
        }
        setLoading(false);
    };


    useEffect(() => {
        setCurrentPage(1); 
        fetchBooks(searchTerm, 1);
    }, [searchTerm, sort]); 


    const loadMoreBooks = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchBooks(searchTerm, nextPage);
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

            <BookList books={books} loading={loading} searchTerm={searchTerm} />


            {hasMore && !loading && (
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                    <Button 
                        onClick={loadMoreBooks} 
                        sx={{
                            fontSize: "1.5rem",
                            fontWeight: "500",
                            padding: "0.8rem 2rem",
                            backgroundColor: "#007BFF",
                            color: "white",
                            borderRadius: "5px",
                            "&:hover": {
                                backgroundColor: "#0056b3",
                            }
                        }}
                    >
                        더보기
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default BookSearch;
