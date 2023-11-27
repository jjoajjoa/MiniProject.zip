import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import SearchPage from './shop/SearchPage';
import ShopList from './shop/ShopList';
import ShopUpdate from './shop/ShopUpdate';
import LoginPage from './user/LoginPage';
import { getCookie, delCookie } from "../common.js"
import HomePage from './HomePage.jsx';
import ShopInfo from './shop/ShopInfo.jsx';

const NaviPage = () => {
    const location = useLocation();
    const path = location.pathname;

    const uid = getCookie("uid");
    if(uid) sessionStorage.setItem("uid", uid);

    const onLogout = (e) => {
        e.preventDefault();
        if (window.confirm("로그아웃 하시겟슴까?")) {
            sessionStorage.clear();
            delCookie("uid")
            window.location.href = "/";
        }
    }

    return (
        <>
            <Navbar expand="lg" bg="dark" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand href="/">LOGO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100%' }}
                            navbarScroll>
                            <Nav.Link href="/shop/search" className={path.indexOf('/shop/search') !== -1 && 'active'}>
                                상품검색
                            </Nav.Link>
                            <Nav.Link href="/shop/list" className={path.indexOf('/shop/') !== -1 && 'active'}>
                                상품목록
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            {sessionStorage.getItem("uid") ?
                                <>
                                    <Nav.Link href="/mypage" className={path.indexOf('/mypage') !== -1 && 'active'}>
                                        {sessionStorage.getItem("uid")}
                                    </Nav.Link>
                                    <Nav.Link href="/logout" onClick={onLogout}>
                                        Log Out
                                    </Nav.Link>
                                </>
                                :
                                <Nav.Link href="/login" className={path.indexOf('/login') !== -1 && 'active'}>
                                    Log In
                                </Nav.Link>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/shop/search" element={<SearchPage />} />
                <Route path="/shop/list" element={<ShopList />} />
                <Route path="/shop/update/:pid" element={<ShopUpdate />} />

                <Route path="/login" element={<LoginPage />} />

                <Route path="/" element={<HomePage />} />
                <Route path="/shop/info/:pid" element={<ShopInfo />} />
            </Routes>
        </>
    )
}

export default NaviPage