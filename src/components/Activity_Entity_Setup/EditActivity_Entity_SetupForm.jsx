import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Switch from '@mui/material/Switch';
import {
  Box,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Typography,
  IconButton,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomInput from "../CustomComponent/CustomInput";

const EditActivity_Entity_SetupForm = ({ open, onClose, onSubmit, formdata }) => {
  const [switchStates, setSwitchStates] = useState({
    view: false,
    add: false,
    edit: false,
    statusFilter: false,
  });
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      entityName: "",
      shortName: "",
      longName: "",
      pluralName: "",
      status: "inactive",
    },
  });

  useEffect(() => {
    if (formdata) {
      reset({
        entityName: formdata.entity_name || "",
        shortName: formdata.short_name || "",
        longName: formdata.long_name || "",
        pluralName: formdata.plural_name || "",
        status: formdata.status === true ? "active" : "inactive", // Map boolean to string
      });
    }
  }, [formdata, reset]);

  const onSubmitHandler = (data) => {
    // Convert "active"/"inactive" back to true/false when submitting
    const updatedData = {
      ...data,
      status: data.status === "active", // Convert string back to boolean
    };
    console.log("Submitted Data", updatedData);
    onSubmit(updatedData); // Pass the updated form data
  };


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
      onSubmit={handleSubmit(onSubmitHandler)}
      sx={{
        width: "auto",
        margin: "auto",
        padding: 3,
        background: "#fff",
      }}
    >
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

export default EditActivity_Entity_SetupForm;
