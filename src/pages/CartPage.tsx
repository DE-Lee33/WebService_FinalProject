import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, setCart, type RootState } from '../data/store';
import axios from 'axios';
import { useEffect, useState } from 'react';

const CartPage: React.FC = () => {

    const dispatch = useDispatch();

    const cartItems = useSelector((state: RootState) => {
        console.log('CartPage cartA', state.cart.cartA)
        return state.cart.cartA
    })

    const [loaded, setLoaded] = useState(false);


    const loadCart = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            setLoaded(true);
            return;
        }

        if (!loaded) {
            return <div>로딩중...</div>;
        }

        try {
            const res = await axios.get(
                'http://localhost:5000/api/cart',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log('DB 응답:', res.data);

            dispatch( setCart(res.data.items || []));

            setLoaded(true);

        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => { loadCart();}, []);


    return (
        <Container className="py-4" style={{ height: '80vh' }}>
            <h2 className="text-center mb-4">장바구니</h2>

            {cartItems.length === 0 ? (
                <p className="text-center text-muted">담긴 여행지가 없습니다.</p>
            ) : (
                <Table striped bordered responsive>
                    <thead>
                        <tr>
                            <th>여행지</th>
                            <th>한줄평</th>
                            <th>삭제</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.summary ?? '-'}</td>
                                <td>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={async () => {
                                            dispatch(removeFromCart(item.id));

                                            const token = localStorage.getItem('token');

                                            await axios.delete(
                                                `http://localhost:5000/api/cart/${item.id}`,
                                                {
                                                    headers: {
                                                        Authorization: `Bearer ${token}`
                                                    }
                                                }
                                            );
                                        }}
                                    >
                                        삭제
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

            <Row className="text-center mt-3">
                <Col>
                    <h5>총 {cartItems.length}개의 여행지</h5>
                </Col>
            </Row>
        </Container>
    );
};



export default CartPage;
