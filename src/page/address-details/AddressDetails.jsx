import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetAddressById , PutAddress } from "../../redux/authSlice";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import getSlug from "speakingurl";

function AddressDetails(props) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const role = true;
  const [data, setData] = useState([]);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");
  const path = useLocation();

  const getDataDetails = async (value) => {
    try {
      await dispatch(GetAddressById(value))
        .unwrap()
        .then((res) => {
          console.log(res);
          setData([{ ...res }]);
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
    if (!value) {
      return toast.warning("bạn cần điền đủ field");
    }
    setLoading(true);
    setEdit(!edit);
    let slug = getSlug(value.trim());
    try {
      await dispatch(
        PutAddress({
          id:path.pathname.split("/")[2],
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
  return (
    <Container>
      <div>
      {role ? (
          !edit ? (
            <Button className="my-3" variant="contained" onClick={handleClick}>
              Sửa địa chỉ
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
        <h3>Tên địa điểm:{data[0]?.resultObj.name}</h3>
        <h3>Ngày tạo:{data[0]?.resultObj.updated_timeStr}</h3>
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

export default AddressDetails;
