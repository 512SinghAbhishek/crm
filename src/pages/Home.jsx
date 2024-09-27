import React from "react";
import { Typography, Button, Container, Grid2 as Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/CustomComponent/DashboardCard";


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cardData = [
    {
      title: "TOTAL EARNINGS",
      amount: "$559.25k",
      percentageChange: 6.24,
      linkText: "View net earnings",
      boxColor: "#80ff8a"
    },
    {
      title: "ORDERS",
      amount: "36,894",
      percentageChange: -3.57,
      linkText: "View all orders",
      boxColor: "#80ff8a"
    },
    {
      title: "CUSTOMERS",
      amount: "183.35M",
      percentageChange: 29.08,
      linkText: "See details",
      boxColor: "#ffa1a1"
    },
    {
      title: "MY BALANCE",
      amount: "165.89K",
      percentageChange: 0.00,
      linkText: "Withdraw money",
      boxColor: "#cfcfcf" // Default color
    }
  ];

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
      <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.1rem 1rem',
        borderBottom: '2px solid gray'
      }}>
        {/* <BreadcrumbsComponent /> */}
        <Typography variant="subtitl1" color="BLACK" padding="1rem 0rem" fontSize='1.2rem' >
          Dashboard
        </Typography>

      </div>

      <Container maxWidth="xl">
        <Grid container spacing={3} marginTop={2}>
          {cardData.map((card, index) => (
            <Grid item size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <DashboardCard
                title={card.title}
                amount={card.amount}
                percentageChange={card.percentageChange}
                linkText={card.linkText}
                boxColor={card.boxColor}
              />
            </Grid>
          ))}
        </Grid>
    </Container>
    </div>
  );
};

export default Home;
