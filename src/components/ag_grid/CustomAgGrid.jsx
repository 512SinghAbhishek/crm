import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css"; // Ensure correct theme is imported
import { carColumns, carData } from "../../data/gridData";
import { useState, useRef } from "react";

const CustomAgGrid = ({
  headers = carData,
  rows = carColumns,
  gridHeight = 500,
  theme = "ag-theme-quartz-dark",
}) => {
  const gridRef = useRef(null);

  // Default column definitions with filtering enabled
  const defaultColDef = {
    flex: 1,
    minWidth: 130,
    editable: false,
    resizable: true,
    sortable: true,
    filter: true, // Enable filter for all columns
    floatingFilter: true, // Show floating filter
    enableValue: true,
    enableRowGroup: true,
    enablePivot: true,
    enableDrag: true,
  };



  const gridOptions = {
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
        { id: 'columns', labelDefault: 'Columns', toolPanel: 'agColumnsToolPanel' },
        { id: 'filters', labelDefault: 'Filters', toolPanel: 'agFiltersToolPanel' },
      ],
    },
    popupParent: document.body,
    onFirstDataRendered: (params) => {
      console.log('Data rendered');
    },
  };

  return (
    <div className={theme} style={{ height: gridHeight }}>
      <AgGridReact
        ref={gridRef}
        rowData={headers.length ? headers : carData}
        columnDefs={rows.length ? rows : carColumns}
        defaultColDef={defaultColDef}
        gridOptions={gridOptions}
        cellFadeDuration={3}
      />
    </div>
  );
};

export default CustomAgGrid;
