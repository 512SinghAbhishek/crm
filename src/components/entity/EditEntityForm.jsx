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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomInput from "../CustomComponent/CustomInput";

const EntityForm = ({ open, onClose, onSubmit, formdata }) => {

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
        <Typography variant="h6">Edit Entity</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3} >
          <CustomInput
            name="entityName"
            control={control}
            label="Entity Name"
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <CustomInput
            name="shortName"
            control={control}
            label="Short Name"
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <CustomInput
            name="longName"
            control={control}
            label="Long Name"
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <CustomInput
            name="pluralName"
            control={control}
            label="Plural Name"
          />
        </Grid>

        <Grid item xs={12}>
          <FormLabel component="legend">Status</FormLabel>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <RadioGroup
                style={{ display: "block" }}
                row
                {...field}
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

export default EntityForm;
