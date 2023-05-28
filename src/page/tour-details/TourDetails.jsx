import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "react-quill-image-uploader";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  GetAddTourID,
  PutTours,
  GetAddress,
  PostTourImg,
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
function TourDetails(props) {
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
    url: "tour",
    price: "0",
    infor: "",
    intro: "",
    file: "",
    schedule: "",
    policy: "",
    note: "",
    isurance: "",
    tour_guide: "",
    listImg: "",
  });

  const getDataDetails = async (value) => {
    try {
      await dispatch(GetAddTourID(value))
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
    console.log('listImg' ,  Array.from(valueSend.listImg))
    console.log('file' , valueSend.file)
    if (
      !valueSend.category_id ||
      !valueSend.file ||
      !valueSend.infor ||
      !valueSend.intro ||
      !valueSend.name ||
      !valueSend.note ||
      !valueSend.policy ||
      !valueSend.price ||
      !valueSend.schedule ||
      !valueSend.url ||
      !valueSend.isurance ||
      !valueSend.tour_guide ||
      !valueSend.listImg
    ) {
      return toast.warning("bạn cần điền đủ field");
    }
    setLoading(true);
    setEdit(!edit);
    try {
      await dispatch(
        PostTourImg({
          id: path.pathname.split("/")[2],
          img_src: valueSend.listImg,
          type: "tour",
          token,
        })
      );
      await dispatch(
        PutTours({
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
              Sửa Blog
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
              <TextField
                className="my-2"
                sx={{ background: "#fff", minWidth: 300 }}
                size="small"
                id="outlined-basic"
                label="Giá"
                variant="outlined"
                value={valueSend.price}
                onChange={(e) =>
                  setValueSend({ ...valueSend, price: e.target.value })
                }
              />
            </div>
            <div>
              <h3>Chọn ảnh</h3>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setValueSend({ ...valueSend, file: e.target.files?.[0] })
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
            <div>
              <h4 className="my-3">Thông Tin</h4>
              <div className="text__editor" style={{ background: "#fff" }}>
                <ReactQuill
                  // value={content}
                  // onChange={(value) => setContent(value)}
                  value={valueSend.infor}
                  onChange={(value) =>
                    setValueSend({ ...valueSend, infor: value })
                  }
                  modules={modules}
                />
              </div>
            </div>
            <div>
              <h4 className="my-3">Giới Thiệu</h4>
              <div className="text__editor" style={{ background: "#fff" }}>
                <ReactQuill
                  // value={content}
                  // onChange={(value) => setContent(value)}
                  value={valueSend.intro}
                  onChange={(value) =>
                    setValueSend({ ...valueSend, intro: value })
                  }
                  modules={modules}
                />
              </div>
            </div>
            <div>
              <h4 className="my-3">Lịch trình</h4>
              <div className="text__editor" style={{ background: "#fff" }}>
                <ReactQuill
                  // value={content}
                  // onChange={(value) => setContent(value)}
                  value={valueSend.schedule}
                  onChange={(value) =>
                    setValueSend({ ...valueSend, schedule: value })
                  }
                  modules={modules}
                />
              </div>
            </div>
            <div>
              <h4 className="my-3">Chính sách</h4>
              <div className="text__editor" style={{ background: "#fff" }}>
                <ReactQuill
                  // value={content}
                  // onChange={(value) => setContent(value)}
                  value={valueSend.policy}
                  onChange={(value) =>
                    setValueSend({ ...valueSend, policy: value })
                  }
                  modules={modules}
                />
              </div>
            </div>
            <div>
              <h4 className="my-3">Lưu ý</h4>
              <div className="text__editor" style={{ background: "#fff" }}>
                <ReactQuill
                  // value={content}
                  // onChange={(value) => setContent(value)}
                  value={valueSend.note}
                  onChange={(value) =>
                    setValueSend({ ...valueSend, note: value })
                  }
                  modules={modules}
                />
              </div>
            </div>
            <div>
              <h4 className="my-3">Bảo hiểm</h4>
              <div className="text__editor" style={{ background: "#fff" }}>
                <ReactQuill
                  // value={content}
                  // onChange={(value) => setContent(value)}
                  value={valueSend.isurance}
                  onChange={(value) =>
                    setValueSend({ ...valueSend, isurance: value })
                  }
                  modules={modules}
                />
              </div>
            </div>
            <div>
              <h4 className="my-3">Hướng dẫn viên</h4>
              <div className="text__editor" style={{ background: "#fff" }}>
                <ReactQuill
                  // value={content}
                  // onChange={(value) => setContent(value)}
                  value={valueSend.tour_guide}
                  onChange={(value) =>
                    setValueSend({ ...valueSend, tour_guide: value })
                  }
                  modules={modules}
                />
              </div>
            </div>
          </div>
        ) : null}
        {/* <h3>Tên địa điểm:{data[0]?.resultObj.name}</h3>
        <h3>Ngày tạo:{data[0]?.resultObj.updated_timeStr}</h3> */}
        <div>
          <h2 className="my-3">{data?.name}</h2>
          <img src={data?.background_image} alt="tour" />
          <h5 className="my-3">Thông tin</h5>
          <p> {ReactHtmlParser(data?.infor)}</p>
          <h5 className="my-3">Giới thiệu</h5>
          <p> {ReactHtmlParser(data?.intro)}</p>
          <h5 className="my-3">Giá {data?.price}</h5>
          <h5 className="my-3">Chính sách</h5>
          <p> {ReactHtmlParser(data?.policy)}</p>
          <h5 className="my-3">Lịch trình</h5>
          <p> {ReactHtmlParser(data?.schedule)}</p>
          <h5 className="my-3">Chú ý</h5>
          <p> {ReactHtmlParser(data?.note)}</p>
          <h5 className="my-3">Bảo hiểm</h5>
          <p> {ReactHtmlParser(data?.isurance)}</p>
          <h5 className="my-3">Hướng dẫn viên</h5>
          <p> {ReactHtmlParser(data?.tour_guide)}</p>
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

export default TourDetails;
