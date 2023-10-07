import React, { useRef, useEffect, useState, useContext } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AuthContext } from '../../context/AuthContext';
import './Header.css';

const NavLinks = [
  {
    path: '/home',
    display: 'Home',
  },
  {
    path: '/about',
    display: 'About',
  },
  {
    path: '/tour',
    display: 'Tour',
  },
];

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleMenuClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeMenu = () => {
    setIsNavOpen(false);
  };

  const headerRef = useRef(null);

  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        headerRef.current.classList.add('sticky_header');
      } else {
        headerRef.current.classList.remove('sticky_header');
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      closeMenu(); // Close the menu when switching between mobile and desktop views
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className={`header ${isMobile ? 'mobile' : 'desktop'}`} ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            <div className="logo" alt="logo">
              <Link to="/home" onClick={closeMenu}>
                <h1>GuideMate</h1>
              </Link>
            </div>
            {isMobile ? (
              <div className="nav_right">
                <span
                  className="mobile_menu d-flex align-items-center gap-4"
                  onClick={handleMenuClick}
                >
                  <GiHamburgerMenu />
                </span>
              </div>
            ) : (
              <div className="navigation">
                <ul className="menu d-flex align-items-center gap-5">
                  {NavLinks.map((item, index) => (
                    <li className="nav_items" key={index}>
                      <NavLink to={item.path} activeClassName="active_link">
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {isMobile && isNavOpen && (
              <div className="mobile_navigation">
                <ul className="menu d-flex align-items-center gap-5">
                  {NavLinks.map((item, index) => (
                    <li className="nav_items" key={index}>
                      <NavLink
                        to={item.path}
                        activeClassName="active_link"
                        onClick={closeMenu}
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {!isMobile && (
              <div className="nav_right d-flex align-items-center gap-4">
                <div className="nav_btns d-flex align-items-center gap-4">
                  {user ? (
                    <>
                      <h5 className="mb-0" key="username">
                        {user.username}
                      </h5>
                      <Button className="btn btn-dark" onClick={logout} key="logout">
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="btn primary_btn">
                        <Link to="/login">Login</Link>
                      </Button>
                      <Button className="btn primary_btn">
                        <Link to="/register">Register</Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
