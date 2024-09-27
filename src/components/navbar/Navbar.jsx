import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  Divider,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Search,
  Home,
  Settings,
} from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SearchField from "../CustomComponent/SearchField";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from "react-router-dom";
import FourSquareIcon from "../FourSquareIcon";
import UserCard from "../CustomComponent/UserCard";
import { useSelector } from "react-redux";


const menuItems = [
  {
    label: "Setup", icon: <FourSquareIcon />, path: "/Setup",
    subMenu: [
      { label: "Entity Field", path: "/entity-master" },
      { label: "User Permission View", path: "/User_permission" },
      { label: "Activity Type Setup", path: "/Activity_Type_Setup" },
      { label: "Activity Entity Setup", path: "/Activity_Entity_Setup" },
    ],
  },
  {
    label: "Views",
    icon: <FourSquareIcon />,
    subMenu: [
      { label: "Profile", path: "/profile" },
      { label: "Security", path: "/security" },
    ],
  },
];

const Navbar = ({ drawerWidth }) => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  // const {name, path: imageUrl} = useSelector((state) => state.auth.user);
  // console.log(user)
  // const userDetail = {name, imageUrl}
  // console.log(userDetail)

  const navigate = useNavigate();

  const handleSubMenuClick = (label) => {
    setOpenSubMenu(openSubMenu === label ? null : label);
  };

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subMenu &&
        item.subMenu.some((subItem) =>
          subItem.label.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: `${drawerWidth}rem`,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: `${drawerWidth}rem`,
          transition: "width 0.3s",
          overflow: "hidden",
          paddingTop: "4rem",
          color: "#fff",
        },
      }}
    >

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: 'column',
        height: '100%',
      }}>
        <div>
          <List>
            <ListItem>
              {drawerWidth === 15 ? (
                <SearchField
                  variant="outlined"
                  label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  inputColor="#fff"
                  iconColor="#fff"
                  labelColor="#fff"
                  borderColor="#fff"
                />
              ) : (
                <Search />
              )}
            </ListItem>
          </List>

          <Divider />
          <List>
            {filteredMenuItems.map((item, index) => (
              <div key={index}>
                {item.subMenu ? (
                  <>
                    <ListItem button onClick={() => handleSubMenuClick(item.label)}>
                      <ListItemIcon sx={{ color: "#fff" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ style: { fontSize: '0.8rem' } }}
                      />
                      {openSubMenu === item.label ? <ExpandMore /> : <ArrowForwardIosIcon fontSize="sm" />}
                    </ListItem>

                    <Collapse
                      in={openSubMenu === item.label}
                      timeout="auto"
                      unmountOnExit
                      flexDirection=""
                    >
                      <List component="div" disablePadding >
                        {item.subMenu.map((subItem, subIndex) => (
                          <ListItem button key={subIndex} sx={{ pl: 4 }} onClick={() => navigate(subItem.path)}>
                            <ListItemText sx={{ cursor: 'pointer' }}  primaryTypographyProps={{ style: { fontSize: '0.8rem' } }} primary={subItem.label} />
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItem button>
                    <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
                )}

              </div>
            ))}
          </List>
        </div>
        <div style={{
          margin: "0rem .3rem",
          marginBottom: '.8rem'
        }}>
          {/* <UserCard user={userDetail} /> */}
        </div>
      </div>
    </Drawer>
  );
};

export default Navbar;
