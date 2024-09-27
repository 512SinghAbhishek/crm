import { Box, Button, FormControl, RadioGroup, FormControlLabel, Radio, InputLabel, Select, MenuItem, FormLabel, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../CustomComponent/CustomInput";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";

const AddEntityForm = ({ onClose, onSubmit }) => {
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

  const onSubmitForm = async(data) => {
    let res = await axiosInstance.post(`entity/post`, data)
    console.log("==>",res);
    
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
        <Typography variant="h6">Add Entity</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <FormControl fullWidth size="small">

        <CustomInput
          name="entityName"
          control={control}
          label="Entity Name"
          rules={{ required: "Entity Name is required" }}
          select // Makes the TextField render as a Select component

        >
          {selectentiyt.map((item) => (
            <MenuItem value={item.Value}>{item.Value}</MenuItem>
          ))}
        </CustomInput>
      </FormControl>

      {/* Short Name */}
      <CustomInput
        name="shortName"
        control={control}
        label="Short Name"
        rules={{ required: "Short Name is required" }}
      />

      {/* Long Name */}
      <CustomInput
        name="longName"
        control={control}
        label="Long Name"
        rules={{ required: "Long Name is required" }}
      />

      {/* Plural Name */}
      <CustomInput
        name="pluralName"
        control={control}
        label="Plural Name"
        rules={{ required: "Plural Name is required" }}
      />

      {/* Status Radio Buttons */}
      <FormControl component="fieldset">
        <FormLabel component="legend">Status</FormLabel>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              row
              name="status"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                value="active"
                control={<Radio />}
                label="Active"
              />
              <FormControlLabel
                value="inactive"
                control={<Radio />}
                label="Inactive"
              />
            </RadioGroup>
          )}
        />
      </FormControl>

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

export default AddEntityForm;
