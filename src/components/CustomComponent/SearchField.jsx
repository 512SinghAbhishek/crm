import React from 'react';
import { TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchField = ({
  label = "Search Menu",
  value,
  onChange,
  variant = "outlined",
  iconColor = "#fff", // Default color for the search icon
  inputColor = "#fff", // Default color for the input text
  labelColor = "#fff", // Default label color
  borderColor = "#fff", // Default border color
  ...props
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      variant={variant}
      size="small"
      value={value}
      onChange={onChange}
      InputProps={{
        style: {
          color: inputColor, // text color
        },
        startAdornment: <Search style={{ color: iconColor }} />, // search icon color
        notchedOutline: {
          borderColor: borderColor, // border color
        },
      }}
      InputLabelProps={{
        style: {
          color: labelColor, // label color
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: borderColor, // normal state border color
          },
          '&:hover fieldset': {
            borderColor: borderColor, // hover state border color
          },
          '&.Mui-focused fieldset': {
            borderColor: borderColor, // focused state border color
          },
        },
      }}
      {...props} // spread the remaining props to make it more flexible
    />
  );
};

export default SearchField;
