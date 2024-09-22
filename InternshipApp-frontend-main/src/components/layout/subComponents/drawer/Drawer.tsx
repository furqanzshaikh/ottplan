import { Drawer, Box } from "@mui/material";
import MainMenuItems from "./MainMenuItems";
import Logo from "../../../../assets/images/logo.png";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const drawerStyles = {
    "& .MuiDrawer-paper": {
      width: { sm: "16.9em" },
      backgroundColor: "#F5F5F8",
      boxShadow: "rgba(0.05, 0.05, 0.05, 0.05) ",
      overflowX: "auto",
      px: "15px",
      scrollbarWidth: "none",
    },
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      onClose={onClose}
      ModalProps={{
        BackdropProps: {
          invisible: true, // This will remove the overlay
        },
      }}
      sx={drawerStyles}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb:2,
          mt:2
        }}
      >
        <img
          src={Logo}
          alt="LogoImg"
          style={{ width: "60%"}}
        />
      </Box>

      <MainMenuItems />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          top: "23%",
        }}
      >
  
      </Box>
    </Drawer>
  );
};

export default Sidebar;
