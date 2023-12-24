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
import { useEffect, useState } from "react";
import axios from "axios";
import { ADMIN_API } from "API";
import { VIEW } from "API";
import AddNewCourse from "./AddNewCourse";
export const Courses = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [call, setCall] = useState(false);

  useEffect(() => {
    axios
      .get(`${ADMIN_API}/courses`)
      .then((res) => {
        console.log(res?.data);
        setData(res?.data);
      })
      .catch((e) => console.log(e));
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

  const [openBlogView, setOpenBlogView] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState();
  const handleOpenBlogView = (data) => {
    console.log("🚀 ~ file: index.js:40 handle open blog ~ data:", data);
    setOpenBlogView(!openBlogView);
    setSelectedBlog(data);
  };
  const handleCloseBlogView = () => {
    setOpenBlogView(!openBlogView);
  };
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Card>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h6">Courses</SoftTypography>
                <SoftButton
                  onClick={handleOpenAddDialog}
                  variant="gradient"
                  color="dark"
                  size="small"
                >
                  Create new Course
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
                  
                     {data?.map((res,i)=> <Grid key={i} item lg={4}>
                          <SoftBox
                            variant="gradient"
                            overflow="hidden"
                            shadow="md"
                            borderRadius="md"
                            bgColor="light"
                            
                          >
                            <SoftBox p={2}>
                              <SoftTypography fontSize="18px" fontWeight="medium">
                                {res?.name}
                              </SoftTypography>
                              <SoftTypography height={'4vh'}  fontSize="14px" fontWeight="regular">
                                {res?.description?.slice(0,150)+"..."}
                              </SoftTypography>
                              <SoftTypography fontSize="14px" fontWeight="light">
                                {/* {res?.location} */}
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
                                {res?.duration} years
                              </SoftTypography>
                              <SoftTypography fontSize="12px" color="light">
                                {res?.level}
                              </SoftTypography>
                            </SoftBox>
                          </SoftBox>
                        </Grid>)}
                
                  </Grid>
                </SoftBox>
              </SoftBox>
            </Card>
          </SoftBox>
        </SoftBox>
                          <AddNewCourse open={open} handleClose={handleClose} call={handleCall} />
        <Footer />
      </DashboardLayout>
    </>
  );
};
