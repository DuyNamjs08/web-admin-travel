import React, { useState } from "react";
import logo from "../assets/full-logo.png";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/searchInput/SearchInput";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

const StyleHeader = styled.div`
  border-bottom: 1px solid #ccc;
  margin-left: 160px;
  height: 76px;
  align-items: center;
  justify-content: space-between;
  padding: 10px 60px;
  position: fixed;
  top: 0;
  background: #fff;
  z-index: 100;
  width: calc(100vw - 160px);
`;
const StyleImg = styled.img.attrs({
  src: `${logo}`,
})`
  width: 160px;
  object-fit: contain;
`;
const StyleTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;
const StyleText = styled.div`
  font-size: 14px;
  color: "#ccc";
`;
const StyleIcon = styled.div`
  font-size: 20px;
  cursor: pointer;
`;
const StyleSupport = styled.div`
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;
const StyleLink = styled.div`
  cursor: pointer !important;
  a {
    cursor: pointer !important;
    color: #000;
    text-decoration: none;
  }
`;
function Header(props) {
  const [data, setData] = useState([]);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <StyleHeader className="d-flex gap-3">
      <div className="d-flex gap-3 align-items-center">
        <Link to="/">
          {/* <StyleImg src={logo} alt="" /> */}
          <SearchInput />
        </Link>
      </div>
      <div className="d-flex gap-3 align-items-center">
        <StyleLink className="link">
          <Link to={"/"}>
            <Badge badgeContent={4} color="primary">
              <MailIcon color="action" />
            </Badge>
          </Link>
        </StyleLink>
        <StyleSupport className="mb-0 link">
          <StyleLink>
            {token ? (
              <Tooltip title="Logout" onClick={handleLogout}>
                <IconButton>
                  <Avatar>H</Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              <Link to="/login">Đăng nhập</Link>
            )}
          </StyleLink>
        </StyleSupport>
      </div>
      {/* <div className="d-flex align-items-center gap-1">
        <StyleSupport className="mb-0 link">
          <StyleLink>
            {token ? (
              <Tooltip title="Logout" onClick={handleLogout}>
                <IconButton>
                  <Avatar>H</Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              <Link to="/login">Đăng nhập</Link>
            )}
          </StyleLink>
        </StyleSupport>
      </div> */}
    </StyleHeader>
  );
}

export default Header;
