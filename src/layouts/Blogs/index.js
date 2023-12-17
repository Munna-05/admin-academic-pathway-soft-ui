import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import homeDecor2 from "assets/images/home-decor-2.jpg";

import { Grid } from "@mui/material";
import SoftButton from "components/SoftButton";
import { AddNewBlog } from "./AddNewBlog";
import { useEffect, useState } from "react";
import axios from "axios";
import { ADMIN_API } from "API";
import { VIEW } from "API";
export const Blogs = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [call, setCall] = useState(false);


  useEffect(()=>{
    axios.get(`${ADMIN_API}/blog`).then((res)=>{
      console.log(res?.data)
      setData(res?.data)
    }).catch(e=>console.log(e))
  },[call])


  const handleOpenAddDialog = () => {
    console.log("called");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleCall = () => {
    setCall(!call);
  };
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Card>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h6">Blogs</SoftTypography>
                <SoftButton onClick={handleOpenAddDialog} variant='gradient' color='dark' size='small'>Create new Blog</SoftButton>
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
                <SoftBox p={4}>
                  <Grid container spacing={4}>
                   {data?.map((res,i)=> <Grid key={i} item xs={12} md={6} xl={3}>
                      <DefaultProjectCard
                        image={VIEW+res?.image}
                        // label="project #2"
                        title={res?.title}
                        description={res.content.split(" ").slice(0, 25).join(' ') + "..."}
                        action={{
                          type: "internal",
                          route: "/pages/profile/profile-overview",
                          color: "info",
                          label: "view service",
                        }}
                      />
                    </Grid>)}
                  </Grid>
                </SoftBox>
              </SoftBox>
            </Card>
          </SoftBox>
        </SoftBox>
        <AddNewBlog open={open} handleClose={handleClose} call={handleCall}/>
        <Footer />
      </DashboardLayout>
    </>
  );
};
