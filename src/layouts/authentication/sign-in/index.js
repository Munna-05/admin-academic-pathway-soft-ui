/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import axios from "axios";
import { Button, Grid, TextField } from "@mui/material";
import { toast } from "react-hot-toast";
import { API } from "API";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const token = localStorage.getItem('token')
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();


  useEffect(()=>{
    token ? navigate('/dashboard'):null
  },[token])
  
  const handleSubmit = () => {
    toast.loading("Logging...");
    const data = {
      email: email,
      password: password,
    };

    axios
      .post(`${API}/login`, data)
      .then((res) => {
        console.log("🚀 ~ file: LoginComponent.jsx:34 ~ .then ~ res:", res?.data?.user)
        if (res?.data?.user?.isAdmin) {
          console.log(res?.data?.user);
          localStorage.setItem("token", res?.data.token);
          localStorage.setItem("id", res?.data?.user?._id);
          toast.remove();
          toast.success("Login Success");
          navigate("/dashboard");
        } else {
          toast.remove();
          toast.error("Access Denied");
        }
      })
      .catch((e) => {
        console.log(e);
        toast.remove();
        toast.error(e?.response?.data?.message);
      });
  };

  return (
    <CoverLayout
      title="Welcome Admin"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          {/* <SoftInput component='input' type="email" placeholder="Email" />
           */}
           <TextField  sx={{width:"100%"}} placeholder="Email" value={email} type="email" required onChange={(e)=>setEmail(e.target.value)}/>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
             
            </SoftTypography>
          </SoftBox>
          {/* <SoftInput type="password" placeholder="Password" /> */}
          <TextField fullWidth placeholder="Password" value={password} type="password" required onChange={(e)=>setPassword(e.target.value)}/>

        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          {/* <Switch checked={rememberMe} onChange={handleSetRememberMe} /> */}
          {/* <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography> */}
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <Grid onClick={handleSubmit}>


          <SoftButton variant="gradient"  color="info" fullWidth>

            Sign in
          </SoftButton>
          </Grid>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          {/* <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography> */}
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
