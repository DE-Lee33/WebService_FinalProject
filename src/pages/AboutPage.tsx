import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import React, {useEffect} from 'react';

const AboutPage : React.FC = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
                else {
                    entry.target.classList.remove('active');
                }
            });
        });

        const elements = document.querySelectorAll('.reveal');
        elements.forEach((el) => observer.observe(el));
    }, []);


    return (
        <div>
            <Container className="d-flex justify-content-center align-items-center " style={{ height: '100vh' }}>
                <Row className="align-items-center">

                    <Col md={6} className="header_left reveal">
                        <header className="header_left_intro">
                            <p><h1>안녕하세요</h1></p>
                            <p>컴퓨터학과 20240821 이다은 입니다</p></header>
                    </Col>

                    <Col md={6}>
                        <img src = "/img/본인사진.jpg" width="60%" alt="본인 이미지" />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AboutPage;