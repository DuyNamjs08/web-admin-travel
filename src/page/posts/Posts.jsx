import styled from "styled-components";
import img1 from "../../assets/img/1.jpeg";
import img2 from "../../assets/img/2.jpg";
import img3 from "../../assets/img/3.jpg";
import img4 from "../../assets/img/4.jpeg";
import img5 from "../../assets/img/5.jpeg";
import TruncatedText from "../../components/truncated-text/TruncatedText";
import React, { useState, useEffect } from "react";
import CustomGrid from "../../components/grid/CustomGrid";
import { Link } from "react-router-dom";
import {
  Getblog,
  DeleteBlog,
  PostBlog,
  PostBlogImg,
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

function Posts(props) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const role = true;
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const [dataCategory, setDataCategory] = useState([]);
  const [valueSend, setValueSend] = useState({
    title: "",
    img_src: "tour",
    contents: "",
    listImg:''
  });

  const handleGetdata = async () => {
    setLoading(true);
    try {
      await dispatch(Getblog({ token }))
        .unwrap()
        .then((res) => {
          console.log("res", res.data);
          setData(res?.data);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      handleGetdata();
    }
  }, [token, active]);
  const hanldeDelete = async (id) => {
    try {
      await dispatch(DeleteBlog({ token, id }));
      setActive(!active);
    } catch (error) {
      console.log(error);
      setActive(!active);
    }
  };
  const handleClick = () => {
    setEdit(!edit);
  };
  const handleSubmit = async () => {
    if (!valueSend.title || !valueSend.img_src || !valueSend.contents) {
      return toast.warning("bạn cần điền đủ field");
    }
    setLoading(true);
    setEdit(!edit);
    // let slug = getSlug(value.trim());
    try {
      await dispatch(
        PostBlogImg({
          id: 0,
          img_src: valueSend.listImg,
          type: "blog",
          token,
        })
      );
      await dispatch(
        PostBlog({
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
      field: "title",
      headerName: "Tên địa điểm",
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
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h3>Danh sách bài viết</h3>
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
          <div className="grid__main">
            <CustomGrid
              data={data}
              changeCols={columns}
              path={"posts"}
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
  .main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    .post {
      border: 1px solid #ccc;
      padding: 20px;
      border-radius: 8px;
      background: #fff;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      .item1 {
        flex: 1;
      }
      .item2 {
        flex: 1;
        img {
          height: 240px;
          width: 240px;
          border-radius: 6px;
          object-fit: cover;
        }
      }
    }
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
const StyleButton = styled.button`
  outline: none;
  border: none;
  background: #0c134f;
  color: #fff;
  padding: 4px 10px;
  border-radius: 4px;
  transition: all ease-in-out 0.3s;
  &:hover {
    background: #0a4d68;
  }
`;
const StyleButton2 = styled.button`
  outline: none;
  border: none;
  background: #e76161;
  color: #fff;
  padding: 4px 10px;
  border-radius: 4px;
  transition: all ease-in-out 0.3s;
  &:hover {
    background: #e48f8f;
  }
`;

export default Posts;
