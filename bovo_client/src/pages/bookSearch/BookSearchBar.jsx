import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./BookSearch.module.css";

const BookSearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <Box className={styles.searchBar}>
            <TextField
                placeholder="책 제목, 저자, 출판사, ISBN"
                fullWidth
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                    "& .MuiOutlinedInput-root": { border: "none", boxShadow: "none", backgroundColor: "transparent", height: "4rem"},
                    "& .MuiOutlinedInput-notchedOutline": { border: "none",},
                    "& .MuiInputBase-input": { fontSize: "1.7rem", padding: "0.5rem 1rem"}
                }}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "#739CD4", fontSize: "2.8rem", marginLeft:"0.6rem"}} />
                            </InputAdornment>
                        ),
                    }
                }}
            />
        </Box>
    );
};

export default BookSearchBar;
