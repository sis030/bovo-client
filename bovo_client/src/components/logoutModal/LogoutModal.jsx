import PropTypes from 'prop-types'; // PropTypes 임포트
import { useDispatch, useSelector } from "react-redux";
import { toggleLogoutModal } from "../../store/logout/LogoutSlice";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import styles from './LogoutModal.module.css';

const LogoutModal = ({ handleLogout }) => {
    const dispatch = useDispatch();
    const isLogout = useSelector((state) => state.logout.isLogout);

    const handleClose = () => {
        dispatch(toggleLogoutModal(false)); // 모달 닫기
    };

    return (
        <Dialog 
            open={isLogout} 
            sx={{
                "& .MuiDialog-paper": {
                    width: "41.25rem",               // 너비 변경
                    height: "20rem",
                    padding: "3.125rem 5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#E8F1F6",  // 배경색 변경
                    borderRadius: "1.25rem",         // 모서리 둥글게
                },
            }}
        >
            <DialogTitle
                sx={{fontSize: "3rem", fontWeight: "bold" }}
            >
                로그아웃
            </DialogTitle>
            <DialogContent
                sx={{
                    width: "31.25rem",
                    height: "3.125rem",
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden"
                }}
            >
                <p className={styles.logoutDiscription}>
                    정말 로그아웃 하시겠습니까?
                </p>
            </DialogContent>
            <DialogActions
                sx={{
                    width: "31.25rem",
                    height: "5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <Button 
                    onClick={handleClose}
                    sx={{
                        width: "12.5rem",
                        height: "5rem",
                        borderRadius: "1.5rem",
                        backgroundColor: "white",
                        color: "#739CD4",
                        fontSize: "2rem",
                        letterSpacing: "0",
                        textAlign: "center",
                    }}  
                >
                    취소
                </Button>
                <Button 
                    onClick={handleLogout}
                    sx={{
                        width: "12.5rem",
                        height: "5rem",
                        borderRadius: "1.5rem",
                        backgroundColor: "#739CD4",
                        color: "white",
                        fontSize: "2rem",
                        letterSpacing: "0",
                        textAlign: "center",
                    }} 
                >
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LogoutModal;

LogoutModal.propTypes = {
    handleLogout: PropTypes.func.isRequired, // open은 boolean 타입이고 필수 props
};