import { Box, Button, FormControl, RadioGroup, FormControlLabel, Radio, InputLabel, Select, MenuItem, FormLabel, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../CustomComponent/CustomInput";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";

const AddActivitysetupForm = ({ onClose, onSubmit }) => {
  const [selectentiyt, setselctEntity] = useState([])
  const { handleSubmit, control } = useForm({
    defaultValues: {
      entityName: "",
      shortName: "",
      longName: "",
      pluralName: "",
      status: "",
    },
  });

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

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitForm)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 3,
        width: "100%",
        height: 'auto',
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
        <Typography variant="h6">Add Activity</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <FormControl fullWidth size="small">

        <CustomInput
          name="entityName"
          control={control}
          label="Entity Type"
          rules={{ required: "Entity Type is required" }}
          select // Makes the TextField render as a Select component

        >
          {selectentiyt.map((item) => (
            <MenuItem value={item.Value}>{item.Value}</MenuItem>
          ))}
        </CustomInput>
      </FormControl>
      <FormControl fullWidth size="small">
        <CustomInput
          name="activitytype"
          control={control}
          label="Activity Type"
          rules={{ required: "Activity Tipe is required" }}
          select // Makes the TextField render as a Select component

        >
          {selectentiyt.map((item) => (
            <MenuItem value={item.Value}>{item.Value}</MenuItem>
          ))}
        </CustomInput>
      </FormControl>

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

      <CustomInput
        name="accountid"
        control={control}
        label="Account ID"
        type="number"
      // value={inputValueCh} // Bind input value from state
      // onChange={handleInputChangeCh} // Handle changes with validation
      />
      {/* Buttons */}
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
    </Box>
  );
};

export default AddActivitysetupForm;
