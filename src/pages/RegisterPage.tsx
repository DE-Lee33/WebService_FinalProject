import { Container, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {

    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            await axios.post(
                'http://localhost:5000/api/auth/register',
                {
                    id,
                    password
                }
            );

            alert('회원가입 성공');

            navigate('/login');

        } 
        catch (error) {
            alert('회원가입 실패');
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: '80vh' }}
        >
            <div
                className="p-4"
                style={{
                    width: '100%',
                    maxWidth: '500px',
                    border: '1px solid #ced4da',
                    borderRadius: '10px'
                }}
            >
                <h2 className="text-center mb-4">
                    회원가입
                </h2>

                <Form onSubmit={handleRegister}>

                    <Form.Group>
                        <Form.Label>
                            아이디
                        </Form.Label>

                        <Form.Control
                            type="text"
                            value={id}
                            onChange={(e) =>
                                setId(e.target.value)
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>
                            비밀번호
                        </Form.Label>

                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        className="w-100 mt-4"
                    >
                        회원가입
                    </Button>

                </Form>
            </div>
        </Container>
    );
};

export default RegisterPage;