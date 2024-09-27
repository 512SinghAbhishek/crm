import { TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

const CustomInput = ({ name, control, label, rules, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextField
            {...field}
            label={label}
            variant="outlined"
            size="small"
            fullWidth
            error={!!error}
            helperText={error ? error.message : ""}
            {...props}
          />
          {/* {error && (
            <Typography color="error" variant="body2">
              {error.message}
            </Typography>
          )} */}
        </>
      )}
    />
  );
};

export default CustomInput;
