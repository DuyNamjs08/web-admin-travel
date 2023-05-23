import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetBlogById, PutBlog, PostBlogImg } from "../../redux/authSlice";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import getSlug from "speakingurl";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "react-quill-image-uploader";
import ReactHtmlParser from "react-html-parser";

function PostDetails(props) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const role = true;
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const path = useLocation();
  const [valueSend, setValueSend] = useState({
    title: "",
    img_src: "tour",
    contents: "",
    listImg:''
  });

  const getDataDetails = async (value) => {
    try {
      await dispatch(GetBlogById(value))
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
  console.log("data", data);
  const handleClick = () => {
    setEdit(!edit);
  };
  const handleSubmit = async () => {
    if (!valueSend.title || !valueSend.img_src || !valueSend.contents || !valueSend.listImg) {
      return toast.warning("bạn cần điền đủ field");
    }
    setLoading(true);
    setEdit(!edit);
    // let slug = getSlug(value.trim());
    try {
      await dispatch(
        PostBlogImg({
          id: path.pathname.split("/")[2],
          img_src: valueSend.listImg,
          type: "blog",
          token,
        })
      );
      await dispatch(
        PutBlog({
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
  return (
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
            <div>
              <TextField
                className="my-2"
                sx={{ background: "#fff", minWidth: 300 }}
                size="small"
                id="outlined-basic"
                label="Tiêu đề"
                variant="outlined"
                value={valueSend.title}
                onChange={(e) =>
                  setValueSend({ ...valueSend, title: e.target.value })
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
                    img_src: e.target.files?.[0],
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
                  setValueSend({
                    ...valueSend,
                    listImg: e.target.files,
                  })
                }
              />
            </div>
            <div>
              <h4 className="my-3">Nội dung</h4>
              <div className="text__editor" style={{ background: "#fff" }}>
                <ReactQuill
                  // value={content}
                  // onChange={(value) => setContent(value)}
                  value={valueSend.contents}
                  onChange={(value) =>
                    setValueSend({ ...valueSend, contents: value })
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
          <h3 className="my-3">{data?.title}</h3>
          <img src={data?.img_src} alt="blog" />
          <h5 className="my-3">Nội dung</h5>
          {ReactHtmlParser(data?.contents)}
          <h6 className="my-3">Thời gian update : {data?.created_timeStr}</h6>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
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

export default PostDetails;
