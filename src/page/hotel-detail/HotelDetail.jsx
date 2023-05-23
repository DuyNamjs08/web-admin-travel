import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "react-quill-image-uploader";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  GetHotelById,
  PutHotel,
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
import ReactHtmlParser from "react-html-parser";
function HotelDetail(props) {
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
    category_id: "",
    name: "",
    background_image: "",
    listImg: "",
  });

  const getDataDetails = async (value) => {
    try {
      await dispatch(GetHotelById(value))
        .unwrap()
        .then((res) => {
          console.log(res);
          setData(res.resultObj);
          setValue(res.name);
        });
      await dispatch(GetAddress({ token }))
        .unwrap()
        .then((res) => {
          setDataCategory(res.data);
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
      !valueSend.category_id ||
      !valueSend.name ||
      !valueSend.background_image||
      !valueSend.listImg
    ) {
      return toast.warning("bạn cần điền đủ field");
    }
    setLoading(true);
    setEdit(!edit);
    try {
      await dispatch(PostHotelImg({
        id: path.pathname.split("/")[2],
        img_src:valueSend.listImg,
        type:'hotel',
        token
      }));
      await dispatch(
        PutHotel({
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
              Sửa Hotel
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
            <FormControl
              className="my-2"
              sx={{ background: "#fff", minWidth: 200 }}
              size="small"
            >
              <InputLabel>Chọn Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={valueSend.category_id}
                label="Chọn Category"
                name="category_id"
                onChange={(e) =>
                  setValueSend({ ...valueSend, category_id: e.target.value })
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
                label="Tiêu đề"
                variant="outlined"
                value={valueSend.name}
                onChange={(e) =>
                  setValueSend({ ...valueSend, name: e.target.value })
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
                    background_image: e.target.files?.[0],
                  })
                }
              />
            </div>
            <div>
              <h3>Chọn nhiều ảnh</h3>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                  setValueSend({ ...valueSend, listImg: e.target.files })
                }
              />
            </div>
          </div>
        ) : null}
        {/* <h3>Tên địa điểm:{data[0]?.resultObj.name}</h3>
        <h3>Ngày tạo:{data[0]?.resultObj.updated_timeStr}</h3> */}
        <div>
          <h2 className="my-3">{data?.name}</h2>
          <img src={data?.background_image} alt="tour" />
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

export default HotelDetail;
