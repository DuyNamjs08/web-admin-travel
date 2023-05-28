import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CustomGrid from "../../components/grid/CustomGrid";
import { Link } from "react-router-dom";
import {
  GetHistory,
  GetAddress,
  PutHistory,
  PostHotel,
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

function IncognitoCmt(props) {
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
    category_id: "",
    name: "",
    background_image: "",
    file: "",
  });

  const columns = [
    {
      index: 1,
      field: "id",
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
      field: "payment_method",
      headerName: "Thanh toán",
      width: 150,
      editable: true,
      headerAlign: "left",
    },
    {
      index: 37567,
      field: "phone_register",
      headerName: "Phone",
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
        console.log("row", row.row);
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            {row.row.status === 1 ? (
              <p>Đã xác nhận</p>
            ) : (
              <button
                onClick={() => hanldeConfirm(row.row)}
                className="btn btn-danger"
              >
                Xác nhận
              </button>
            )}
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
      await dispatch(GetHistory({ token }))
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
  // const handleSubmit = async () => {
  //   if (
  //     !valueSend.category_id ||
  //     !valueSend.name ||
  //     !valueSend.background_image
  //   ) {
  //     return toast.warning("bạn cần điền đủ field");
  //   }
  //   setLoading(true);
  //   setEdit(!edit);
  //   // let slug = getSlug(value.trim());
  //   try {
  //     await dispatch(
  //       PostHotel({
  //         ...valueSend,
  //         token,
  //       })
  //     ).then((res) => {
  //       setLoading(false);
  //       setValue("");
  //       setActive(!active);
  //     });
  //   } catch (error) {
  //     setLoading(false);
  //     setActive(!active);
  //   }
  // };
  const hanldeConfirm = async (value) => {
    console.log("value", value);
    setLoading(true);
    try {
      await dispatch(
        PutHistory({
          id: value.id,
          id_tour: value.id_tour,
          name_register: value.name_register,
          address_register: value.address_register,
          phone_register: value.phone_register,
          email_register: value.email_register,
          status: 1,
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
          <h3>Lịch sử tour </h3>
          <div className="grid__main">
            <CustomGrid
              data={data}
              changeCols={columns}
              path={"incognito-comments"}
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
  min-height: 100vh;
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
export default IncognitoCmt;
