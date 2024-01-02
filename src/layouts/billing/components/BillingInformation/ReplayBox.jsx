import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from "prop-types";
import axios from 'axios';
import { toast } from 'react-hot-toast';


export default function ReplyBox({open,handleClose,id,call}) {
    const [reply,setReply] = React.useState()
    const handleSend=()=>{
        toast.loading('Sending reply...')
        axios.post(`${process.env.REACT_APP_ADMIN_API}/reply/${id}`,{reply:reply}).then((res)=>{
            console.log(res?.data)
            toast.remove()
            toast.success(res.data.message)
            call()
            handleClose()
        }).catch(e=>{
            console.log(e)
            toast.remove('Failed sending reply , try again')
        })
    }


  

  return (
    <React.Fragment>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write reply for this enquiry
          </DialogContentText>
          <textarea
            autoFocus
            id="name"
            label="Email Address"
            type="email"
            rows={12}
            onChange={(e)=>setReply(e.target.value)}
            placeholder='write ....'
            style={{width:"100%",outline:"none",padding:'10px',marginTop:10}}            
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSend}>Send</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
  }

  ReplyBox.propTypes = {
    open: PropTypes.bool.isRequired,
   id:PropTypes.isRequired,
    handleClose :PropTypes.isRequired,
    call:PropTypes.isRequired
  };