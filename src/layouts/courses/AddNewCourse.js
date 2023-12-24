import React, { useState } from "react";
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
import { Dialog, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { Label } from "@mui/icons-material";
import { UPLOAD } from "API";
import { ADMIN_API } from "API";
import PropTypes from "prop-types";

const AddNewCourse = ({ open, handleClose, call }) => {
  const [courseType, setCourseType] = useState("UG");
  const [Description, setDescription] = useState("");
  const [Name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [Duration, setDuration] = useState("");

  const handleSubmit = () => {
    toast.loading("Listing new course ...")
    const data = {
      Name,
      Description,
      Duration,
      courseType,
      country
    };
    console.log("🚀 ~ file: AddNewCourse.js:31 ~ handleSubmit ~ data:", data)

    axios.post(`${ADMIN_API}/courses`,data).then((res)=>{
      console.log(res.data)
      toast.remove()
      toast.success("Course listed successfully ...")
      setName('')
      setDescription('')

      setDuration()
      setCourseType('UG')
      handleClose()
      call()
    }).catch(e=>{
      console.log(e?.response?.data?.message)
      toast.remove()
      toast.error(e?.response?.data?.message)
    })
  };

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <SoftBox shadow="medium" variant="gradient">
          <DialogTitle>List New Course</DialogTitle>
          <DialogContent>
            <SoftBox spacing={2} gap={2}>
              <Grid p={1}>
                <SoftInput placeholder="Course Name" onChange={(e)=>setName(e.target.value)} />
              </Grid>

              <Grid p={1}>
                <SoftInput type="number" placeholder="Course Duration in years" onChange={(e)=>setDuration(e.target.value)} />
              </Grid>
              <Grid p={1}>
                <SoftInput type="text" placeholder="Country name" onChange={(e)=>setCountry(e.target.value)} />
              </Grid>
              <Grid p={1}>
                <FormControl variant="filled" fullWidth>
                  <Select
                    variant="filled"
                    sx={{ border: "none" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={courseType}
                    label="Course Type"
                    onChange={(e) => setCourseType(e.target.value)}
                  >
                    <MenuItem value={"UG"}>UG</MenuItem>
                    <MenuItem value={"PG"}>PG</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid p={1}>
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
                  placeholder="Descriptions.."
                  onChange={(e) => setDescription(e.target.value)}
                  value={Description}
                />
              </Grid>
            </SoftBox>
          </DialogContent>
          <DialogActions>
            <SoftButton onClick={handleClose} size="small" variant="gradient" color="error">
              Cancel
            </SoftButton>
            <SoftButton size="small" onClick={handleSubmit} variant="gradient" color="info">
              Create
            </SoftButton>
          </DialogActions>
        </SoftBox>
      </Dialog>
    </div>
  );
};

AddNewCourse.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  call: PropTypes.func.isRequired,
};

export default AddNewCourse;
