import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CustomGrid from "../../components/grid/CustomGrid";
import { Link } from "react-router-dom";
import {
  GetContact,
  GetAddress,
  DeleteContact,
  PostContact,
} from "../../redux/authSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "react-quill-image-uploader";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import getSlug from "speakingurl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Loading from "../loading/Loading";

function Contact(props) {
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
    name_register: "",
    address_register: "",
    email_register: "",
    phone_register: "",
  });

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
      field: "name_register",
      headerName: "Tên",
      width: 150,
      editable: true,
      headerAlign: "left",
    },
    {
      index: 3,
      field: "address_register",
      headerName: "Tên địa điểm",
      width: 150,
      editable: true,
      headerAlign: "left",
    },
    {
      index: 31123,
      field: "phone_register",
      headerName: "Số điện thoại",
      width: 150,
      editable: true,
      headerAlign: "left",
    },
    {
      index: 3654657,
      field: "email_register",
      headerName: "Email",
      width: 150,
      editable: true,
      headerAlign: "left",
    },
    {
      index: 4,
      field: "created_timeStr",
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
      await dispatch(GetContact({ token }))
        .unwrap()
        .then((res) => {
          setData(res?.data);
        });
      // await dispatch(GetAddress({ token }))
      //   .unwrap()
      //   .then((res) => {
      //     setDataCategory(res.data);
      //   });
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
      !valueSend.name_register ||
      !valueSend.address_register ||
      !valueSend.phone_register ||
      !valueSend.email_register
    ) {
      return toast.warning("bạn cần điền đủ field");
    }
    setLoading(true);
    setEdit(!edit);
    // let slug = getSlug(value.trim());
    try {
      await dispatch(
        PostContact({
          ...valueSend,
          token,
        })
      ).then((res) => {
        setLoading(false);
        setValue("");
        setActive(!active);
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
        DeleteContact({
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
          <h3>Danh sách Liên hệ </h3>
          {role ? (
            !edit ? (
              <Button
                className="my-3"
                variant="contained"
                onClick={handleClick}
              >
                Thêm dịch vụ
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
              <div>
                <TextField
                  className="my-2"
                  sx={{ background: "#fff", minWidth: 300 }}
                  size="small"
                  id="outlined-basic"
                  label="Tên đăng kí"
                  variant="outlined"
                  value={valueSend.name_register}
                  onChange={(e) =>
                    setValueSend({
                      ...valueSend,
                      name_register: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <TextField
                  className="my-2"
                  sx={{ background: "#fff", minWidth: 300 }}
                  size="small"
                  id="outlined-basic"
                  label="Địa điểm"
                  variant="outlined"
                  value={valueSend.address_register}
                  onChange={(e) =>
                    setValueSend({
                      ...valueSend,
                      address_register: e.target.value,
                    })
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
                  value={valueSend.email_register}
                  onChange={(e) =>
                    setValueSend({
                      ...valueSend,
                      email_register: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <TextField
                  className="my-2"
                  sx={{ background: "#fff", minWidth: 300 }}
                  size="small"
                  id="outlined-basic"
                  label="Sdt"
                  variant="outlined"
                  value={valueSend.phone_register}
                  onChange={(e) =>
                    setValueSend({
                      ...valueSend,
                      phone_register: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          ) : null}
          <div className="grid__main">
            <CustomGrid path="contact" data={data} changeCols={columns} />
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

export default Contact;
