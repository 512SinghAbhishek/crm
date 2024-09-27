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
import { ToastContainer, toast } from 'react-toastify';


const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
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

const LoginForm = () => {
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

  const onSubmit = async (data, event) => {
    // debugger
    // console.log(event)
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { tokens, user_detail, message } = await AuthService.login(data.username, data.password);
      localStorage.setItem("tokens", tokens);
      dispatch(loginSuccess({ tokens, user: user_detail }));
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Login failed, please try again");
      toast.error("Login failed, please try again");
    }
    setLoading(false);

  };

  return (
    <Root>
      <ToastContainer autoClose={5000} />
      <Background />
      <FormPaper>
        <Box display="flex" alignItems="center">
          <img
            src={CompanyLogo}
            alt="Company Logo"
            style={{ width: '10rem', marginRight: 10 }}
          />
        </Box>
        {/* {error && <Typography color="error">{error}</Typography>} */}
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
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
          >
            {loading ? "Loading..." : "Login"}
          </SubmitButton>
        </Form>
      </FormPaper>
    </Root>
  );
};

export default LoginForm;
