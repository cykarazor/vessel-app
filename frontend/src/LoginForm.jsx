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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginForm({ onLogin, onSwitchToRegister }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleTogglePassword = () => {
    setShowPassword((show) => !show);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      onLogin(res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h5" textAlign="center" mb={3} fontWeight="bold">
        Login to Your Account
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          fullWidth
          autoFocus
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
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>

        {error && <Alert severity="error">{error}</Alert>}

        {/* Link to switch to Register form */}
        <Typography textAlign="center" mt={1}>
          Don&apos;t have an account?{" "}
          <Link
            component="button"
            variant="body2"
            onClick={onSwitchToRegister}
            sx={{ fontWeight: "bold" }}
          >
            Register here
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
}
