
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthService from "../../services/auth/authService";
import { loginSuccess } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import backgroundImage from "../../assets/WhatsApp Image 2024-09-23 at 11.57.06 AM.jpeg"; // Import your background image
import CompanyLogo from '../../assets/jlogo.svg';

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "At least 6 characters")
    .required("Password is required"),
});

const Root = styled("div")({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#f5f5f5",
  overflow: "hidden",
});

const Background = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  filter: "brightness(0.5)",
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  clipPath: "polygon(47% 0, 100% 0, 100% 54%, 48% 66%, 0 54%, 0 0);",
  zIndex: 0,
});

const FormPaper = styled(Paper)({
  padding: "32px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#ffffff", // Solid background color
  zIndex: 1, // Ensure the form is above the background
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
});

const Form = styled("form")({
  width: "100%",
  marginTop: "8px",
});

const SubmitButton = styled(Button)({
  margin: "24px 0 16px",
});

const LoginFormBack = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      const { token, user } = await AuthService.login(
        data.email,
        data.password
      );
      localStorage.setItem("token", token);
      dispatch(loginSuccess({ token, user }));
      navigate("/home");
    } catch (err) {
      setError("Login failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Root>
      <Background />
      <FormPaper>
        <Box display="flex" alignItems="center">
          <img
            src={CompanyLogo}
            alt="Company Logo"
            style={{ width: '10rem', marginRight: 10 }}
          />
        </Box>
        {error && <Typography color="error">{error}</Typography>}
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </SubmitButton>
        </Form>
      </FormPaper>
    </Root>
  );
};

export default LoginFormBack;
