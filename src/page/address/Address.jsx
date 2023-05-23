import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CustomGrid from "../../components/grid/CustomGrid";
import { Link } from "react-router-dom";
import { GetAddress, DeleteAddress, PostAddress } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import getSlug from "speakingurl";

function Address(props) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const role = true;
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");

  const columns = [
    { index: 1, field: "id", headerName: "ID", width: 90, align: "center" },
    {
      index: 2,
      field: "name",
      headerName: "Tên địa điểm",
      width: 150,
      editable: true,
      headerAlign: "center",
    },
    {
      index: 4,
      field: "created_timeStr",
      headerName: "Ngày đăng kí",
      width: 160,
      editable: true,
      headerAlign: "center",
    },
    {
      index: 100,
      field: "action",
      headerName: "Action",
      width: 300,
      editable: true,
      headerAlign: "center",
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
  const handleGetdata = async () => {
    try {
      await dispatch(GetAddress({ token }))
        .unwrap()
        .then((res) => {
          setData(res?.data);
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
    if (!value) {
      return toast.warning("bạn cần điền đủ field");
    }
    setLoading(true);
    setEdit(!edit);
    let slug = getSlug(value.trim());
    try {
      await dispatch(
        PostAddress({
          name: value,
          url: "/" + slug,
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
        DeleteAddress({
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

  return (
    <Container>
      <div>
        <h3>Danh sách Địa điểm</h3>
        {role ? (
          !edit ? (
            <Button className="my-3" variant="contained" onClick={handleClick}>
              Thêm dịch vụ
            </Button>
          ) : (
            <Button className="my-3" variant="contained" onClick={handleSubmit}>
              submit
            </Button>
          )
        ) : (
          ""
        )}
        {edit ? (
          <div className="mb-4">
            <TextField
              sx={{ background: "#fff" }}
              id="outlined-basic"
              label="Edit Name"
              variant="outlined"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        ) : null}
        <div className="grid__main">
          <CustomGrid data={data} changeCols={columns} path={"address"} />
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

export default Address;
