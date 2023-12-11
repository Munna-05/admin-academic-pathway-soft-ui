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
import { toast } from "react-hot-toast";
import axios from "axios";
import { ADMIN_API } from "API";

function NewServiceDialog({ open, handleClose ,call}) {
  const [title, setTitle] = useState();
  const [desc,setDesc] = useState("")
  const handleSubmit = () => {
    toast.loading('Adding new Service ....')
    console.log(desc)
    if(desc?.split(" ").length < 100){
      toast.remove()
      toast.error('Description must be greater than 100 words')
    }else{
      const data ={
        title:title,
        description:desc,
        createdBy:localStorage.getItem('id')
      }
      console.log("🚀 ~ file: NewServiceForm.js:28 ~ handleSubmit ~ data:", data)
      axios.post(`${ADMIN_API}/services`,data).then((res)=>{
        console.log(res?.data?.data)
        toast.remove()
        toast.success(res?.data?.message)
        setDesc('')
        setTitle('')
        call()
        handleClose()
      }).catch(e=>{
        console.log(e)
        toast.remove()
        toast.error(e?.response?.data?.message)
        handleClose()
      })
    }
  };
  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <SoftBox shadow="medium" variant="gradient">
          <DialogTitle>Create New Service</DialogTitle>
          <DialogContent>
            <SoftBox spacing={2} gap={2}>
              <SoftInput
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Title"
              />
              <textarea
                style={{
                  marginTop: 10,
                  width: "100%",
                  padding: 10,
                  borderRadius: 10,
                  borderColor: "#dbd9d9",
                  fontFamily: "inherit",
                  outline: "none",
                  "::placeholder": {
                    color: "#ededeb",
                  },
                }}
                rows={10}
                placeholder="Description about service.."
                onChange={(e)=>setDesc(e.target.value)}
                value={desc}
              />
              <SoftInput type="file" />
              <SoftTypography variant="caption" color="primary">
                Upload a cover photo
              </SoftTypography>
            </SoftBox>
          </DialogContent>
          <DialogActions>
            <SoftButton onClick={handleClose} size="small" variant="gradient" color="error">
              Cancel
            </SoftButton>
            <SoftButton onClick={handleSubmit} size="small" variant="gradient" color="info">
              Create
            </SoftButton>
          </DialogActions>
        </SoftBox>
      </Dialog>
    </>
  );
}

NewServiceDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  call:PropTypes.func.isRequired
};

export default NewServiceDialog;