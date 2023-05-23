import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CustomGrid from "../../components/grid/CustomGrid";
import { Link } from "react-router-dom";
import {
  GetUser,
  GetRole,
  DeleteUser,
  PostUser,
} from "../../redux/authSlice";
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

function User(props) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const role = true;
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
  // =======================================
  const columns = [
    {
      index: 1,
      field: "_id",
      headerName: "",
      width: 90,
      align: "left",
      hideable: true,
      hide: true,
    },
    {
      index: 2,
      field: "fullName",
      headerName: "Tên",
      width: 150,
      editable: true,
      headerAlign: "left",
    },
    {
      index: 3,
      field: "email",
      headerName: "Email",
      width: 150,
      editable: true,
      headerAlign: "left",
    },
    {
      index: 4,
      field: "phoneNumber",
      headerName: "Số điện thoại",
      width: 160,
      editable: true,
      headerAlign: "left",
    },
    {
      index: 412,
      field: "address",
      headerName: "Địa chỉ",
      width: 160,
      editable: true,
      headerAlign: "left",
    },
    {
      index: 344,
      field: "createDate",
      headerName: "Ngày đăng kí",
      width: 160,
      editable: true,
      headerAlign: "left",
    },
    {
      index: 100,
      field: "action",
      headerName: "Action",
      width: 300,
      editable: true,
      headerAlign: "left",
      renderCell: (row) => {
        // console.log("row",row.row)
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <Link to={`${row.row.id}`}>
              <button className="btn btn-primary">View</button>
            </Link>
            <button
              onClick={() => hanldeDelete(row.row.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];
  const arr = []
  arr.push('hello')
  console.log('arrr' , arr)
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        ["image", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["clean"],
      ],
      handlers: {
        image: ImageUploader.handler,
      },
    },
  };
  const handleGetdata = async () => {
    try {
      await dispatch(GetUser({ token }))
        .unwrap()
        .then((res) => {
          setData(res?.data);
        });
      await dispatch(GetRole({ token }))
        .unwrap()
        .then((res) => {
          setDataCategory(res.data);
        });
    } catch (error) {}
  };
  const handleClick = () => {
    setEdit(!edit);
  };
  useEffect(() => {
    if (token) {
      handleGetdata();
    }
  }, [token, active]);
  const handleSubmit = async () => {
    if (
      !valueSend.RoleIds ||
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
    let slug = getSlug(value.trim());
    try {
      await dispatch(
        PostUser({
          ...valueSend,
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
        })
      });
    } catch (error) {
      setLoading(false);
      setActive(!active);
    }
  };
  const hanldeDelete = async (url) => {
    console.log("url", url);
    setLoading(true);
    try {
      await dispatch(
        DeleteUser({
          id: url,
          token,
        })
      ).then((res) => {
        setLoading(false);
        setActive(!active);
      });
    } catch (error) {
      setLoading(false);
      setActive(!active);
    }
  };
  const handleChange = () => {};
  console.log("valuesend", valueSend);
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h3>Danh sách người dùng</h3>
          {role ? (
            !edit ? (
              <Button
                className="my-3"
                variant="contained"
                onClick={handleClick}
              >
                Thêm user
              </Button>
            ) : (
              <Button
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
              <FormControl
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
              </FormControl>
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
          <div className="grid__main">
            <CustomGrid
              data={data}
              changeCols={columns}
              path={"user"}
              editId={true}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
const Container = styled.div`
  .grid__main {
    background: #fff;
  }
  min-height: calc(100vh - 76px);
  overflow-x: hidden !important;
  display: flex;
  flex-direction: column;
  width: calc(100vw - 160px);
  padding: 40px 40px;
  margin-left: 160px;
  margin-top: 76px;
  z-index: 1;
  background: #eee;
`;

export default User;
