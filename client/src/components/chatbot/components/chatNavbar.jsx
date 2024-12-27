import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  FormControlLabel,
  Typography,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  Language,
  ModeNight,
  Star,
} from "@mui/icons-material";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [roastMode, setRoastMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const handleRoastModeChange = () => {
    setRoastMode(!roastMode);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setMenuOpen(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: darkMode
          ? roastMode
            ? "#e64a19"
            : "#263238"
          : "#fb8c00",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, color: darkMode ? "white" : "black" }}
        >
          DeoxBot
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={handleThemeChange}
              icon={<Brightness7 />}
              checkedIcon={<Brightness4 />}
            />
          }
          label="Dark Mode"
          sx={{ color: darkMode ? "white" : "black" }}
        />
        <FormControlLabel
          control={
            <Switch
              checked={roastMode}
              onChange={handleRoastModeChange}
              icon={<Star />}
              checkedIcon={<ModeNight />}
            />
          }
          label="Roast Mode"
          sx={{ color: darkMode ? "white" : "black" }}
        />
        <IconButton color="inherit" onClick={handleMenuClick}>
          <Language />
        </IconButton>
        <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
          <MenuItem onClick={() => handleLanguageChange("en")}>
            English
          </MenuItem>
          <MenuItem onClick={() => handleLanguageChange("fr")}>French</MenuItem>
          <MenuItem onClick={() => handleLanguageChange("es")}>
            Spanish
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
