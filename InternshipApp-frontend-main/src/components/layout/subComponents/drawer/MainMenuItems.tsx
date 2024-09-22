import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import {
  AccountBalanceWalletOutlined as AccountBalanceWalletOutlinedIcon,
  DashboardCustomizeOutlined as DashboardCustomizeOutlinedIcon,
  MonitorHeartOutlined as MonitorHeartOutlinedIcon,
  ReceiptLongOutlined as ReceiptLongOutlinedIcon,
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import { Link } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

// Define MenuItem interface
interface MenuItem {
  text: string;
  icon: JSX.Element;
  subMenuItems?: MenuItem[];
  route?: string;
}

// Define mainMenuItems array without the Employee section
const mainMenuItems: MenuItem[] = [
  {
    text: "Home",
    icon: <DashboardCustomizeOutlinedIcon />,
    route: "/",
  },
  {
    text: "Profile",
    icon: <PersonOutlineOutlinedIcon />,
    route: "/profile",
  },
  { text: "Item", icon: <CategoryIcon />, route: "/table" },
  {
    text: "Role",
    icon: <MonitorHeartOutlinedIcon />,
    subMenuItems: [
      { text: "All Roles", icon: <MonitorHeartOutlinedIcon />, route: "/role-table" },
      { text: "Add Role", icon: <ReceiptLongOutlinedIcon />, route: "/role-form" },
    ],
  },
  {
    text: "Client",
    icon: <MonitorHeartOutlinedIcon />,
    subMenuItems: [
      { text: "All Clients", icon: <MonitorHeartOutlinedIcon />, route: "/client-table" },
      { text: "Add Client", icon: <ReceiptLongOutlinedIcon />, route: "/client-form" },
    ],
  },
];

const MenuItemComponent: React.FC<{ item: MenuItem }> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      {item.subMenuItems ? (
        <Accordion
          expanded={expanded}
          onChange={handleClick}
          sx={{
            boxShadow: "none",
            color: "black",
            fontWeight: "bold",
            bgcolor:'#F5F5F8'
          }}
          disableGutters
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <ListItemIcon sx={{ color: "grey"}}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" style={{ color: "grey"}}>
                  {item.text}
                </Typography>
              }
            />
          </AccordionSummary>
          <AccordionDetails sx={{ maxHeight: '300px', overflowY: 'visible' }}>
            <List sx={{ mt: -3 }}>
              {item.subMenuItems.map((subItem, index) => (
                <ListItem
                  key={index}
                  component={Link}
                  to={subItem.route || "#"}
                  sx={{
                    paddingLeft: 0,
                    boxShadow: "none",
                    textDecoration: "none",
                    color: "black",
                    
                  }}
                >
                  <ListItemIcon sx={{ color: "grey" }}>
                    {subItem.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        style={{
                          color: "grey",
                        }}
                      >
                        {subItem.text}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ) : (
        <ListItem
          component={Link}
          to={item.route || "#"}
          sx={{
            textDecoration: "none",
            color: "black",
          }}
        >
          <ListItemIcon sx={{ color: "grey" }}>{item.icon}</ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body2"
                style={{ color: "grey", fontFamily: "'Poppins', sans-serif" }}
              >
                {item.text}
              </Typography>
            }
          />
        </ListItem>
      )}
    </>
  );
};

const MainMenu: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log(decodedToken)
        setIsAdmin(decodedToken.role === 'admin');
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  return (
    <Box sx={{ maxHeight: '100vh', overflow: 'hidden' }}>
      <List>
        {mainMenuItems.map((item, index) => (
          <MenuItemComponent key={index} item={item} />
        ))}

        {/* Conditionally render Employee section */}
        {isAdmin && (
          <MenuItemComponent
            key={"employee"}
            item={{
              text: "Employee",
              icon: <AccountBalanceWalletOutlinedIcon />,
              route: "/employee",
              subMenuItems: [
                { text: "All Employees", icon: <MonitorHeartOutlinedIcon />, route: "/table" },
                { text: "Add Employee", icon: <ReceiptLongOutlinedIcon />, route: "/employee-form" },
              ],
            }}
          />
        )}
      </List>
    </Box>
  );
};

export default MainMenu;
