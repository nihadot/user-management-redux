import React from "react";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";

type SearchContainerProps = {
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
  onClear?: () => void;
};

const SearchContainer: React.FC<SearchContainerProps> = ({
  placeholder = "Search...",
  value,
  onChange,
  onSearch,
  onClear,
}) => {
  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        size="medium"
        sx={{
          bgcolor: "white",
          fontSize: "16px",
          border: "1px solid rgba(222, 222, 222, 1)",

          borderRadius: "6px !important",
          "& .MuiOutlinedInput-root": {
            boxShadow: "0px 5px 5.5px 0px rgba(0, 0, 0, 0.05) inset",
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "#ccc",
            },
            "&.Mui-focused fieldset": {
              borderColor: "transparent", 
            },
          },

          "& .MuiOutlinedInput-input":{
            height: "40px",
            padding:"0px 8px",
          },

          "& .MuiInputAdornment-root":{
            marginRight:"0px",
            marginLeft: "0px", // Customize as needed
          }
       
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="action" />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={onClear}>
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchContainer;
