import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FetchLogin } from "../../redux/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import backgroundImg from "../../assets/img/logo.jpg";
// import lefttt from "../../assets/bac si.svg";
import Logo from "../../assets/img/logomain.jpg";

const StyleContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background: url(${backgroundImg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
const StyleOutLine = styled.div`
  flex: 3;
  margin-left: 40px;
`;
const StyleForm = styled.form`
  label {
    font-size: 16px;
    font-weight: 550;
  }
  input {
    padding: 8px;
    outline: none;
    border: none;
    border-radius: 6px;
    &:focus {
      border-bottom: 1px solid #537188;
      border-bottom-left-radius: 0%;
      border-bottom-right-radius: 0%;
    }
  }
  .logo {
    display: flex;
    justify-content: center;
    img {
      height: 100px;
    }
  }
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 80px 60px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  background: #fff;
  border-radius: 10px;
`;
const StyleLink = styled.div`
  &:hover {
    color: blue;
  }
`;
function Login(props) {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().min(6).max(32).required(),
  });
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = async (data) => {
    console.log("data", { data });
    await dispatch(FetchLogin(data))
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.statusCode === 200) {
          const obj = JSON.parse(res.resultObj);
          console.log("obj", obj);
          localStorage.setItem("token", obj?.access_token);
          localStorage.setItem("idUser", JSON.stringify(obj?.userId));
          localStorage.setItem("role", JSON.stringify(obj?.privileges));
          toast.success("Đăng nhập thành công!");
          navigate("/");
        } else {
          toast.error(res.payload?.msg, " !");
        }
      });
    reset();
  };

  return (
    <StyleContainer>
      <StyleOutLine>{/* <img src={lefttt} alt="" /> */}</StyleOutLine>
      <StyleForm onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <h1 className="h3 mb-3 font-weight-normal text-center">Sign in</h1>
        <label className="sr-only">Username</label>
        <input
          {...register("username")}
          placeholder="username"
          type="text"
          required
        />
        <p style={{ color: "red" }}>{errors.username?.message}</p>
        <label className="sr-only">Password</label>
        <input
          {...register("password")}
          placeholder="password"
          type="password"
          required
        />
        <p style={{ color: "red" }}>{errors.password?.message}</p>
        <div className="checkbox my-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
        {/* <div>
          <Link className="text-black text-decoration-none" to="/register">
            <StyleLink>Are you'nt account</StyleLink>
          </Link>
        </div> */}
      </StyleForm>
    </StyleContainer>
  );
}

export default Login;
