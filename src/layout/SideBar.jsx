import React, { useState } from "react";
import styled from "styled-components";
import { menuSidebar } from "../constant";
import { Link } from "react-router-dom";
import Logo from '../assets/img/logomain.jpg'
import { useNavigate } from "react-router-dom";
function SideBar(props) {
  const navigate = useNavigate()
  const [active, setActive] = useState(1);
  return (
    <Container>
      <div onClick={()=>navigate('/')} className="logo">
        <img src={Logo} alt="" />
      </div>
      <div className="sidebar__main">
        {menuSidebar.map((item) => (
          <Link
            to={item.path}
            onClick={() => setActive(item.id)}
            className={`sidebar__item ${item.id === active ? "active" : ""}`}
            key={item.id}
          >
            <div className="icon">{item.icon}</div>
            <div className="title">{item.title}</div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
const Container = styled.div`
  .logo {
    height: 76px;
    width: 160px;
    border-bottom: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 100%;
      height: 100%;
      object-fit: contain;
      cursor: pointer;
    }
  }
  .sidebar__main {
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 12px;
    .active {
      background: #394867;
      color: #fff;
      border-radius: 4px;
    }
    a{
      color: unset;
    }
    .sidebar__item {
      text-decoration: none;
      padding: 4px;
      cursor: pointer;
      display: flex;
      gap: 10px;
      align-items: center;
      .icon {
        font-size: 20px;
        margin-bottom: 4px;
      }
      .title {
        font-size: 18px;
      }
    }
  }

  height: calc(100vh);
  position: fixed;
  width: 160px;
  background: #fff;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #ccc;
`;

export default SideBar;
