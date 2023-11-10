"use client";

import * as React from "react";
import Radio from "@mui/material/Radio";
import { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import "./list.css";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";
import { employe, getAllEmployees } from "../Redux/Slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { deleteEmployeeById } from "../Redux/Slice";
import FormLabel from "@mui/material/FormLabel";
import { deepOrange } from "@mui/material/colors";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from "next/dist/client/components/navigation";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const useStyles = makeStyles((theme) => ({
  noUnderline: {
    textDecoration: "none",
    color: "black",
  },
}));

const usemargin = makeStyles((theme) => ({
  margin: {
    marginLeft: "1%",
  },
}));

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const opene = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const employees = useSelector((state) => state.employeeList.employees);
  // console.log(employe);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  var storedData = localStorage.getItem("userData");
  var userData = JSON.parse(storedData);
  console.log("hello ", userData);
  const firstNameInitials = userData.user.firstname.slice(0, 2).toUpperCase();
 

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const employeesToDisplay = employees.slice(startIndex, endIndex);
  const handleDelete=(id)=>{
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch(deleteEmployeeById(id))
    }
   
  }
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  // const loading = useSelector((state) => state.employeeList.loading);
  // const error = useSelector((state) => state.employeeList.error);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const openAddUserModal = () => {
    setAddUserModalOpen(true);
  };

  const closeAddUserModal = () => {
    setAddUserModalOpen(false);
  };
  const handleAddUser = (e) => {
    e.preventDefault();

    const newEmptyFields = {};
    let hasEmptyFields = false;
    for (const key in formData) {
      if (formData[key] === "") {
        newEmptyFields[key] = true;
        hasEmptyFields = true;
      } else {
        newEmptyFields[key] = false;
      }
    }

    setEmptyFields(newEmptyFields);

    if (hasEmptyFields) {
      // Handle empty fields (e.g., show an alert)
      console.log("Fill in all input fields");
    } else {
      dispatch(employe(formData));
      console.log("Data:", formData);
      if (emptyFields != null) {
        closeAddUserModal();
      }
    }
   
  };
  useEffect(() => {
    dispatch(getAllEmployees());
  }, [employees,dispatch]);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const [emptyFields, setEmptyFields] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    skill: "",
    email: "",
    phone: "",
    company: "",
    experience: "",
    freelancer: "",
  });
  // console.log("name", employees);
 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (value) {
      setEmptyFields({
        ...emptyFields,
        [name]: false,
      });
    }
  };
  const handlelogout=()=>{
    router.push('/login');
    setAnchorEl(null);
  }
  const classes = useStyles();
  const classess = usemargin();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          ByteWave Consulting
          </Typography>
          <div>
      <Button
        id="basic-button"
        aria-controls={opene ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={opene ? 'true' : undefined}
        onClick={handleClick}
        sx={{ 
        }}
      >
      <Avatar sx={{ bgcolor: deepOrange[500] }}>{firstNameInitials}</Avatar>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={opene}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
 }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handlelogout} >Logout</MenuItem>
      </Menu>
    </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { text: "DashBoard", link: "../DashBoard" },
            { text: "Userlist", link: "../ListData" },
            { text: "Send email", link: "" },
            { text: "Drafts", link: "" },
          ].map((element, index) => (
            <Link
              href={element.link}
              key={element.text}
              className={classes.noUnderline}
            >
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={element.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <div>
          <Button
            variant="contained"
            disableElevation
            onClick={openAddUserModal}
          >
            Add
          </Button>
          <table id="customers">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>skill</th>
                <th>Company</th>
                <th>Freelancer</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employeesToDisplay.map((emp, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {" "}
                    <Avatar
                      alt="Profile Picture"
                      src={profilePicture}
                      style={{ width: "50px", height: "50px" }}
                      type="file"
                      onChange={handleFileChange}
                    >
                      {emp.name.substring(0, 2)}
                    </Avatar>
                  </td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.skill}</td>
                  <td>{emp.company}</td>
                  <td>{emp.freelancer}</td>

                  <td>
                    <Button
                      className="Edit"
                      variant="contained"
                      color="success"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      className={classess.margin}
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            count={Math.ceil(employees.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
        <Dialog open={isAddUserModalOpen} onClose={closeAddUserModal}>
          <DialogTitle>Add Employe</DialogTitle>
          <DialogContent>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="Profile Picture"
                src={profilePicture}
                style={{ width: "100px", height: "100px" }}
                type="file"
                onChange={handleFileChange}
              />
            </div>
            <div className="Formset">
              <div className="textfild">
                <TextField
                  label="Name"
                  name="name"
                  id="name"
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  label="Number"
                  id="phone"
                  name="phone"
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
            <div className="Formset">
              <div className="textfild">
                <TextField
                  label="Skill"
                  variant="outlined"
                  id="skill"
                  name="skill"
                  onChange={handleInputChange}
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  label="Experience"
                  id="experience"
                  name="experience"
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
            <div className="Formset">
              <div className="textfild">
                <TextField
                  label="Company"
                  id="company"
                  name="company"
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  label="Eamail"
                  id="email"
                  name="email"
                  onChange={handleInputChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
            <div>
              <div className="Formset">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Freelancer
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="freelancer"
                  value={formData.freelancer} // Make sure to set the value
                  onChange={handleInputChange} // Handle radio button change
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeAddUserModal}>Cancel</Button>
            <Button onClick={handleAddUser} variant="contained" color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
