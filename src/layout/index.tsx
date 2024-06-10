import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import root from "@router-root";
import { Divider, ListItemButton, ListItemIcon } from "@mui/material";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu } from "@ui";

const drawerWidth = 240;

const Header = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#D55200",
  [theme.breakpoints.up("sm")]: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
}));

const ResponsiveDrawer = () => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getCategoryName = (pathname: any) => {
    if (pathname === "/main/brands") return "Brands";
    if (pathname === "/main/brand-category") return "Brand Category";
    if (pathname === "/main/sales") return "Sales";
    if (pathname === "/main/settings") return "Settings";
    if (pathname === "/main/product") return "Products";
    if (pathname === "/main") return "Category";
    if (pathname === "/main/stock") return "Stock";
    if (/^\/main\/category\/\d+$/.test(pathname)) return "Subcategory";
    if (/^\/main\/brands\/\d+$/.test(pathname)) return "Category Brands";
    if (/^\/main\/product\/\d+$/.test(pathname)) return "Product Details";
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {root?.map((items: any, index: any) => (
          <NavLink
            to={items.path}
            key={index}
            className={
              items.path === pathname ? "block bg-blue text-white" : ""
            }
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <span
                    className={
                      items.path === pathname ? "text-white" : "text-gray-500"
                    }
                  >
                    {items.icon}
                  </span>
                </ListItemIcon>
                <ListItemText primary={items.content} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header position="fixed">
        <Toolbar className="flex justify-between">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <h1 className="text-[20px] text-white">
              {getCategoryName(pathname) ? getCategoryName(pathname) : <div>Single Page</div>}
            </h1>
          </Typography>
          <Typography>
            <Menu />
          </Typography>
        </Toolbar>
      </Header>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default ResponsiveDrawer;
