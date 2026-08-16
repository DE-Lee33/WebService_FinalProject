import { Container, Nav, Navbar } from 'react-bootstrap';
import { Route, Routes, Link } from 'react-router-dom'
import AboutPage from '../pages/AboutPage' 
import HomePage from '../pages/HomePage'
import PlacePage from '../pages/PlacePage'
import RecommendPage from '../pages/RecommendPage'
import LoginPage from '../pages/LoginPage';
import CartPage from '../pages/CartPage';
import {PersonFill, BasketFill} from 'react-bootstrap-icons';
import RegisterPage from '../pages/RegisterPage';
import { useEffect, useState } from 'react';
import LogoutPage from '../pages/LogoutPage';

const Content : React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogin(!!token);
  }, []);

  return (
    <div>
      <Navbar style = {{backgroundColor: '#b5c5f8'}} data-bs-theme="dark">
        <Container>
          <Navbar.Brand><h3>Travel Note</h3></Navbar.Brand>

            <Nav className="me-auto">
              <Nav.Link as={Link} to="/"> HOME </Nav.Link>
              <Nav.Link as={Link} to="/recommend"> RECOMMEND </Nav.Link>
              <Nav.Link as={Link} to="/place"> PLACE </Nav.Link>
              <Nav.Link as={Link} to="/about"> ABOUT </Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link as={Link} to={isLogin ? "/logout" : "/login"} className="d-flex align-items-center">
                <PersonFill size={20} className="me-2" />
                  {isLogin ? "Logout" : "Login"}
              </Nav.Link>

              <Nav.Link as={Link} to="/cart" className="d-flex align-items-center">
                <BasketFill size={20} className="me-2" />
                  Cart
              </Nav.Link>
            </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recommend" element={<RecommendPage />} />
        <Route path="/place" element={<PlacePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Routes>

    </div>
  )
}

export default Content;
