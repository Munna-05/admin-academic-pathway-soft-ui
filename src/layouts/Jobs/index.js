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
import Bill from "layouts/billing/components/Bill";
import SoftButton from "components/SoftButton";
import { useEffect, useState } from "react";
import AddNewJob from "./AddNewJob";
import axios from "axios";
import { ADMIN_API } from "API";

export const Jobs = () => {
  const [openForm, setOpenForm] = useState(false);
  const [Call, setCall] = useState(false);
  const [data, setData] = useState();

  const handleCloseForm = () => {
    setOpenForm(!openForm);
  };

  const handleCall = () => setCall(!Call);

  useEffect(() => {
    axios
      .get(`${ADMIN_API}/jobs`)
      .then((res) => {
        console.log(res?.data);
        setData(res?.data);
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
      });
  }, [Call]);

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Card>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h6">Jobs</SoftTypography>
                <SoftButton
                  size="small"
                  variant="gradient"
                  color="dark"
                  onClick={() => setOpenForm(!openForm)}
                >
                  Create New Job
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
                    <Grid p={2} container spacing={2} lg={12}>
                      {data?.map((res, i) => (
                        <Grid key={i} item lg={4}>
                          <SoftBox
                            variant="gradient"
                            overflow="hidden"
                            shadow="md"
                            borderRadius="md"
                            bgColor="light"
                          >
                            <SoftBox p={2}>
                              <SoftTypography fontSize="18px" fontWeight="medium">
                                {res?.title}
                              </SoftTypography>
                              <SoftTypography fontSize="14px" fontWeight="regular">
                                {res?.company}
                              </SoftTypography>
                              <SoftTypography fontSize="14px" fontWeight="light">
                                {res?.location}
                              </SoftTypography>
                            </SoftBox>
                            <SoftBox
                              variant="gradient"
                              bgColor="dark"
                              color="light"
                              p={1}
                              mt={4}
                              display={"flex"}
                              justifyContent={"space-between"}
                            >
                              <SoftTypography fontSize="12px" color="light">
                                {res?.experienceLevel}
                              </SoftTypography>
                              <SoftTypography fontSize="12px" color="light">
                                {res?.type}
                              </SoftTypography>
                            </SoftBox>
                          </SoftBox>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </SoftBox>
              </SoftBox>
            </Card>
          </SoftBox>
        </SoftBox>
        <Footer />
        <AddNewJob open={openForm} handleClose={handleCloseForm} call={handleCall} />
      </DashboardLayout>
    </>
  );
};
