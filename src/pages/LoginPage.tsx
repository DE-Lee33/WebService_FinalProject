import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage : React.FC = () => {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                'http://localhost:5000/api/auth/login',
                {
                    id,
                    password
                }
            );

            localStorage.setItem(
                'token',
                res.data.token
            );

            alert('로그인 성공');
            navigate('/');

            window.location.reload();

        }
        catch (error) {
            alert('로그인 실패');
        }
    };
    
    return (
        <Container className="d-flex justify-content-center align-items-center " style={{ height: '80vh' }}>
            <div
                className="login-box p-4"
                style={{
                    border: '1px solid #ced4da',
                    borderRadius: '10px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '500px',
                    backgroundColor: '#fff',    
                }}
            >

            <h2 className="text-center">로그인 </h2>

            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="text-start w-100">아이디</Form.Label>
                    <Form.Control type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디를 입력하세요" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-3">
                    <Form.Label className="text-start w-100">비밀번호</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호를 입력하세요" />
                </Form.Group>
                        
                <div className="d-flex justify-content-center gap-3 mt-3">
                    <Button
                        variant="outline-primary"
                        type="submit"
                        style={{ width: '120px' }}
                    >
                        로그인
                    </Button>

                    <Button
                        variant="outline-primary"
                        type="button"
                        style={{ width: '120px' }}
                        onClick={() => navigate('/register')}
                    >
                        회원가입
                    </Button>
                </div>
            </Form>
        </div>
    </Container>
  ) 
}

export default LoginPage;

