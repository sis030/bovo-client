/** Note에서 사용하는 삭제 모달 */

import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import useDelete from "../../hooks/useDelete";

const DeleteModal = ({ open, onClose, targetId, targetType, bookId, onSuccess }) => {
  const { deleteItem } = useDelete();

  const handleDelete = () => {
    deleteItem(targetId, targetType, bookId, () => {
      onSuccess && onSuccess(targetId);
      onClose();
    });
  };  

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "41.25rem",
          height: "20rem",
          padding: "3.125rem 5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#E8F1F6",
          borderRadius: "1.25rem",
        },
      }}
    >
      <DialogTitle sx={{ fontSize: "2.5rem", fontWeight: "bold" }}>
        정말 삭제하시겠습니까?
      </DialogTitle>
      <DialogContent
        sx={{
          width: "31.25rem",
          height: "3.125rem",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          fontSize: "1.5rem",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        삭제할 경우 이전 기록은 복구할 수 없습니다.
      </DialogContent>
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
          onClick={handleDelete}
          sx={{
            width: "12.5rem",
            height: "5rem",
            borderRadius: "1.5rem",
            backgroundColor: "#739CD4",
            color: "white",
            fontSize: "2rem",
          }}
        >
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  targetId: PropTypes.string.isRequired,
  targetType: PropTypes.string.isRequired,
  bookId: PropTypes.string,
  onSuccess: PropTypes.func,
};

export default DeleteModal;