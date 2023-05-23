import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CustomGrid from "../../components/grid/CustomGrid";
import { Link } from "react-router-dom";
import {
  Gettour,
  GetCmtTour,
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

function Comments(props) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const role = true;
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const [dataCmt, setDataCmt] = useState([]);

  const columns = [
    { index: 1, field: "id", headerName: "ID", width: 90, align: "left" },
    {
      index: 2,
      field: "name",
      headerName: "Tour",
      width: 150,
      editable: true,
      headerAlign: "left",
    },
    {
      index: 4,
      field: "created_timeStr",
      headerName: "Ngày Tạo",
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
            {/* <Link to={`${row.row.id}`}>
              <button className="btn btn-primary">View</button>
            </Link> */}
            <button
              onClick={() => hanldeDelete(row.row.id)}
              className="btn btn-danger"
            >
              Xem
            </button>
          </div>
        );
      },
    },
  ];
  const columns1 = [
    { index: 1, field: "id", headerName: "ID", width: 90, align: "left" },
    {
      index: 2,
      field: "content",
      headerName: "Nội dung comment",
      width: 150,
      editable: true,
      headerAlign: "left",
    },
    {
      index: 4,
      field: "created_timeStr",
      headerName: "Ngày Tạo",
      width: 160,
      editable: true,
      headerAlign: "left",
    },
    // {
    //   index: 100,
    //   field: "action",
    //   headerName: "Action",
    //   width: 300,
    //   editable: true,
    //   headerAlign: "left",
    //   renderCell: (row) => {
    //     // console.log("row",row.row)
    //     return (
    //       <div style={{ display: "flex", gap: "10px" }}>
    //         {/* <Link to={`${row.row.id}`}>
    //           <button className="btn btn-primary">View</button>
    //         </Link> */}
    //         {/* <button
    //           onClick={() => hanldeDelete(row.row.id)}
    //           className="btn btn-danger"
    //         >
    //           Delete
    //         </button> */}
    //       </div>
    //     );
    //   },
    // },
  ];
  const handleGetdata = async () => {
    try {
      await dispatch(Gettour({ token }))
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
  const hanldeDelete = async (url) => {
    console.log("url", url);
    setLoading(true);
    try {
      await dispatch(
        GetCmtTour({
          id: url,
          token,
        })
      ).unwrap().then((res) => {
        console.log('res' , res)
        setDataCmt(res.resultObj)
        setLoading(false);
        setActive(!active);
      });
    } catch (error) {
      setLoading(false);
      setActive(!active);
    }
  };
  return (
    <Container>
      <div>
        <h3>Danh sách comments </h3>
        <div className="grid__main">
          <CustomGrid path="comments" data={data} changeCols={columns} />
          <div className="my-2"></div>
          <CustomGrid path="comments" data={dataCmt} changeCols={columns1} />
        </div>
      </div>
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

export default Comments;
