import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CustomGrid from "../../components/grid/CustomGrid";
import { Link } from "react-router-dom";
import { PutUser , GetUserById } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import getSlug from "speakingurl";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "react-quill-image-uploader";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Loading from "../loading/Loading";
import patern from "../../assets/img/patern.jpg";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  HiOutlinePhone,
  HiOutlineVideoCamera,
  HiOutlineEllipsisVertical,
} from "react-icons/hi2";

function UserDetails(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const role = true;
  const path = useLocation();
  const [data, setData] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const [valueSelect, setValueSelect] = useState("");
  const [content, setContent] = useState("");
  const [valueSend, setValueSend] = useState({
    RoleIds: "",
    Username: "",
    Password: "",
    FullName: "",
    Email: "",
    PhoneNumber: "",
    backgroundImage: "",
    Address: "",
  });
  const getDataDetails = async (value) => {
    try {
      await dispatch(GetUserById(value))
        .unwrap()
        .then((res) => {
          console.log(res);
          setData(res.resultObj);
          setValue(res.name);
        });
    } catch (error) {
      toast.error("có lỗi xảy ra !");
    }
  };
  useEffect(() => {
    if (token) {
      getDataDetails({ token, id: path.pathname.split("/")[2] });
    }
  }, [token, active]);
  const handleSubmit = async () => {
    if (
      // !valueSend.RoleIds ||
      !valueSend.Username ||
      !valueSend.Password ||
      !valueSend.FullName ||
      !valueSend.Email ||
      !valueSend.PhoneNumber ||
      !valueSend.backgroundImage ||
      !valueSend.Address
    ) {
      return toast.warning("bạn cần điền đủ field");
    }
    setLoading(true);
    setEdit(!edit);
    // let slug = getSlug(value.trim());
    try {
      await dispatch(
        PutUser({
          ...valueSend,
          id: path.pathname.split("/")[2],
          RoleIds:data.roleIds,
          token,
        })
      ).then((res) => {
        setLoading(false);
        setValue("");
        setActive(!active);
        setValueSend({
          RoleIds: "",
          Username: "",
          Password: "",
          FullName: "",
          Email: "",
          PhoneNumber: "",
          backgroundImage: "",
          Address: "",
        });
      });
      navigate('/user')
    } catch (error) {
      setLoading(false);
      setActive(!active);
    }
  };
  const handleClick = () => {
    setEdit(!edit);
  };
  console.log("valuesend", valueSend);
  return (
    <Container>
      <h3>UserDetails</h3>
      {role ? (
        !edit ? (
          <Button
            style={{ maxWidth: "200px" }}
            className="my-3"
            variant="contained"
            onClick={handleClick}
          >
            Sửa user
          </Button>
        ) : (
          <Button
            style={{ maxWidth: "200px" }}
            className="my-3"
            variant="contained"
            onClick={handleSubmit}
          >
            submit
          </Button>
        )
      ) : (
        ""
      )}
      {edit ? (
        <div className="mb-4">
          {/* <FormControl
            className="my-2"
            sx={{ background: "#fff", minWidth: 200 }}
            size="small"
          >
            <InputLabel>Phân quyền</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={valueSend.RoleIds}
              label="Phân quyền"
              name="RoleIds"
              onChange={(e) =>
                setValueSend({ ...valueSend, RoleIds: e.target.value })
              }
            >
              {dataCategory?.map((item) => (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl> */}
          <div>
            <TextField
              className="my-2"
              sx={{ background: "#fff", minWidth: 300 }}
              size="small"
              id="outlined-basic"
              label="Username"
              variant="outlined"
              value={valueSend.Username}
              onChange={(e) =>
                setValueSend({ ...valueSend, Username: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              className="my-2"
              sx={{ background: "#fff", minWidth: 300 }}
              size="small"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={valueSend.Password}
              onChange={(e) =>
                setValueSend({ ...valueSend, Password: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              className="my-2"
              sx={{ background: "#fff", minWidth: 300 }}
              size="small"
              id="outlined-basic"
              label="Address"
              variant="outlined"
              value={valueSend.Address}
              onChange={(e) =>
                setValueSend({ ...valueSend, Address: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              className="my-2"
              sx={{ background: "#fff", minWidth: 300 }}
              size="small"
              id="outlined-basic"
              label="FullName"
              variant="outlined"
              value={valueSend.FullName}
              onChange={(e) =>
                setValueSend({ ...valueSend, FullName: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              className="my-2"
              sx={{ background: "#fff", minWidth: 300 }}
              size="small"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={valueSend.Email}
              onChange={(e) =>
                setValueSend({ ...valueSend, Email: e.target.value })
              }
            />
          </div>
          <div>
            <TextField
              className="my-2"
              sx={{ background: "#fff", minWidth: 300 }}
              size="small"
              id="outlined-basic"
              label="PhoneNumber"
              variant="outlined"
              value={valueSend.PhoneNumber}
              onChange={(e) =>
                setValueSend({ ...valueSend, PhoneNumber: e.target.value })
              }
            />
          </div>
          <div>
            <h3>Chọn ảnh</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setValueSend({
                  ...valueSend,
                  backgroundImage: e.target.files?.[0],
                })
              }
            />
          </div>
        </div>
      ) : null}
      <div className="main">
        <div className="item__left">
          <div className="main__left">
            <img src={data?.backgroundImage} alt="" />
            <h4>{data?.fullName}</h4>
            <h6>{data?.email}</h6>
            <div className="profile__icon">
              <div>
                <HiOutlinePhone />
              </div>
              <div>
                <HiOutlineVideoCamera />
              </div>
              <div>
                <HiOutlineEllipsisVertical />
              </div>
            </div>
            <div className="profile">
              <ul>
                <li>
                  <div>Tên: </div>{data?.fullName}
                </li>
                <li>
                  <div>Username: </div>{data?.username}
                </li>
                <li>
                  <div>Địa chỉ: </div>{data?.address}
                </li>
                <li>
                  <div>Email: </div>{data?.email}
                </li>
                <li>
                  <div>SDT: </div>{data?.phoneNumber}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="item__right">
          <div className="main__right">
            <div className="item__right1">1</div>
            <div className="item__right2">2</div>
          </div>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  .main {
    display: flex;
    background-color: #fff;
    min-height: calc(100vh - 76px);
    border-radius: 8px;
    .item__left {
      flex: 1;
      padding: 20px;
      .main__left {
        height: 100%;
        padding: 10px;
        border-radius: 8px;
        background: #eeebeb;
        display: flex;
        flex-direction: column;
        align-items: center;
        .profile {
          width: 100%;
          margin-top: 20px;

          ul {
            li {
              list-style: none;
              display: flex;

              div {
                font-size: 16px;
                font-weight: bold;
                width: 80px;
              }
            }
          }
        }
        .profile__icon {
          display: flex;
          gap: 10px;
          align-items: center;
          div {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 18px;
            transition: all ease-in-out 0.4;
            &:hover {
              background: #f4b183;
              color: #fff;
            }
          }
        }
        img {
          width: 100px;
          object-fit: contain;
          border-radius: 50%;
        }
      }
    }
    .item__right {
      flex: 1;
      padding: 20px;
      .main__right {
        height: 100%;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        .item__right1 {
          border-radius: 8px;
          width: 100%;
          padding: 10px;
          flex: 1;
          background: #eeebeb;
        }
        .item__right2 {
          border-radius: 8px;
          width: 100%;
          padding: 10px;
          flex: 1;
          background: #eeebeb;
        }
      }
    }
  }
  overflow-x: hidden !important;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 76px);
  width: calc(100vw - 160px);
  padding: 40px;
  margin-left: 160px;
  margin-top: 76px;
  z-index: 1;
  background: #eee;
`;

export default UserDetails;
