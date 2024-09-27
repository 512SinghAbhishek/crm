import { Box, Button, FormControl, Grid, RadioGroup, FormControlLabel, Radio, InputLabel, Select, MenuItem, FormLabel, Typography, IconButton } from "@mui/material";
// import {
//   Box,
//   Button,
//   Grid,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormLabel,
//   Typography,
//   IconButton,
//   FormControl,
// } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../CustomComponent/CustomInput";
import axiosInstance from "../../utils/axiosInstance";
import Switch from '@mui/material/Switch';
import { useEffect, useState } from "react";

const AddPermissionForm = ({ onClose, onSubmit }) => {
  const [selectentiyt, setselctEntity] = useState([])
  const [switchStates, setSwitchStates] = useState({
    view: false,
    add: false,
    edit: false,
    statusFilter: false,
  });
  const { handleSubmit, control } = useForm({
    defaultValues: {
      entityName: "",
      shortName: "",
      longName: "",
      pluralName: "",
      status: "",
    },
  });

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const onSubmitForm = async (data) => {
    let res = await axiosInstance.post(`entity/post`, data)
    console.log("==>", res);

    // onSubmit(data); // Pass form data to the parent component
  };


  // useEffect(() => {
  //   // Set row data here. For now, it's just a dummy example
  //   setselctEntity([
  //     { id: 1, value: "Entity", },
  //     { id: 2, value: "Entity 2" },
  //   ]);
  // }, []);




  const Select_Entity = async () => {
    try {
      let res = await axiosInstance.get("udc")
      res = res.data.entity_name

      setselctEntity(res)
    } catch {

    }
  }

  const Sebmit_Entity = async () => {
    try {
      let res = await axiosInstance.post(`entity/post`, defaultValues)
      res = res.data.message
      // setselctEntity(res)
    } catch {

    }
  }

  useEffect(() => {
    Select_Entity()
  }, [])



  const handleMasterSwitchChange = (event) => {
    const isChecked = event.target.checked;
    setSwitchStates({
      view: isChecked,
      add: isChecked,
      edit: isChecked,
      statusFilter: isChecked,
    });
  };

  const handleIndividualSwitchChange = (name) => (event) => {
    const isChecked = event.target.checked;
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [name]: isChecked,
    }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitForm)}
      sx={{
        width: "auto",
        margin: "auto",
        padding: 3,
        background: "#fff",
        // border: "2px solid",
      }}
    >
      {/* Header with Add Entity text and Close button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Fill From</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Grid container spacing={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">

              <CustomInput
                name="user"
                control={control}
                label="User"
                rules={{ required: "User is required" }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <CustomInput
                name="application"
                control={control}
                label="Application"
                rules={{ required: "Application is required" }}
                select // Makes the TextField render as a Select component

              >
                {selectentiyt.map((item) => (
                  <MenuItem value={item.Value}>{item.Value}</MenuItem>
                ))}
              </CustomInput>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={
                  switchStates.view &&
                  switchStates.add &&
                  switchStates.edit &&
                  switchStates.statusFilter
                }
                onChange={handleMasterSwitchChange}
              />
            }
            label="Toggle All"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Controller
            name="view"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    {...field}
                    checked={switchStates.view}
                    onChange={handleIndividualSwitchChange("view")}
                  />
                }
                label="View"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Controller
            name="add"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    {...field}
                    checked={switchStates.add}
                    onChange={handleIndividualSwitchChange("add")}
                  />
                }
                label="Add"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Controller
            name="edit"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    {...field}
                    checked={switchStates.edit}
                    onChange={handleIndividualSwitchChange("edit")}
                  />
                }
                label="Edit"
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Controller
            name="statusFilter"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    {...field}
                    checked={switchStates.statusFilter}
                    onChange={handleIndividualSwitchChange("statusFilter")}
                  />
                }
                label="Status Filter"
              />
            )}
          />
        </Grid>
      </Grid>

        </Grid>
        <Box>
          <Button
            sx={{ marginRight: ".5rem" }}
            variant="contained"
            style={{
              backgroundColor: "rgb(62 62 62)",
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default AddPermissionForm;
