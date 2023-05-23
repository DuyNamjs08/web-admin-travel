import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "react-quill-image-uploader";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  GetContactById,
  PutContact,
  GetAddress,
  PostHotelImg,
} from "../../redux/authSlice";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import getSlug from "speakingurl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Loading from "../loading/Loading";
function ContactDeatail(props) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const role = true;
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const path = useLocation();
  const [dataCategory, setDataCategory] = useState([]);
  const [valueSend, setValueSend] = useState({
    name_register: "",
    address_register: "",
    email_register: "",
    phone_register: "",
  });

  const getDataDetails = async (value) => {
    try {
      await dispatch(GetContactById(value))
        .unwrap()
        .then((res) => {
          console.log(res);
          setData(res.resultObj);
          setValue(res.name);
        });
      // await dispatch(GetAddress({ token }))
      //   .unwrap()
      //   .then((res) => {
      //     setDataCategory(res.data);
      //   });
    } catch (error) {
      toast.error("có lỗi xảy ra !");
    }
  };
  useEffect(() => {
    if (token) {
      getDataDetails({ token, id: path.pathname.split("/")[2] });
    }
  }, [token, active]);

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
  const handleClick = () => {
    setEdit(!edit);
  };

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
    try {
      await dispatch(
        PutContact({
          id: path.pathname.split("/")[2],
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
  return (
    // <Container>
    //   <div className="main">
    //     <h2>Tour chỉnh sửa chi tiết </h2>

    //     <div className="text__editor">
    //       <ReactQuill
    //         // value={content}
    //         // onChange={(value) => setContent(value)}
    //         modules={modules}
    //       />
    //     </div>
    //   </div>
    //   TourDetails
    // </Container>
    <Container>
      <div>
        {role ? (
          !edit ? (
            <Button className="my-3" variant="contained" onClick={handleClick}>
              Sửa liên hệ
            </Button>
          ) : (
            <Button className="my-3" variant="contained" onClick={handleSubmit}>
              Submit
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
        {/* <h3>Tên địa điểm:{data[0]?.resultObj.name}</h3>
        <h3>Ngày tạo:{data[0]?.resultObj.updated_timeStr}</h3> */}
        <div>
          <h2 className="my-3">Tên :{data?.name_register}</h2>
          <h3 className="my-3">Email :{data?.email_register}</h3>
          <h3 className="my-3">Địa chỉ :{data?.address_register}</h3>
          <h3 className="my-3">Số điện thoại :{data?.phone_register}</h3>
          <h6 className="my-3">Thời gian update : {data?.created_timeStr}</h6>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  .text__editor {
    background-color: #fff;
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

export default ContactDeatail;

;
