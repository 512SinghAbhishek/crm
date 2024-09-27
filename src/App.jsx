import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../src/Layout"; // Assuming Layout is in this path
import Home from "./pages/Home";
import Logout from "./components/auth/Logout";
import Test from "./pages/Test";
import AddEntityForm from "./components/entity/AddEnitityForm";
import EntityForm from "./components/entity/EditEntityForm";
import LeadForm from "./components/entity/EntityField";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import EntityMaster from "./pages/EntityMaster";
import LoginForm from "./components/auth/LoginForm";
import User_permission from "./pages/User_permission";
import Activity_Setup from "./pages/Activity_Setup";
import Activity_Entity_Setup from "./pages/Activity_Entity_Setup";


// Define the router configuration
const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <LoginForm />, // Login page will not have Layout, so keep it as is
  // },
  {
    path: "/dashboard",
    element: <LoginForm />, // Login page will not have Layout, so keep it as is
  },
  {
    path: "/",
    element: (
      <Layout>
        <Home /> {/* Home page wrapped in Layout */}
      </Layout>
    ),
  },
  {
    path: "/test",
    element: (
      <Layout>
        <Test /> {/* Test page wrapped in Layout */}
      </Layout>
    ),
  },
  {
    path: "/logout",
    element: (
      <Layout>
        <Logout /> {/* Logout page wrapped in Layout */}
      </Layout>
    ),
  },
  {
    path: "/entity-master",
    element: (
      <Layout>
        <EntityMaster /> {/* Logout page wrapped in Layout */}
      </Layout>
    ),
  },
  {
    path: "/add",
    element: (
      <Layout>
        <AddEntityForm /> {/* Logout page wrapped in Layout */}
      </Layout>
    ),
  },
  {
    path: "/edit",
    element: (
      <Layout>
        <EntityForm /> {/* Logout page wrapped in Layout */}
      </Layout>
    ),
  },
  {
    path: "/add_filed",
    element: (
      <Layout>
        <LeadForm /> {/* Logout page wrapped in Layout */}
      </Layout>
    ),
  },
  {
    path: "/User_permission",
    element: (
      <Layout>
        <User_permission /> {/* Logout page wrapped in Layout */}
      </Layout>
    ),
  },
  {
    path: "/Activity_Type_Setup",
    element: (
      <Layout>
        <Activity_Setup /> {/* Logout page wrapped in Layout */}
      </Layout>
    ),
  },
  {
    path: "/Activity_Entity_Setup",
    element: (
      <Layout>
        <Activity_Entity_Setup /> {/* Logout page wrapped in Layout */}
      </Layout>
    ),
  },
]);

// Main App component
function App() {
  const primaryColor = "#000130"; // Define primary color
  const blueBlackColor = "#000130"; // Define color for AppBar and Drawer
  const isDarkMode = useSelector((state) => state.theme.mode === "dark"); // Get theme mode from Redux

  // Create a theme based on the current mode
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light", // Dark or Light mode
      primary: {
        main: primaryColor,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: blueBlackColor, // AppBar background color
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: primaryColor, // Drawer background color
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply global baseline CSS for material-ui */}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;


