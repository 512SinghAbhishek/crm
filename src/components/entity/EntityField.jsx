import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Checkbox,
  FormControlLabel,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Grid2 as Grid,
  Typography,
  Box,
  IconButton,
  MenuItem
} from "@mui/material";
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import { Box, Button, Drawer, Modal, Paper, Slide } from "@mui/material";
import { AgGridReact } from 'ag-grid-react'; // Import AgGridReact
import CloseIcon from "@mui/icons-material/Close"; // Import close icon
import CustomInput from "../CustomComponent/CustomInput";
import axiosInstance from "../../utils/axiosInstance";


const LeadForm = ({ onClose, formdata }) => {
  const gridRef = useRef(null);
  const [formData, setFormData] = useState("")
  const [selectId, setselectId] = useState("")
  const [rowData, setRowData] = useState([]);
  const [fieldName, setFieldName] = useState([]);
  const [EntName, setEntName] = useState([]);
  const [udcData, setUDCData] = useState([]);
  const [inputTypeData, setInputTypeData] = useState([]);
  const [inputValue, setInputValue] = useState(""); // For storing the user's input
  const [inputValueCh, setInputValueCh] = useState(""); // For storing the user's input
  const [error, setError] = useState(""); // For handling errors
  const [errorCh, setErrorCh] = useState(""); // For handling errors
  


  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      fieldName: "",
      fieldType: "",
      label: "",
      character: "",
      entityRelation: "",
      fieldsRelation: "",
      inputType: "",
      editableAllowed: false,
      visibleAllowed: false,
      isRequired: false,
      isQuickForm: false,
      isFieldSecurity: false,
      status: "active",
    },
  });

  const defaultColDef = {
    flex: 1,
    minWidth: 130,
    editable: false,
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: true,
    enableValue: true,
    enableRowGroup: true,
    enablePivot: true,
    enableDrag: true,
  };

  const columnDefs = [
    { headerName: 'Entity ID', field: "EntityType", enablePivot: true },
    { headerName: 'Field Name', field: "name", enablePivot: true },
    { headerName: 'Label', field: "Label", enablePivot: true },
    { headerName: 'IsRequired', field: "IsRequired", enablePivot: true, cellRenderer: (params) => params.value ? 'Yes' : 'No' },
    { headerName: 'isQuickform', field: "IsQuickForm", enablePivot: true, cellRenderer: (params) => params.value ? 'Yes' : 'No' },
    { headerName: 'isFieldSecurity', field: "IsFieldSecurity", enablePivot: true, cellRenderer: (params) => params.value ? 'Yes' : 'No' },
    { headerName: 'Created By', field: "CreatedBY", enablePivot: true },
    { headerName: 'Status', field: 'Status', enablePivot: true, cellRenderer: (params) => params.value ? 'Active' : 'Inactive' }
  ];

  const gridOptions = {
    columnDefs,
    defaultColDef,
    rowHeight: 28,
    rowSelection: 'single',
    animateRows: true,
    pivotPanelShow: 'always',
    enableRangeSelection: true,
    enablePivotMode: true,
    enableCharts: true,
    chartThemes: ['ag-default', 'ag-material', 'ag-pastel', 'ag-vivid'],
    sideBar: {
      toolPanels: [
        {
          id: 'columns',
          labelDefault: 'Columns',
          toolPanel: 'agColumnsToolPanel',
        },
        {
          id: 'filters',
          labelDefault: 'Filters',
          toolPanel: 'agFiltersToolPanel',
        },
      ],
    },
    popupParent: document.body,
    onFirstDataRendered: (params) => {
      console.log('Data rendered');
    },
  };
