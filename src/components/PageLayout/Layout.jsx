import React from "react";
import ProfileMenu from "./ProfileMenu";
import SideNav from "./SideNav";
import { Box, AppBar, Toolbar, IconButton, CssBaseline } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


export default function Layout({ children }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ backgroundColor: "#000000", height: '70px' }}>
                <Toolbar>
                    {isSmallScreen && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                   {/*   <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                        <img
                            src={plazer_logo}
                            alt="Plazer Logo"
                            style={{
                                width: "43px",
                                height: "43px",
                                marginLeft: "2px",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "block",
                                marginTop: "10px"
                            }}
                        />
                        <img
                            src={plazer_name}
                            alt="Plazer Name"
                            style={{
                                width: "150px",
                                height: "46px",
                                marginLeft: "16px",
                                display: "block",
                                marginTop: "10px"
                            }}
                        />

                    </Box>  */}
                    <ProfileMenu position="fixed"/>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Box sx={{ display: "flex", flex: 1 }}>
                <Box sx={{ width: 280 }}>
                    <SideNav
                        mobileOpen={mobileOpen}
                        handleDrawerToggle={handleDrawerToggle}
                    />
                </Box>

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}