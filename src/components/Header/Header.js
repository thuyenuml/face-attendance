import React from 'react';
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../constants/apiContants';
import './Header.css';
import logo from "../../images/bzcom-logo.svg";
import Nav from "react-bootstrap/Nav";

function Header(props) {

    return(
        <div className="header">
            <div className="branding">
                <a href="#" className="nav-link">
                    <img className="logo" src={logo} />
                </a>
            </div>
            <div className="header-nav">
                <Nav
                    activeKey="/home"
                    onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                >
                    <Nav.Item>
                        <Nav.Link href="/home">Accounts</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1">Subjects</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-2">Indentify Faces</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-3">Verify Face</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            <div className="header-actions">
                <a href="/" className="nav-link nav-icon-text">
                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-person" fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    </svg>
                    <span className="nav-text">username</span>
                </a>
            </div>
        </div>
    )
}
export default withRouter(Header);
