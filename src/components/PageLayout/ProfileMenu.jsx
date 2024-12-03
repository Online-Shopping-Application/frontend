import React from "react";
import { Menu, MenuItem, IconButton, Avatar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import Divider from "@mui/material/Divider";


export default function ProfileMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();


    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleViewProfile = () => {
        handleMenuClose();
        navigate("/MyProfile");
    };

    const handleLogout = () => {
        handleMenuClose();
        // Add your logout logic here
    };


    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <IconButton
                edge="end"
                aria-label="notifications"
                color="inherit"
                sx={{ mr: 2 }}
            >
                <Badge badgeContent={4} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>

            <IconButton
                edge="end"
                aria-controls="profile-menu"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
                sx={{ mr: 2 }}
            >
                <AccountCircleIcon />
                {/*  <Avatar/> */}
            </IconButton>
            <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleViewProfile}>
                    <AccountCircleIcon sx={{ mr: 2 }} />
                    View Profile
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        navigate("/Settings");
                    }}
                >
                    <SettingsIcon sx={{ mr: 2 }} />
                    Settings
                </MenuItem>
                <Divider />
                <MenuItem sx={{ color: "red" }} onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 2 }} />
                    Logout
                </MenuItem>
            </Menu>
        </Box>
    );
};
