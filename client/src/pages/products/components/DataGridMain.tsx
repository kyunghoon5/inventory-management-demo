import { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import ProductsMerged from '../data/ProductsMerged';
import TypeSelector from './TypeSelector';
import ProgessBar from './ProgessBar';
import TargetProgress from '../../../utils/math/TargetProgress';
import { ProductsMain } from '../../../types';

// const BASE_URL = import.meta.env.VITE_DB_URL2;
const Sever_33 = import.meta.env.VITE_DB_URL4;

const Watchdog_URL = import.meta.env.VITE_DB_URL3;

interface DataGridProps {
  filteredData: (data: ProductsMain[]) => ProductsMain[];
  backorders?: boolean;
}

const DataGridMain: React.FC<DataGridProps> = ({
  filteredData,
  backorders,
}) => {
  const [type, setType] = useState(1);
  const [vendorType, setVendorType] = useState(1);
  // const [classType, setClassType] = useState(1);
  const { data, productsMain2 } = ProductsMerged({
    type,
    vendorType,
    // classType,
  });
  const { targetProgessCal } = TargetProgress();

  const filteredDataProps = filteredData(data);

 


  useEffect(() => {
    setType(1);
  }, []);

  useEffect(() => {
    setVendorType(1);
  }, [type]);

  // useEffect(() => {
  //   setClassType(1);
  // }, [type, vendorType]);

  const VendorMenuItem =
    type === 1
      ? ['ALL', ...new Set(productsMain2.map((item) => item.vendno))]
      : type === 2
      ? [
          'ALL',
          ...new Set(
            productsMain2
              .filter((item) => item.class !== 'RB')
              .map((item) => item.vendno)
          ),
        ]
      : [
          'ALL',
          ...new Set(
            productsMain2
              .filter((item) => item.class == 'RB')
              .map((item) => item.vendno)
          ),
        ];

  // const ClassMenuItem =
  //   type === 1
  //     ? ['ALL', ...new Set(productsMain2.map((item) => item.class))]
  //     : type === 2
  //     ? [
  //         'ALL',
  //         ...new Set(
  //           productsMain2
  //             .filter((item) => item.class !== 'RB')
  //             .map((item) => item.class)
  //         ),
  //       ]
  //     : [
  //         'ALL',
  //         ...new Set(
  //           productsMain2
  //             .filter((item) => item.class == 'RB')
  //             .map((item) => item.class)
  //         ),
  //       ];

  const columns: GridColDef[] = [
    {
      field: 'percentile',
      headerName: 'Rank',
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        let style = {};
        if (
          params.value == 'A+' ||
          params.value == 'A' ||
          params.value == 'A-'
        ) {
          style =
            'bg-green-300 font-bold w-8 h-8 flex items-center justify-center rounded-md';
        } else if (
          params.value == 'B+' ||
          params.value == 'B' ||
          params.value == 'B-'
        ) {
          style =
            'bg-blue-300 font-bold w-8 h-8 flex items-center justify-center rounded-md';
        } else if (
          params.value == 'C+' ||
          params.value == 'C' ||
          params.value == 'C-'
        ) {
          style =
            'bg-orange-300 font-bold w-8 h-8 flex items-center justify-center rounded-md';
        } else if (
          params.value == 'D+' ||
          params.value == 'D' ||
          params.value == 'D-'
        ) {
          style =
            'bg-red-300 font-bold w-8 h-8 flex items-center justify-center rounded-md';
        } else {
          style =
            'bg-gray-300 font-bold w-8 h-8 flex items-center justify-center rounded-md';
        }
        return <div className={`${style}`}>{params.value}</div>;
      },
    },
    {
      field: 'descrip',
      headerName: 'Product',
      flex: 2,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <div className=" text-center font-bold text-gray-700 ">
            <div className="flex justify-center items-center text-center font-bold text-gray-700 ">
              {params.value}
              {data[params.id as number].sale_on > 0 ? (
                <img className=" w-6  " src="/saletag.png" />
              ) : (
                ''
              )}
            </div>

            <div className=" font-normal">
              {data[params.id as number].class}
              {data[params.id as number].length_cat
                ? ' | ' + data[params.id as number].length_cat
                : ''}
              {data[params.id as number].brand_name
                ? ' | ' + data[params.id as number].brand_name
                : ''}
            </div>
          </div>
        );
      },
    },
    {
      field: 'wowTrend',
      headerName: 'WoW Trend',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <div className="text-center font-bold ">
            <div className="items-center   flex flex-col">
              <img className="" src="/trendingGraph.JPG" />
              <div className="flex items-center">
                {params.value > 0 ? (
                  <div className="text-green-400 flex items-center gap-1">
                    {params.value | 0}% <FiArrowUp size={20} />
                  </div>
                ) : (
                  <div className="text-orange-500 flex items-center gap-1">
                    {params.value | 0}%
                    <FiArrowDown size={20} />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      },
    },

    {
      field: 'onhand',
      headerName: 'On Hand / Target',
      flex: 1,
      minWidth: 150,

      headerAlign: 'center',
      align: 'center',
      renderCell(params) {
        let progress = parseInt(
          targetProgessCal(
            data[params.id as number].onhand,
            data[params.id as number].target_qtyshp
          ).toString()
        );
        if (progress > 100) {
          progress = 100;
        }
        if (isNaN(progress)) {
          progress = 100;
        }

        return (
          <div
            className={` font-bold ${
              progress > 70 ? 'text-green-400' : 'text-orange-400'
            }`}
          >
            <div className="items-center   flex flex-col">
              <ProgessBar progress={progress} height={17} />
              <div className="flex items-center">
                <div>{params.value}&nbsp;/&nbsp;</div>
                <div>{Math.floor(data[params.id as number].target_qtyshp)}</div>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      field: 'num_of_pd',
      headerName: 'In Transit',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell(params) {
        return (
          <div>
            <Link
              to={`/vendor/${data[params.id as number].vendno}/${
                data[params.id as number].descrip
              }`}
            >
              <button className="border rounded-lg shadow-md px-6 py-2 ml-3 hover:shadow-lg hover:bg-blue-200">
                {params.value}
              </button>
            </Link>
          </div>
        );
      },
    },
    {
      field: 'days_left',
      headerName: 'Days Left',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell(params) {
        return params.value.toFixed(0) > 0 ? (
          <div>+&nbsp;{params.value.toFixed(0)} days</div>
        ) : (
          <div>+&nbsp;{params.value.toFixed(0)} day</div>
        );
      },
    },
    {
      field: 'qtybo',
      headerName: 'Back Orders',
      flex: 1,
      minWidth: 180,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'custom-cell',
    },
    {
      field: 'class',
      headerName: 'Class',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'custom-cell',
    },
    {
      field: 'length_cat',
      headerName: 'Length_cat',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'custom-cell',
    },
    {
      field: 'brand_name',
      headerName: 'Brand',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      cellClassName: 'custom-cell',
    },
    {
      field: 'Watchdog',
      headerName: 'Watchdog',
      flex: 1,
      minWidth: 150,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      renderCell: () => {
        return (
          <div>
            <a href={`${Sever_33}`} target="_blank" rel="noopener noreferrer">
              <button className="border rounded-lg shadow-md px-2 py-2 ml-3 hover:shadow-lg hover:bg-blue-200">
                Watchdog2
              </button>
            </a>
            <a
              href={`${Watchdog_URL}WATCHDOG`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="border rounded-lg shadow-md px-2 py-2 ml-3 hover:shadow-lg hover:bg-blue-200">
                Watchdog
              </button>
            </a>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-8 pt-0">
      <div className="flex">
        <TypeSelector
          type={type}
          setType={setType}
          label={'Type'}
          menuItem={['ALL', 'WIG', 'BRAID']}
        />
        <TypeSelector
          type={vendorType}
          setType={setVendorType}
          label={'Vendor'}
          menuItem={VendorMenuItem}
        />
        {/* <TypeSelector
          type={classType}
          setType={setClassType}
          label={'Class'}
          menuItem={ClassMenuItem}
        /> */}
      </div>

      <DataGrid
        autoHeight
        slots={{ toolbar: GridToolbar }}
        loading={data.length === 0}
        componentsProps={{
          toolbar: {
            csvOptions: { disableToolbarButton: true },
            printOptions: { disableToolbarButton: true },
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 250 },
          },
        }}
        rows={filteredDataProps ? filteredDataProps : data}
        columns={columns}
        disableRowSelectionOnClick
        initialState={{
          columns: {
            columnVisibilityModel: {
              qtybo: backorders ? true : false,
              class: false,
              length_cat: false,
              brand_name: false,
            },
          },
        }}
        rowHeight={80}
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
