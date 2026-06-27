import {Container} from 'react-bootstrap';

const Footer : React.FC = () => {
    return (
        <footer className="text-white py-1 mt-3" style={{backgroundColor: '#b5c5f8'}} >
            <Container className="text-center">
                2026 웹서비스 기말 과제<br/>
                20240821 이다은
            </Container>
        </footer>
    )
}

export default Footer;