

// @mui material components
import Card from "@mui/material/Card";
import { ADMIN_API } from "API";
import axios from "axios";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";
import { useEffect, useState } from "react";

function BillingInformation() {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`${ADMIN_API}/get-all-enquires`)
      .then((res) => {
        console.log(res.data);
        setData(res?.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Card id="delete-account">
      <SoftBox pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium">
          Billing Information
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={1} pb={2} px={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
         {data?.map((res,i)=> <Bill
            name={res?.name}
            key={i}
            Phone={res?.phone}
            email={res?.email}
            enquiry={res?.message}
          />)}
          
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default BillingInformation;
