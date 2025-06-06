import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from '@mui/material/Typography';

const DeleteChatRoomModal = ({open, onClose, onConfirm}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                "& .MuiDialog-paper": {
                    width: "41.25rem",
                    height: "20rem",
                    padding: "3.125rem 4rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#E8F1F6",
                    borderRadius: "1.25rem",
                },
            }}
        >
            <DialogTitle sx={{ fontSize: "2.5rem", fontWeight: "bold" }}>
                정말 채팅방을 나가시겠습니까?
            </DialogTitle>
            <Typography
                sx={{
                    width: "31.25rem",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.5rem",
                    justifyContent: "center",
                    textAlign: "center",
                }}
            >
                채팅방을 나갈 경우 
            </Typography>
            <Typography
                sx={{
                    width: "31.25rem",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.5rem",
                    justifyContent: "center",
                    textAlign: "center",
                    marginBottom: "1rem",
                }}
            >
                이전 대화 기록은 복구할 수 없습니다.
            </Typography>
            <DialogActions
                sx={{
                    width: "31.25rem",
                    height: "5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Button
                    onClick={onClose}
                    sx={{
                        width: "12.5rem",
                        height: "5rem",
                        borderRadius: "1.5rem",
                        backgroundColor: "white",
                        color: "#739CD4",
                        fontSize: "2rem",
                    }}
                >
                    취소
                </Button>
                <Button
                    onClick={onConfirm}  // 확인 버튼 클릭 시 onConfirm 호출
                    sx={{
                        width: "12.5rem",
                        height: "5rem",
                        borderRadius: "1.5rem",
                        backgroundColor: "#739CD4",
                        color: "white",
                        fontSize: "2rem",
                    }}
                >
                    나가기
                </Button>
            </DialogActions>
            </Dialog>
    );
};

DeleteChatRoomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,  // 채팅방 나가기 추가
};

export default DeleteChatRoomModal;