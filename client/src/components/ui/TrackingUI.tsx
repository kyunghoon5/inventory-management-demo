import { useState } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

import { BsThreeDots } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import ReceiveContorlPanelAPI from '../../api/ReceiveControlPanelAPI';
import { Receive } from '../../types';

// const BASE_URL = import.meta.env.VITE_DB_URL2;
const Sever_33 = import.meta.env.VITE_DB_URL4;

interface TrackingUIProps {
  dashbordValue: number;
  vendorName?: string;
  details?: boolean;
  onCell?: string;
  descrip?: string;
}

const TrackingUI: React.FC<TrackingUIProps> = ({
  dashbordValue,
  vendorName,
  details,
  onCell,
  descrip,
}) => {
  const navigate = useNavigate();

  const { receiveCP, loading } = ReceiveContorlPanelAPI();

  let data: Receive[] = [];
  if (vendorName === 'all') {
    data = receiveCP.map((item: Receive, index) => ({
      id: index,
      invno: item.invno.trim(),
      vendno: item.vendno.trim(),
      purdate: item.purdate,
      shpdate: item.shpdate,
      reqdate: item.reqdate,
      recdate: item.recdate,
      invoiceDes: item.invoiceDes,
    }));
  } else {
    data = receiveCP
      .filter((item: Receive) => item.vendno.trim() === vendorName?.trim())
      .map((item: Receive, index) => ({
        id: index,
        invno: item.invno.trim(),
        vendno: item.vendno.trim(),
        purdate: item.purdate,
        shpdate: item.shpdate,
        reqdate: item.reqdate,
        recdate: item.recdate,
        invoiceDes: item.invoiceDes,
      }));
  }

  if (descrip) {
    data = receiveCP
      .filter(
        (item: Receive) =>
          item.vendno.trim() === vendorName?.trim() &&
          item.invoiceDes?.includes(descrip)
      )

      .map((item: Receive, index) => ({
        id: index,
        invno: item.invno.trim(),
        vendno: item.vendno.trim(),
        purdate: item.purdate,
        shpdate: item.shpdate,
        reqdate: item.reqdate,
        recdate: item.recdate,
        invoiceDes: item.invoiceDes,
      }));
  }

  const [paginationModel, setPaginationModel] = useState({
    pageSize: dashbordValue,
    page: 0,
  });

  const removeTime = (params: string) =>
    new Date(params).toLocaleDateString('en-US', {
      timeZone: 'UTC',
    });

  const convertTime = (params: string) => new Date(params).getTime();

  const columns: GridColDef[] = [
    {
      field: 'invoiceDes',
      headerName: 'Descrip',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell() {
        return <div>{descrip}</div>;
      },
    },
    {
      field: 'invno',
      headerName: 'Invono',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'custom-cell',
    },
    {
      field: 'vendno',
      headerName: 'Vendno',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'custom-cell',
    },

    {
      field: 'purdate',
      headerName: 'PURdate',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <div className=" text-center ">
            <div
              className={`w-28 h-5 border rounded-lg ${
                convertTime(params.value) < new Date().getTime()
                  ? 'bg-green-300'
                  : 'bg-gray-200'
              }`}
            ></div>
            {params.value === null ? undefined : removeTime(params.value)}
          </div>
        );
      },
    },

    {
      field: 'shpdate',
      headerName: 'SHPdate',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <div className=" text-center ">
            <div
              className={`w-28 h-5 border rounded-lg ${
                convertTime(params.value) < new Date().getTime()
                  ? 'bg-green-300'
                  : 'bg-gray-200'
              }`}
            ></div>
            {params.value === null ? undefined : removeTime(params.value)}
          </div>
        );
      },
    },

    {
      field: 'reqdate',
      headerName: 'EXPdate',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <div className=" text-center ">
            <div
              className={`w-28 h-5 border rounded-lg ${
                convertTime(params.value) < new Date().getTime()
                  ? 'bg-green-300'
                  : 'bg-gray-200'
              }`}
            ></div>
            {params.value === null ? undefined : removeTime(params.value)}
          </div>
        );
      },
    },

    {
      field: 'recdate',
      headerName: 'RECdate',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <div className=" text-center ">
            <div
              className={`w-28 h-5 border rounded-lg ${
                params.value !== null &&
                convertTime(params.value) < new Date().getTime()
                  ? 'bg-green-300'
                  : 'bg-gray-200'
              }`}
            ></div>
            {params.value === null ? undefined : removeTime(params.value)}
          </div>
        );
      },
    },
    {
      field: 'Details',
      headerName: 'Details',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            <a
              href={`${Sever_33}receive/${params.row.invno}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border rounded-lg shadow-md px-6 py-2 ml-3 hover:shadow-lg hover:bg-blue-200">
                <BsThreeDots />
              </button>
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <DataGrid
        autoHeight
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        columnVisibilityModel={{
          Details: details ? true : false,
          invoiceDes: descrip ? true : false,
        }}
        componentsProps={{
          toolbar: {
            csvOptions: { disableToolbarButton: true },
            printOptions: { disableToolbarButton: true },
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 250 },
          },
        }}
        onCellClick={(params) => {
          if (onCell === 'on') navigate(`/vendor/${params.row.vendno}`);
        }}
        loading={loading}
        rows={data}
        columns={columns}
        rowHeight={80}
        paginationModel={paginationModel}
        disableRowSelectionOnClick
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

export default TrackingUI;
