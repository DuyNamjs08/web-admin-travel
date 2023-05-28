import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./style.css";
import { dataHomepage } from "../../constant";
import ProgessBar from "../../components/progressbar/ProgessBar";
import ChartCol from "../../components/chart/ChartCol";
import { toast } from "react-toastify";
import { GetDashboard } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
function Homepage(props) {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const role = true;
  const [data, setData] = useState({});
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");

  const handleGetdata = async () => {
    try {
      await dispatch(GetDashboard({ token }))
        .unwrap()
        .then((res) => {
          console.log("res", res);
          setData(res);
        });
    } catch (error) {}
  };
  useEffect(() => {
    if (token) {
      handleGetdata();
    }
  }, [token, active]);
  return (
    <Container>
      <div>
        <h3 className="mb-3">Thống kê doanh số </h3>
        <div className="card__main">
          <div
            className="card__item"
            style={{ borderLeft: "5px solid #4e73df" }}
          >
            <div className="main">
              {/* <ProgessBar data={data?.resultObj?.totalPrice} /> */}
              <h4>
                <b>Total</b>: {data?.resultObj?.totalPrice || 0}
              </h4>
            </div>
            <div className="title">
              <h5>Tổng giá</h5>
            </div>
          </div>
          <div
            className="card__item"
            style={{ borderLeft: "5px solid #1cc88a" }}
          >
            <div className="main">
              {/* <ProgessBar data={data?.resultObj?.totalRegister} /> */}
              <h4>
                <b>Total</b>: {data?.resultObj?.totalRegister || 0}
              </h4>
            </div>
            <div className="title">
              <h5>Tổng đăng kí</h5>
            </div>
          </div>
          <div
            className="card__item"
            style={{ borderLeft: "5px solid #f6c23e " }}
          >
            <div className="main">
              {/* <ProgessBar data={data?.resultObj?.totalTour} /> */}
              <h4>
                <b>Total</b>: {data?.resultObj?.totalTour || 0}
              </h4>
            </div>
            <div className="title">
              <h5>Tổng tour</h5>
              
            </div>
          </div>
        </div>
      </div>
      <div className="section2">
        <div className="item1">
          {/* 1 */}
          <ChartCol />
        </div>
        <div className="item1">
          {/* 2 */}
          <ChartCol />
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  overflow-x: hidden !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100vw - 240px);
  .section2 {
    display: flex;
    align-items: center;
    margin-top: 20px;

    /* width: 100%; */
    width: calc(100vw - 240px);
    gap: 10px;
    overflow-x: hidden !important;
    .item1 {
      flex: 1;
      background: #fff;
    }
  }
  .card__main {
    display: flex;
    align-items: center;
    gap: 20px;
    .card__item {
      display: flex;
      gap: 30px;
      width: 360px;
      height: 200px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
      .main {
        flex: 2;
        display: flex;
        justify-content: center;
        /* align-items: center; */
        border-right: 1px solid #ccc;
        padding: 40px 10px 10px;
      }
      .title {
        flex: 1;
        padding: 40px 6px;
        h5 {
          height: 40px;
        }
      }
    }
  }
  padding: 40px 0;
  margin-left: 160px;
  margin-top: 76px;
  width: calc(100vw - 160px);
  z-index: 1;
  background: #eee;
`;

export default Homepage;
