import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import TransparentBlogCard from "examples/Cards/BlogCards/TransparentBlogCard";
import team1 from "assets/images/team-1.jpg";
import { Grid } from "@mui/material";
import axios from "axios";
import { ADMIN_API } from "API";
import { toast } from "react-hot-toast";

export const ViewService = ({ open, handleClose, data,call }) => {
    const handleDelete =()=>{
        toast.loading("Deleting Service ...")
        axios.delete(`${ADMIN_API}/services/${data?._id}`).then((res)=>{
            toast.remove()
            res ? toast.success(res?.data?.message):null
            call()
            handleClose()
        }).catch(e=>{
            toast.remove()
            toast.error(e?.response?.data?.message)
        })
    }
  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <SoftBox shadow="medium" variant="gradient">
          <DialogTitle display={"flex"} justifyContent={"end"}></DialogTitle>
          <DialogContent>
            <SoftTypography textTransform="capitalize" variant="h3">
              {data?.title}
            </SoftTypography>
            <SoftTypography variant="body2">{data?.description}</SoftTypography>
          </DialogContent>
          <DialogActions>
            <SoftButton onClick={handleDelete} size="small" variant="gradient" color="error">
              Delete Service
            </SoftButton>
            <SoftButton onClick={handleClose} size="small" variant="gradient" color="dark">
              close
            </SoftButton>
          </DialogActions>
        </SoftBox>
      </Dialog>
    </>
  );
};

ViewService.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  call: PropTypes.func.isRequired,
  data: PropTypes.isRequired,
};
