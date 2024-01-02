import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function DeleteBox({ open, handleClose, id, call }) {
  const [reply, setReply] = React.useState();
  const handleDelete = () => {
    toast.loading("Sending reply...");
    axios
      .delete(`${process.env.REACT_APP_ADMIN_API}/enquiry/${id}`)
      .then((res) => {
        console.log(res?.data);
        toast.remove();
        toast.success(res.data.message);
        call();
        handleClose();
      })
      .catch((e) => {
        console.log(e);
        toast.remove("Failed sending reply , try again");
      });
  };

  return (
    <React.Fragment>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure want to Delete this enquiry ?</DialogContentText>
          <textarea
            autoFocus
            id="name"
            label="Email Address"
            type="email"
            rows={12}
            onChange={(e) => setReply(e.target.value)}
            placeholder="write ...."
            style={{ width: "100%", outline: "none", padding: "10px", marginTop: 10 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

DeleteBox.propTypes = {
  open: PropTypes.bool.isRequired,
  id: PropTypes.isRequired,
  handleClose: PropTypes.isRequired,
  call: PropTypes.isRequired,
};
