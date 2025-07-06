import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Alert,
  Stack,
  Typography,
  Box,
  InputAdornment,
  IconButton,
  CircularProgress,
  Link,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function RegisterForm({ onSwitchToLogin }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handleTogglePassword = () => {
    setShowPassword((show) => !show);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, form);
      setMessage(res.data.message || "Registered successfully! Please login.");
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container sx={{ minHeight: "100vh" }}>
      {!isMobile && (
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: "100%",
              backgroundImage: "url('https://source.unsplash.com/featured/?ship,port')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Grid>
      )}

      <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          sx={{
            width: "100%",
            maxWidth: 400,
            p: 4,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "background.paper",
            mx: "auto",
          }}
        >
          <Typography variant="h5" textAlign="center" mb={3} fontWeight="bold">
            Create Your Account
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              sx={{ "& .MuiInputBase-root": { borderRadius: 2 } }}
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              sx={{ "& .MuiInputBase-root": { borderRadius: 2 } }}
            />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              required
              fullWidth
              variant="outlined"
              sx={{ "& .MuiInputBase-root": { borderRadius: 2 } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ borderRadius: 2, fontWeight: "bold" }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
            </Button>

            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}

            <Typography textAlign="center" mt={1}>
              Already have an account?{" "}
              <Link
                component="button"
                variant="body2"
                onClick={onSwitchToLogin}
                sx={{ fontWeight: "bold" }}
              >
                Login here
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}
