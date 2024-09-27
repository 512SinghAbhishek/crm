import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useState, useEffect, useRef } from "react";
import { Box, Button, Drawer, FormControl, InputLabel, MenuItem, Modal, Paper, Select, Slide } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import BreadcrumbsComponent from "../components/CustomComponent/BreadcrumbsComponent";
import AddEntityForm from "../components/entity/AddEnitityForm"; // Ensure the path is correct
import EditEntityForm from "../components/entity/EditEntityForm"; // Ensure the path is correct
import EntityFieldsForm from "../components/entity/EntityField"; // Ensure the path is correct
import { AgGridReact } from 'ag-grid-react'; // Import AgGridReact
import axiosInstance from '../utils/axiosInstance';

const EntityMaster = () => {
  const [drawerPosition, setDrawerPosition] = useState("right");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [activeForm, setActiveForm] = useState("");
  const [formData, setFormData] = useState();
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(null);
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value)
  }

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
    { headerName: 'Entity ID', field: 'id', enablePivot: true },
    { headerName: 'Entity Name', field: 'entity_name', enablePivot: true },
    { headerName: 'Short Name', field: 'short_name' },
    { headerName: 'Long Name', field: 'long_name', enablePivot: true },
    { headerName: 'Plural Name', field: 'plural_name', enablePivot: true },
    { headerName: 'Created By', field: 'created_by', enablePivot: true },
    { headerName: 'Created On', field: 'created_on', enablePivot: true },
    { headerName: 'Updated By', field: 'updated_by', enablePivot: true },
    { headerName: 'Updated On', field: 'updated_on', enablePivot: true },
    { headerName: 'Status', field: 'status', enablePivot: true, cellRenderer: (params) => params.value ? 'Active' : 'Inactive' }
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

  // useEffect(() => {
  //   // Set row data here. For now, it's just a dummy example
  //   setRowData([
  //     { id: 1, entity_name: "Entity 1", short_name: "E1", long_name: "Entity One", plural_name: "Entities", created_by: "Admin", created_on: "2023-09-23", updated_by: "Admin", updated_on: "2023-09-24", status: true },
  //     { id: 2, entity_name: "Entity 2", short_name: "E2", long_name: "Entity Two", plural_name: "Entities", created_by: "User", created_on: "2023-09-23", updated_by: "Admin", updated_on: "2023-09-24", status: false },
  //   ]);
  // }, []);

  const handleOpenDrawer = (position, form) => {
    setDrawerPosition(position);
    setActiveForm(form);
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleFormSubmit = (formData) => {
    // console.log("Form Data Submitted:", formData);
    setRowData((prev) => [...prev, formData]);
    handleCloseDrawer();
  };

  const getTransitionDirection = () => {
    switch (drawerPosition) {
      case "left":
        return "right";
      case "top":
        return "down";
      case "right":
        return "left";
      default:
        return "right";
    }
  };

  const EntityGet = async () => {
    try {
      let res = await axiosInstance.get("entity")
      res = res.data.message
      // console.log("Ram",res);
      
      setRowData(res)
    } catch {

    }
  }

  useEffect(() => {
    // Set row data here. For now, it's just a dummy example
    EntityGet()
  }, []);

  const handleEdit = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    if (selectedNodes.length === 0) {
        alert('Please select one row to edit.');
        return;
    }
    const selectedData = selectedNodes[0].data;
    handleOpenDrawer("top","editEntity")
    setFormData(selectedData);
    setOpenDrawer(true);
};

const handleEntryField = () => {
  const selectedNodes = gridRef.current.api.getSelectedNodes();
  if (selectedNodes.length === 0) {
      alert('Please select one row to edit.');
      return;
  }
  const selectedData = selectedNodes[0].data;
  handleOpenDrawer("top","entityFields")
  setFormData(selectedData);
  setOpenDrawer(true);
};



  return (
    
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.1rem 1rem',
        borderBottom: '2px solid gray',
        maxHeight: "50px"
      }}>
        <BreadcrumbsComponent />
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="select-my-views-label" style={{ fontSize: ".8rem" }}>
              List
            </InputLabel>
            <Select
              labelId="select-my-views-label"
              id="select-my-views"
              label="My Views"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200, // Adjust this as necessary
                  },
                },
              }}
              sx={{
                height: 30, // Set height for the Select
                "& .MuiSelect-select": {
                  padding: '0px', // Remove default padding
                  height: '25px', // Set the height of the select area
                },
                "& .MuiInputBase-input": {
                  height: '30px', // Set the height of the input field
                  display: 'flex',
                  alignItems: 'center', // Center align items vertically
                },
              }}
            >
              <MenuItem value={'Option 1'}>Option 1</MenuItem>
              <MenuItem value={'Option 2'}>Option 2</MenuItem>
              <MenuItem value={'Option 3'}>Option 3</MenuItem>
            </Select>
          </FormControl>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleEntryField}

            style={{ fontSize: ".8rem", padding: "4px 9px" }}
          >
            Entity Fields
          </Button>
          <Button
            variant="contained"
            color="warning"
            // onClick={() => handleOpenDrawer("top", "editEntity")}
            onClick={handleEdit}
            style={{ fontSize: ".8rem", padding: "4px 9px" }}
          >
            Edit Entity
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleOpenDrawer("right", "addEntity")}
            style={{ fontSize: ".8rem", padding: "4px 9px" }}
            startIcon={<AddCircle />}
          >
            Add Entity
          </Button>
        </Box>
        </div>
        <div
        className="ag"
        style={{ margin: "10px" }}
      >

        <div
          className="ag-theme-alpine"
          style={{ height: 400, width: "100%" }}
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
</div>
        <Drawer
          hideBackdrop={true}
          elevation={0}
          anchor={drawerPosition}
          open={openDrawer}
          onClose={handleCloseDrawer}
          PaperProps={{
            sx: {
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }
          }}
        >
          <Slide
            direction={getTransitionDirection()}
            in={openDrawer}
            mountOnEnter
            unmountOnExit
          >
            <Box
              sx={{
                width: drawerPosition === "top" ? "100%" : 400,
                margin: drawerPosition === "right" ? 0 : 2,
                display: "flex",
                alignItems: drawerPosition === "top" && "center",
                justifyContent: "center",
                backgroundColor: drawerPosition === "right" && "#fff",
                height: drawerPosition === "right" ? "100%" : "auto",
              }}
            >
              {activeForm === "addEntity" && (
                <AddEntityForm
                  open={openDrawer}
                  onClose={handleCloseDrawer}
                  onSubmit={handleFormSubmit}
                />
              )}
              {activeForm === "editEntity" && (
                
                <EditEntityForm
                  onClose={handleCloseDrawer}
                  onSubmit={handleFormSubmit}
                  formdata={formData}
                  
                />
              )}
              {activeForm === "entityFields" && (
                <EntityFieldsForm
                  onClose={handleCloseDrawer}
                  onSubmit={handleFormSubmit}
                  formdata={formData}
                />
              )}
            </Box>
          </Slide>
        </Drawer>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Paper
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              padding: 4,
            }}
          >
            <AddEntityForm
              open={openModal}
              onClose={() => setOpenModal(false)}
              onSubmit={handleFormSubmit}
            />
          </Paper>
        </Modal>
      </div>
    // </div>
  );
};

export default EntityMaster;
