import { useEffect ,useState} from "react";
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

const EditPermissionForm = ({ open, onClose, onSubmit, formdata }) => {
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
        <Typography variant="h6">Edit From</Typography>
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
                {/* {selectentiyt.map((item) => (
            <MenuItem value={item.Value}>{item.Value}</MenuItem>
          ))} */}
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


          {/* <Grid item xs={12} sm={3}>
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="View"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Add"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Edit"
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label="Status Filter"
                />
              )}
            />
          </Grid> */}

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

export default EditPermissionForm;
