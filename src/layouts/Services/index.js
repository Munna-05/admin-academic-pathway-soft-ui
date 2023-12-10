import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import homeDecor1 from "assets/images/home-decor-1.jpg";
import Table from "examples/Tables/Table";
import DefaultBlogCard from "examples/Cards/BlogCards/DefaultBlogCard";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { Grid } from "@mui/material";
import SoftButton from "components/SoftButton";
import React, { useEffect, useState } from "react";
import NewServiceDialog from "./NewServiceForm";
import { ViewService } from "./ViewService";
import axios from "axios";
import { ADMIN_API } from "API";

export const Services = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [call, setCall] = useState(false);

  useEffect(() => {
    axios
      .get(`${ADMIN_API}/services`)
      .then((res) => {
        console.log(res.data);
        setData(res?.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [call]);

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

  const [openServiceView, setOpenServieView] = useState(false);
  const [selectedService, setSelectedService] = useState();
  const handleOpenServiceView = (data) => {
    console.log("🚀 ~ file: index.js:40 ~ handleOpenServiceView ~ data:", data);
    setOpenServieView(!openServiceView);
    setSelectedService(data);
  };
  const handleCloseServiceView = () => {
    setOpenServieView(!openServiceView);
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Card>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h6">Services</SoftTypography>
                <SoftButton
                  variant="gradient"
                  onClick={handleOpenAddDialog}
                  color="dark"
                  size="small"
                >
                  Create New Services
                </SoftButton>
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
                    {data?.map((res, i) => (
                      <Grid key={i} item xs={12} md={6} xl={3}>
                        <Grid key={i} onClick={() => handleOpenServiceView(res)}>
                          <DefaultProjectCard
                            key={i}
                            image={homeDecor1}
                            // label=""
                            title={res?.title}
                            description={res?.description.split(" ").slice(0, 25) + "..."}
                            action={{
                              type: "internal",
                              // route: "/pages/profile/profile-overview",
                              color: "info",
                              label: "view service",
                            }}
                          />
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </SoftBox>
              </SoftBox>
            </Card>
          </SoftBox>
        </SoftBox>
        <Footer />
        <NewServiceDialog call={handleCall} open={open} handleClose={handleClose} />
        <ViewService
          open={openServiceView}
          handleClose={handleCloseServiceView}
          data={selectedService}
          call={handleCall}
        />
      </DashboardLayout>
    </>
  );
};