console.log("Ram=>",formdata);

  useEffect(() => {
    setFormData(formdata.entity_name)
    setselectId(formdata.id)

  }, [formdata, reset]);


  const onSubmit = (data) => {
    console.log("Form Submitted", data);
  };

  const handleClear = () => {
    reset();
  };

  
  
  const EntityGet = async () => {    try {
      let res = await axiosInstance.get(`entity/session/${selectId}/`)
      res = res.data
      setRowData(res)
    } catch {

    }
  }

  const fieldmatch = async () => {

    try {
      let res = await axiosInstance.get(`entity/${selectId}/`);
      const { name, parent } = res.data;
      setEntName(parent);
      // Filter the name array for EntityType === 1
      const filteredNames = name.filter(field => field.EntityType ===selectId ).map(field => field.name);
      // Set the state with the filtered names
      setFieldName(filteredNames);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const UDC_data = async () => {
    try {
      let res = await axiosInstance.get("udc")
      const { column_type, input_type } = res.data;
      setUDCData(column_type);
      setInputTypeData(input_type);
    } catch {

    }
  }

  useEffect(() => {
    EntityGet()
    UDC_data()
    fieldmatch()

  }, [selectId]);



  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Check if the input already exists in the fetched fieldName array
    const exists = fieldName.includes(newValue);
    if (exists) {
      setError("Field name already exists!"); // Set error message
      setInputValue(""); // Clear input field
    } else {
      setError(""); // Clear error if no match
    }
  };
  // Handle input change with validation
  const handleInputChangeCh = (e) => {
    const value = e.target.value;
    setInputValueCh(value);

    // Validate the input: if out of range, clear the input and show error
    if (value < 1) {
      setErrorCh("Number must be between 1 and 255");
      setInputValueCh(""); // Clear the input
    } else if (value > 255) {
      setErrorCh("Number must be between 1 and 255");
      setInputValueCh(""); // Clear the input
    } else {
      setErrorCh(""); // Clear the error
      setInputValueCh(value); // Set the input value only if valid
    }


  };



  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        padding: 3,
        backgroundColor: "#fff",
        maxWidth: "100%",
        margin: "auto",
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
        <Typography variant="h6">{formData}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Grid container spacing={2}>
        <Grid item size={{ sm: 2, xs: 12 }}>
          <CustomInput
            name="fieldName"
            control={control}
            label="Field Name"
            value={inputValue} // Bind input value from state
            onChange={handleInputChange} // Handle changes
          />
          {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error */}
        </Grid>

        <Grid item size={{ sm: 2, xs: 12 }}>
          <CustomInput
            name="fieldType"
            control={control}
            label="Field Type"
            rules={{ required: "Field Type is required" }}
            select
          >
            {udcData.map((item) => (
              <MenuItem value={item.ValueId}>{item.Value}</MenuItem>
            ))}
          </CustomInput>
        </Grid>

        <Grid item size={{ sm: 2, xs: 12 }}>
          <CustomInput
            name="label"
            control={control}
            label="Label"
            type="text"
          />
        </Grid>

        <Grid item size={{ sm: 2, xs: 12 }}>
          <CustomInput
            name="character"
            control={control}
            label="Character"
            type="number"
            value={inputValueCh} // Bind input value from state
            onChange={handleInputChangeCh} // Handle changes with validation
          />
          {errorCh && <p style={{ color: "red" }}>{errorCh}</p>} {/* Show error message */}


        </Grid>

        <Grid item size={{ sm: 2, xs: 12 }}>
          <CustomInput
            name="entityRelation"
            control={control}
            label="Entity Relation"
            rules={{ required: "Entity Relation is required" }}
            select
          >
            {EntName.map((item) => (
              <MenuItem value={item.id}>{item.entity_name}</MenuItem>
            ))}
          </CustomInput>
        </Grid>

        <Grid item size={{ sm: 2, xs: 12 }}>
          <CustomInput
            name="fieldsRelation"
            control={control}
            label="Fields Relation"
            rules={{ required: "Fields Relation is required" }}
            select
          >
            {EntName.map((item) => (
              <MenuItem value={item.id}>{item.entity_name}</MenuItem>
            ))}
          </CustomInput>
        </Grid>

        <Grid item size={{ sm: 2, xs: 12 }}>
          <CustomInput
            name="inputType"
            control={control}
            label="Input Type"
            rules={{ required: "Input Type is required" }}
            select
          >
            {inputTypeData.map((item) => (
              <MenuItem value={item.ValueId}>{item.Value}</MenuItem>
            ))}
          </CustomInput>
        </Grid>

        <Grid item size={{ sm: 2, xs: 12 }}>
          <FormControlLabel
            control={
              <Controller
                name="editableAllowed"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
            }
            label="Editable Allowed"
          />
        </Grid>

        <Grid item size={{ sm: 2, xs: 12 }}>
          <FormControlLabel
            control={
              <Controller
                name="visibleAllowed"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
            }
            label="Visible Allowed"
          />
        </Grid>

        <Grid item size={{ sm: 2, xs: 12 }}>
          <FormControlLabel
            control={
              <Controller
                name="isRequired"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
            }
            label="Is Required"
          />
        </Grid>

        <Grid item size={{ sm: 2, xs: 12 }}>
          <FormControlLabel
            control={
              <Controller
                name="isQuickForm"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
            }
            label="Is Quick Form"
          />
        </Grid>

        <Grid item size={{ sm: 2, xs: 12 }}>
          <FormControlLabel
            control={
              <Controller
                name="isFieldSecurity"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />
            }
            label="Is Field Security"
          />
        </Grid>

        <Grid item size={{ xs: 12 }}>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} row>
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
        </Grid>
        <div style={{ margin: "0 0 10px 0" }}>
          <Grid item size={{ xs: 12 }} >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mr: 2 }}
            >
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClear}>
              Clear
            </Button>
          </Grid>
        </div>
      </Grid>
      <div
        className="ag-theme-alpine"
        style={{ height: 250, width: "100%", msOverflowY: "auto", }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          gridOptions={gridOptions}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowHeight={28}
          popupParent={document.body}
        />

      </div>

      <div className="From" style={{ margin: "10px 0 0 0" }}>
        <Grid item size={{ xs: 2 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mr: 2 }}
            style={{ marginLeft: "84%" }}
          >
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClear}>
            Clear
          </Button>
        </Grid>
      </div>
    </Box>

  );
};

export default LeadForm;
