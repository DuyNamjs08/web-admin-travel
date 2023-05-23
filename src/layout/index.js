import React from 'react';
import Footer from './Footer';
import Header from './Header';
import SideBar from './SideBar';
import styled from 'styled-components';


function Layout({ children }) {
    return (
        <Container>
            <Header />
            <SideBar />
            {children}
            {/* <Footer /> */}

        </Container>
    );
}
const Container = styled.div`
overflow-x: hidden !important;
`

export default Layout;