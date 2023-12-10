import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import PropTypes from 'prop-types';

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import { useEffect, useState } from "react";
import axios from "axios";
import { ADMIN_API } from "API";

import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import moment from "moment";

function Author({ image, name, email }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar src={image} alt={name} size="sm" variant="rounded" />
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

// function Function({ job, org }) {
//   return (
//     <SoftBox display="flex" flexDirection="column">
//       <SoftTypography variant="caption" fontWeight="medium" color="text">
//         {job}
//       </SoftTypography>
//       <SoftTypography variant="caption" color="secondary">
//         {org}
//       </SoftTypography>
//     </SoftBox>
//   );
// }

function Users() {
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;
  const [users, setUsers] = useState();

  useEffect(() => {
    axios
      .get(`${ADMIN_API}/get-all-users`)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const columns2 = [
    { name: "name", align: "left" },
    // { name: "email", align: "left" },
    { name: "status", align: "center" },
    { name: "phone", align: "center" },
    { name: "Joined", align: "center" },
    { name: "action", align: "center" },
  ]

   const rows2 = users?.map((res)=>{
    return ({
      name: <Author image={team2} name={res?.name} email={res?.email} />,
      // function: <Function job="Manager" org="Organization" />,
      status: (
        <SoftBadge variant="gradient" badgeContent={res?.isAdmin?"Admin":"Not Admin"} color={res?.isAdmin?"success":"error"} size="xs" container />
      ),
      phone: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
         {res?.phone}
        </SoftTypography>
      ),
      Joined: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
         {moment(res?.createdAt).format('lll')}
        </SoftTypography>
      ),
      action: (
        <SoftTypography
          component="a"
          href="#"
          variant="caption"
          color="secondary"
          fontWeight="medium"
        >
          Edit
        </SoftTypography>
      ),
    })
   })
  
  
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Card>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h6">Users table</SoftTypography>
              </SoftBox>
              <SoftBox
                sx={{
                  "& .MuiTableRow-root:not(:last-child)": {
                    "& td": {
                      borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                        `${borderWidth[1]} solid ${borderColor}`,
                    },
                  },
                }}
              >
                <Table columns={columns2} rows={rows2} />
              </SoftBox>
            </Card>
          </SoftBox>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    </>
  );
}

Author.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Users;


