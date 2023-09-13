import { useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridEventListener,
} from '@mui/x-data-grid';

import { NewLaunchType } from '../../../types';
import NewLaunchAPI from '../../../api/NewLaunchAPI';

interface DataGridProps {
  setNewLaunchImageNumber: (number: number) => void;
  setProgessInfo: (string:string) => void
}


const DataGridMain: React.FC<DataGridProps> = ({
  setNewLaunchImageNumber,
  setProgessInfo,
}) => {
  const { newLaunchData } = NewLaunchAPI();

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    setNewLaunchImageNumber(params.row.id);
    setProgessInfo(params.row.descrip)
  };

  let data: NewLaunchType[] = [];
  data = newLaunchData.map((item: NewLaunchType, index) => ({
    id: index,
    class: item.class.trim(),
    descrip: item.descrip.trim(),
    recqty: item.recqty,
    onhand: item.onhand,
    sample_qty: item.sample_qty,
    start_dte: item.start_dte,
  }));

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const removeTime = (params: string) =>
    new Date(params).toLocaleDateString('en-US', {
      timeZone: 'UTC',
    });

  const columns: GridColDef[] = [
    {
      field: 'class',
      headerName: 'Class',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell(params) {
        return <div>{params.value}</div>;
      },
    },
    {
      field: 'descrip',
      headerName: 'Descrip',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell(params) {
        return <div>{params.value}</div>;
      },
    },
    {
      field: 'recqty',
      headerName: 'Recqty',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'custom-cell',
    },
    {
      field: 'sample_qty',
      headerName: 'Sample_Qty',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return <div>{params.value}</div>;
      },
    },
    {
      field: 'onhand',
      headerName: 'Onhand',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'custom-cell',
    },

    {
      field: 'start_dte',
      headerName: 'Start_date',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return <div>{removeTime(params.value)}</div>;
      },
    },
  ];

  return (
    <div className="h-full">
      <DataGrid
        onRowClick={handleRowClick}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        loading={data.length === 0}
        rows={data}
        columns={columns}
        rowHeight={40}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sx={{
          '.MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-row:hover': {
            cursor: 'pointer',
          },
          '.MuiDataGrid-iconButtonContainer': {
            visibility: 'visible',
          },
          '.MuiDataGrid-sortIcon': {
            opacity: 'inherit !important',
          },
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
          borderRadius: '8px',
        }}
      />
    </div>
  );
};

export default DataGridMain;
