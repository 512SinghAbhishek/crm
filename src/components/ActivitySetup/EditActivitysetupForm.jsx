import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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

const EditActivitysetupForm = ({ open, onClose, onSubmit, formdata }) => {

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      entityName: "",
      shortName: "",
      duedate: "",
      cdate: "",
      cdate: "",
      editaccess: "No",
    },
  });
console.log("Ram=>",formdata);

  useEffect(() => {
    if (formdata) {
      reset({
        entityName: formdata.entity_name || "",
        cdate: formdata.cdate || "",
        // duedate: formdata.duedate || "",
        cdate: formdata.cdate || "",
        cdate: formdata.cdate || "",
        editaccess: formdata.editaccess === true ? "Yes" : "No", // Map boolean to string
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
        <Typography variant="h6">Edit Activity</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Grid container spacing={1}>
               <Grid item xs={12} sm={3}>
          <FormControl fullWidth size="small">

            <CustomInput
              name="entityName"
              control={control}
              label="Entity Type"
              rules={{ required: "Entity Type is required" }}
              select // Makes the TextField render as a Select component

            >
              {/* {selectentiyt.map((item) => (
              <MenuItem value={item.Value}>{item.Value}</MenuItem>
            ))} */}
            </CustomInput>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth size="small">
            <CustomInput
              name="activitytype"
              control={control}
              label="Activity Type"
              rules={{ required: "Activity Tipe is required" }}
              select // Makes the TextField render as a Select component

            >
              {/* {selectentiyt.map((item) => (
              <MenuItem value={item.Value}>{item.Value}</MenuItem>
            ))} */}
            </CustomInput>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          {/* Short Name */}
          <CustomInput
            name="duedate"
            control={control}
            label="Schedule Due Date"
            rules={{ required: "Date is required" }}
            type="date"
            InputLabelProps={{ shrink: true }} // Ensure the label doesn't overlap the input
            inputProps={{
              placeholder: " ",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CustomInput
            name="completiondate"
            control={control}
            label="Completion Date"
            rules={{ required: "Date is required" }}
            type="date"
            InputLabelProps={{ shrink: true }} // Ensure the label doesn't overlap the input
            inputProps={{
              placeholder: " ",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Sync With Outlook</FormLabel>
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
            <FormLabel component="legend">Sync With 3rd Party</FormLabel>
            <Controller
              name="syncWithThirdParty" // Unique name for this field
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
            <FormLabel component="legend">Is Service Activity</FormLabel>
            <Controller
              name="isServiceActivity" // Unique name for this field
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
            <FormLabel component="legend">Is Billable</FormLabel>
            <Controller
              name="isBillable" // Unique name for this field
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
            <FormLabel component="legend">System Completion Time</FormLabel>
            <Controller
              name="systemCompletionTime" // Unique name for this field
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
            <FormLabel component="legend">OTP Validated</FormLabel>
            <Controller
              name="otpValidated" // Unique name for this field
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
          <CustomInput
            name="accountid"
            control={control}
            label="Account ID"
            type="number"
          // value={inputValueCh} // Bind input value from state
          // onChange={handleInputChangeCh} // Handle changes with validation
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <CustomInput
            name="notes"
            control={control}
            label="Notes"
            type="textarea"
            InputLabelProps={{ shrink: true }} // Ensure the label doesn't overlap the input
            multiline // This enables the input to become a textarea
            rows={2} // You can adjust the number of rows for the textarea
            inputProps={{
              placeholder: "Enter Notes...",
            }}
          />
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

export default EditActivitysetupForm;
