import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './Archive.module.css';

const ArchiveWish = ({ searchQuery }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/archive", { headers: { user_id: 1 } })
      .then((response) => {
        const filteredBooks = response.data?.books?.filter((book) => book.status === "wish") || [];
        setBooks(filteredBooks);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  // 책 목록 필터링
  const displayedBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {loading ? (
        <div className={styles.loading}>도서 목록을 불러오고 있습니다.</div>
      ) : error ? (
        <div className={styles.error}>목록을 불러오는 중 오류가 발생했습니다.</div>
      ) : displayedBooks.length > 0 ? (
        <div className={styles.wishlist}>
          {displayedBooks.map((book) => (
            <div
              className={styles.wishcard}
              key={book.book_id}
              onClick={() => navigate(`/note/${book.book_id}`)}
              style={{ cursor: "pointer" }}
            >
              <img className={styles.wishcover} src={book.cover} alt={book.title} />
              <div className={styles.wishinfo}>
                <p className={styles.wishtitle}>{book.title}</p>
                <p className={styles.wishauthor}>{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.nobooks}>검색 결과가 없습니다.</div>
      )}
    </div>
  );
};

export default ArchiveWish;
