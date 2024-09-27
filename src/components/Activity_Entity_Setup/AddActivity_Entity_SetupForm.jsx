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

const AddActivity_Entity_SetupForm = ({ onClose, onSubmit }) => {
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
        <Typography variant="h6">Activity Header Group</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Grid container spacing={1}>
        <Grid container spacing={1}>
        <Grid item xs={12} sm={3}>
        <FormControl component="fieldset">
        <FormLabel component="legend">User Entered Allowed:</FormLabel>
        <Controller
          name="syncWithOutlook" // Unique name for this field
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              row
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="True"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="False"
              />
            </RadioGroup>
          )}
        />
      </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Auto Entered Allowed:</FormLabel>
        <Controller
          name="syncWithOutlook" // Unique name for this field
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              row
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="True"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="False"
              />
            </RadioGroup>
          )}
        />
      </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Mandatory Option</FormLabel>
        <Controller
          name="syncWithOutlook" // Unique name for this field
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              row
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="True"
              />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="False"
              />
            </RadioGroup>
          )}
        />
      </FormControl>
      </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">

              <CustomInput
                name="formseqnumber"
                control={control}
                label="Form SEQ Number"
                rules={{ required: "User is required" }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">

              <CustomInput
                name="archiveafetrdays"
                control={control}
                label="Archive After Days"
                rules={{ required: "User is required" }}
              />
            </FormControl>
          </Grid>

        </Grid>
        <Grid
          item
          xs={2}
          sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
        >
          <Button
            variant="contained"
            style={{
              backgroundColor: "rgb(62 62 62)",
            }}
            onClick={onClose}
            color="error"
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddActivity_Entity_SetupForm;
