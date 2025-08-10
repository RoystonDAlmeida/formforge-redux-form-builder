import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Container,
  useMediaQuery,
  useTheme,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ListAltIcon from "@mui/icons-material/ListAlt";

const navItems = [
  { to: "/", label: "Home", end: true, icon: <HomeIcon /> },
  { to: "/create", label: "Create", icon: <AddCircleOutlineIcon /> },
  { to: "/preview", label: "Preview", icon: <VisibilityIcon /> },
  { to: "/myforms", label: "My Forms", icon: <ListAltIcon /> },
];

// Navigation button component for the header
function NavButton({
  to,
  label,
  end = false,
  onClick,
}: {
  to: string;
  label: string;
  end?: boolean;
  onClick?: () => void;
}) {
  return (
    // NavLink handles active state styling
    <NavLink to={to} end={end} onClick={onClick} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
      {({ isActive }) => (
        <Button
          color="inherit"
          variant={isActive ? "outlined" : "text"}
          size="small"
          aria-label={label}
          // Ensure button text does not wrap on smaller screens
          sx={{ width: "100%", whiteSpace: 'nowrap' }}
        >
          {label}
        </Button>
      )}
    </NavLink>
  );
}

// Drawer content for mobile view
const MobileDrawer = ({
  handleDrawerToggle,
}: {
  handleDrawerToggle: () => void;
}) => (
  <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', width: 250 }} role="presentation">
    {/* Drawer Title */}
    <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold' }}>
      FormForge Redux
    </Typography>
    <Divider />
    <List>
      {navItems.map((item) => (
        <ListItem key={item.to} disablePadding >
          {/* Use ListItemButton with NavLink for navigation and active styling */}
          <ListItemButton component={NavLink} to={item.to} end={item.end} sx={{
            '&.active': {
              bgcolor: 'action.selected',
              color: 'primary.main',
              '& .MuiListItemIcon-root': {
                color: 'primary.main',
              },
            },
          }}>
            <ListItemIcon sx={{ minWidth: 40, justifyContent: 'center' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} sx={{ textAlign: 'left' }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
);

export default function Header() {
  const theme = useTheme();
  // useMediaQuery hook to detect if the screen is mobile-sized
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // State to manage the mobile drawer's open/close status
  const [mobileOpen, setMobileOpen] = useState(false);

  // Toggles the mobile drawer
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      // Styling for a semi-transparent, blurred header background
      sx={{ backdropFilter: "blur(6px)", bgcolor: "rgba(255, 255, 255, 0.8)" }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ minHeight: 56, display: "flex", justifyContent: "space-between" }}>
          {/* App Logo and Title */}
          <Box component={Link} to="/" sx={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
            <img src="/favicon.ico" alt="FormForge Redux icon" width="24" height="24" style={{ marginRight: "8px" }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', flexShrink: 0 }}>
              FormForge Redux
            </Typography>
          </Box>

          {/* Conditional rendering based on screen size */}
          {isMobile ? (
            // Mobile view: Hamburger icon and Drawer
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              {/* The sliding drawer menu for mobile */}
              <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                <MobileDrawer handleDrawerToggle={handleDrawerToggle} />
              </Drawer>
            </>
          ) : (
            // Desktop view: Horizontal navigation links
            <Stack direction="row" spacing={1} component="nav" aria-label="Main navigation">
              {navItems.map((item) => (
                <NavButton key={item.to} to={item.to} label={item.label} end={item.end} />
              ))}
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
