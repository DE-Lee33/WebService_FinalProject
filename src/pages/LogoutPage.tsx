import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../data/store';

const LogoutPage: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(clearCart());

        alert('로그아웃 되었습니다.');

        navigate('/');
        window.location.reload();
    };

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh' }}>
            <Button
                variant="outline-primary"
                onClick={handleLogout}
            >
                로그아웃
            </Button>
        </Container>
    );
};

export default LogoutPage;