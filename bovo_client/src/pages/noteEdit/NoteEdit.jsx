import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import NoteTemplate from "../../components/templateModal/NoteTemplate";
import useBooks from "../../hooks/useBooks";

const NoteEdit = () => {
  const { memo_id } = useParams();
  const navigate = useNavigate();
  const { getMemoById, updateMemo, createMemo, loading } = useBooks();
  const memo = getMemoById(memo_id);

  const [loadedMemo, setLoadedMemo] = useState({
    memo_Q: "",
    memo_A: "",
    memo_date: new Date().toLocaleDateString("ko-KR", { year: "2-digit", month: "2-digit", day: "2-digit" }),
  });

  const [titleFocused, setTitleFocused] = useState(false);
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const MAX_TITLE_LENGTH = 36;

  useEffect(() => {
    if (memo) {
      setLoadedMemo({
        memo_Q: memo.memo_Q || "",
        memo_A: memo.memo_A || "",
        memo_date: memo.memo_date || new Date().toLocaleDateString("ko-KR", { year: "2-digit", month: "2-digit", day: "2-digit" }),
      });
    }
  }, [memo]);

  const handleSaveMemo = async () => {
    if (!loadedMemo.memo_Q || !loadedMemo.memo_A) {
      console.error("오류: 제목과 내용이 비어있습니다.");
      return;
    }

    const updatedMemo = {
      memo_Q: loadedMemo.memo_Q,
      memo_A: loadedMemo.memo_A,
    };

    let memoIdToNavigate;

    if (memo_id) {
      console.log("수정할 메모:", updatedMemo);
      const success = await updateMemo(memo_id, updatedMemo);
      if (success) memoIdToNavigate = memo_id;
    } else {
      console.log("새로운 메모 저장:", updatedMemo);
      const newMemoId = await createMemo("1", updatedMemo); //저거 넘버 가져와야하는데
      if (newMemoId) memoIdToNavigate = newMemoId;
    }

    if (memoIdToNavigate) {
      navigate(`/note/note-detail/${memoIdToNavigate}`);
      window.location.reload();
    }
  };

  const handleOpenTemplateModal = () => setTemplateModalOpen(true);
  const handleCloseTemplateModal = () => setTemplateModalOpen(false);
  const handleApplyTemplate = (templateContent) => {
    setLoadedMemo({ ...loadedMemo, memo_Q: templateContent });
    setTemplateModalOpen(false);
  };

  if (loading) {
    return <Typography>메모를 불러오는 중입니다.</Typography>;
  }

  
  return (
    <Box 
      display="flex"
      flexDirection="column" 
      alignItems="center"
      sx={{ width: "100%", padding: "0rem", position: "relative" }}
    >
      {/* 기록 시각 & 버튼 */}
      <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      gap="2rem" 
      sx={{ 
        width: "100%" 
        }}>
        {/* 기록 시각 */}
        <Box 
          sx={{ 
            width: "20rem", 
            height: "4rem", 
            backgroundColor: "#E8F1F6", 
            borderRadius: "0.625rem", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            textAlign: "center"
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 600, fontSize: "1.4rem" }}>
            기록 시각 : {loadedMemo.memo_date}
          </Typography>
        </Box>

        {/* 버튼 */}
        <Box display="flex" gap="2rem">
          <Button 
            variant="contained" 
            disableElevation 
            onClick={handleOpenTemplateModal}
            sx={{ 
                width: "10rem", 
                height: "4rem", 
                backgroundColor: "#BDE5F1", 
                color: "black",
                borderRadius: "0.625rem",
                fontSize: "1.25rem", 
                fontWeight: 500 
            }}
          >
            템플릿
          </Button>
          <Button 
            variant="contained" disableElevation 
            sx={{ width: "10rem", 
                height: "4rem", 
                backgroundColor: "#BDE5F1", 
                color: "black",
                borderRadius: "0.625rem", 
                fontSize: "1.25rem", 
                fontWeight: 500 
            }}
          >
            텍스트추출
          </Button>
        </Box>
      </Box>

      {/* 기록하기 텍스트 */}
      <Typography sx={{ 
        marginTop: "2rem", 
        fontSize: "2.5rem", 
        fontWeight: "bold", 
        color: "black", 
        alignSelf: "flex-start" }}>
        {memo_id ? "수정하기" : "기록하기"}
      </Typography>

      {loading ? (
        <Typography sx={{ fontSize: "1.5rem", marginTop: "2rem" }}>
          메모를 불러오는 중입니다.
        </Typography>
      ) : (
        <>
          {/* 질문 박스 */}
          <Box
            sx={{
              width: "41rem",
              height: "62.75rem",
              backgroundColor: "#E8F1F6",
              borderRadius: "20px",
              mt: "2rem",
              position: "relative",
            }}
          >
            {/* 세로줄 질문 입력 제목 글자 수  */}
            <Box display="flex" alignItems="center" position="relative">
              <Box sx={{ 
                width: "0.25rem",
                height: "6rem", 
                backgroundColor: "#739CD4", 
                marginLeft: "2rem" 
              }} />

                <textarea
                  value={loadedMemo.memo_Q}
                  onChange={(e) => {
                    if (e.target.value.length <= MAX_TITLE_LENGTH) {
                      setLoadedMemo({ ...loadedMemo, memo_Q: e.target.value });
                    }
                  }}
                  onFocus={() => setTitleFocused(true)}
                  onBlur={() => setTitleFocused(false)}
                  placeholder="제목을 입력해주세요."
                  style={{
                    width: "35rem",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    fontFamily: "unset",
                    color: "black",
                    border: "none",
                    background: "transparent",
                    resize: "none",
                    outline: "none",
                    overflow: "hidden",
                    margin: "2rem",
                    borderBottom: titleFocused ? "2px solid #739CD4" : "2px solid transparent",
                    transition: "border-bottom 0.3s ease",
                  }}
                />

              {/* 제목 글자 수 */}
              <Typography 
                sx={{ 
                  position: "absolute",
                  right: "2rem",
                  bottom: "0.7rem",
                  fontSize: "1rem",
                  color: "#739CD4",
                }}
              >
                {loadedMemo.memo_Q.length}/{MAX_TITLE_LENGTH}
              </Typography>
            </Box>

            {/* 답변 박스 */}
            <Box
              sx={{
                width: "38rem",
                height: "51rem",
                backgroundColor: "white",
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
                overflowY: "auto",
                position: "absolute",
                bottom: "1.5rem",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <textarea
                value={loadedMemo.memo_A}
                onChange={(e) => setLoadedMemo({ ...loadedMemo, memo_A: e.target.value })}
                placeholder="내용을 입력해주세요."
                style={{
                  width: "92%",
                  height: "92%",
                  fontFamily: "unset",
                  fontSize: "1.5rem",
                  color: "black",
                  border: "none",
                  resize: "none",
                  outline: "none",
                  padding: "1.5rem",
                }}
              />
            </Box>
          </Box>

          {/* 기록하기 버튼 */}
          <Button 
            variant="contained" 
            disableElevation
            onClick={handleSaveMemo}
            sx={{ 
              position: "absolute", 
              bottom: "-6rem", 
              right: "1.5rem",
              width: "15rem", 
              height: "5rem",
              backgroundColor: "#E8F1F6", 
              color: "#739CD4", 
              fontSize: "1.5rem", 
              fontWeight: "bold",
              borderRadius: "0.625rem"
            }}
          >
            {memo_id ? "수정완료" : "기록하기"}
          </Button>
        </>
      )}

      {/* 템플릿 모달 */}
      <NoteTemplate 
        open={templateModalOpen} 
        onClose={handleCloseTemplateModal} 
        onApplyTemplate={handleApplyTemplate}
      />
    </Box>
  );
};

export default NoteEdit;