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
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { Label } from "@mui/icons-material";
import { UPLOAD } from "API";
import { ADMIN_API } from "API";
import { IMAGE_KEY } from "API";
const AddNewJob = ({ open, handleClose, call }) => {
  const [title, setTitle] = useState();
  const [Description, setDescription] = useState();
  const [Company, setCompany] = useState("");
  const [image, setImage] = useState();
  const [type, setType] = useState("Full-time");
  const [location, setLocation] = useState("");
  const [exp, SetExp] = useState("Entry Level");
  const postedBy = localStorage.getItem("id");

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setType(e.target.value);
  };

  const handleSubmit = async () => {
    toast.loading("Listing new job ...");
    const data = {
      title: title,
      description: Description,
      company: Company,
      location: location,
      type: type,
      experienceLevel: exp,
      postedBy: postedBy,
    };
    console.log("🚀 ~ file: AddNewJob.js:45 ~ handleSubmit ~ data:", data);

    const formData = new FormData();
    formData.append("file", image);

    const pinataMetadata = JSON.stringify({
      name: "File name",
    });
    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append("pinataOptions", pinataOptions);

    await axios
      .post(UPLOAD, formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          // Add your authorization token here if needed
          Authorization: `Bearer ${IMAGE_KEY}`,
        },
      })
      .then((ipfsHash) => {
        data.icon = ipfsHash?.data?.IpfsHash;
        axios
          .post(`${ADMIN_API}/jobs`, data)
          .then((res) => {
            console.log(res.data);
            toast.remove();
            toast.success(res?.data?.message);
            call()
            handleClose()
            
          })
          .catch((e) => {
            console.log(e?.response?.data?.message);
            toast.remove();
            toast.error(e?.response?.data?.message);
          });
      })
      .catch((e) => {
        console.log(e?.response?.data);
        toast.remove();
        toast.error("Image Upload Failed");
      });
  };

  return (
    <div>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <SoftBox shadow="medium" variant="gradient">
          <DialogTitle>List New Job</DialogTitle>
          <DialogContent>
            <SoftBox spacing={2} gap={2}>
              <SoftInput
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Title"
              />
              <Grid mt={1}>
                <SoftInput
                  onChange={(e) => setCompany(e.target.value)}
                  value={Company}
                  placeholder="Company Name"
                />
              </Grid>
              <Grid mt={1}>
                <SoftInput
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  placeholder="Location"
                />
              </Grid>

              <Grid mt={1}>
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

              <Grid border={"none"} my={1}>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    sx={{ width: "100%", border: "none " }}
                    variant="filled"
                    fullWidth
                    onChange={(e) => handleInputChange(e)}
                    value={type}
                    placeholder="Select job type"
                  >
                    {["Full-time", "Part-time", "Contract", "Freelance", "Internship"]?.map(
                      (type) => (
                        <MenuItem key={type} name="type" value={type}>
                          {type}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    sx={{ width: "100%", border: "none " }}
                    variant="filled"
                    fullWidth
                    onChange={(e) => SetExp(e.target.value)}
                    value={exp}
                    placeholder="Select job type"
                  >
                    {["Entry Level", "Mid Level", "Senior Level"].map((type) => (
                      <MenuItem key={type} name="type" value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <SoftInput type="file" onChange={(e) => setImage(e.target.files[0])} />
              <SoftTypography variant="caption" color="primary">
                Upload company logo
              </SoftTypography>
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

AddNewJob.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  call: PropTypes.func.isRequired,
};

export default AddNewJob;
