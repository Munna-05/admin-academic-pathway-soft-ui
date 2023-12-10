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

export const Services = () => {
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Card>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h6">Services</SoftTypography>
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
                  <Grid container  spacing={4}>
                    <Grid  item xs={12} md={6} xl={3}>
                      <DefaultProjectCard
                        image={homeDecor1}
                        label="project #2"
                        title="modern"
                        description="As Uber works through a huge amount of internal management turmoil."
                        action={{
                          type: "internal",
                          route: "/pages/profile/profile-overview",
                          color: "info",
                          label: "view service",
                        }}
                      />
                    </Grid>

                   
                  </Grid>
                </SoftBox>
              </SoftBox>
            </Card>
          </SoftBox>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    </>
  );
};
