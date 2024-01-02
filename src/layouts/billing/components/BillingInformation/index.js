

// @mui material components
import Card from "@mui/material/Card";
import { ADMIN_API } from "API";
import axios from "axios";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";
import React, { useEffect, useState } from "react";
import ReplyBox from "./ReplayBox";

function BillingInformation() {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [selected,setSelected] = useState()
  const [call ,setCall] = useState(false)

  const handleClickOpen = (id) => {
    setOpen(true);
    setSelected(id)
  };

  const handleClose = () => {
    setOpen(false);
  }

  const handleCall = () => setCall(!call)


  useEffect(() => {
    axios
      .get(`${ADMIN_API}/get-all-enquires`)
      .then((res) => {
        setData(res?.data);
      })
      .catch((e) => console.log(e));
  }, [call]);

  return (
    <Card id="delete-account">
      <SoftBox pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium">
          Enquiries 
        </SoftTypography>
       
      </SoftBox>
      <SoftBox pt={1} pb={2} px={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
         {data?.map((res,i)=> {
          if(!res?.reply){
           return <Bill
            name={res?.name}
            key={i}
            Phone={res?.phone}
            email={res?.email}
            enquiry={res?.message}
            handleClickOpen={() => handleClickOpen(res?._id)}
          />
          }
         })}
          
        </SoftBox>
      </SoftBox>
      <ReplyBox open={open} handleClose={handleClose} call={handleCall} id={selected} />
    </Card>


  );
}

export default BillingInformation;
