import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import PropTypes from "prop-types";

import SoftInput from "components/SoftInput";
import SoftTypography from "components/SoftTypography";
import TransparentBlogCard from "examples/Cards/BlogCards/TransparentBlogCard";
import team1 from "assets/images/team-1.jpg";
import { Dialog, DialogActions, DialogContent, Grid, Paper } from "@mui/material";
import axios from "axios";
import { ADMIN_API } from "API";
import { toast } from "react-hot-toast";
import { VIEW } from "API";

const ViewBlog = ({ open, handleClose, data ,call}) => {
  const handleDelete = () => {
    toast.loading('Deleting...')

    axios.delete(`${ADMIN_API}/blog/${data?._id}`).then((res)=>{
        toast.remove()
        toast.success(res?.data?.message)
        call()
        handleClose()
    }).catch(e=>{
        toast.remove()
        toast.error(e?.response?.data?.message)
        console.log(e)
        handleClose()
    })
  };

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <SoftBox shadow="medium" variant="gradient">
          <DialogTitle display={"flex"} justifyContent={"end"}></DialogTitle>
          <DialogContent>
            <Grid container display={"flex"} justifyContent={"center"}>
              <Paper elevation={8} variant="elevation" sx={{ overflow: "hidden", height: "50vh" }}>
                <img src={VIEW + data?.image} height={"100%"} />
              </Paper>
            </Grid>
            <Grid p={3}>
              <SoftTypography sx={{textAlign:'center'}} textTransform="capitalize" variant="h3">
                {data?.title}
              </SoftTypography>
              <SoftTypography sx={{my:2}} variant="h6">{data?.description}</SoftTypography>
              <SoftTypography sx={{ marginT: 2 }} variant="body2">
                {data?.content}
              </SoftTypography>
            </Grid>
          </DialogContent>
          <DialogActions>
            <SoftButton onClick={handleDelete} size="small" variant="gradient" color="error">
              Delete Blog
            </SoftButton>
            <SoftButton onClick={handleClose} size="small" variant="gradient" color="dark">
              close
            </SoftButton>
          </DialogActions>
        </SoftBox>
      </Dialog>
    </div>
  );
};

ViewBlog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  call: PropTypes.func.isRequired,
  data: PropTypes.isRequired,
};

export default ViewBlog;
