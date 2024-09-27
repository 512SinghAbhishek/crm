import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useDispatch, useSelector } from "react-redux";
import { toggleThemeMode } from "../../redux/slices/themeSlice";

const Topbar = ({ toggleDrawer, drawerWidth }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.mode === "dark");
  const userName = useSelector((state) => state.auth.user?.name ?? 'Jayanita');
  const [isFullScreen, setIsFullScreen] = useState(false);


  const handleFullScreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };


  const handleThemeToggle = () => {
    dispatch(toggleThemeMode());
  };

  return (
    <AppBar
      style={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: "relative",
        marginLeft: `${drawerWidth}rem`,
        width: "auto",
      }}
    >
      <Toolbar
        style={{
          justifyContent: "space-between",
          minHeight: "40px"
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
        >
          <MenuIcon />
        </IconButton>

        <Typography fontWeight={700} style={{fontSize: ".8rem"}}>
          Good Morning, {userName}
        </Typography>
        <div>

          <IconButton color="inherit" onClick={handleFullScreenToggle}>
            {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>


          <IconButton color="inherit" onClick={handleThemeToggle}>
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
