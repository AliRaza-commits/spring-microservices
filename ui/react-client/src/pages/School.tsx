import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchCall } from '../helpers/fetchCall';

interface RowDef {
  id: number,
  [field: string]: any
}

const SchoolDetail = () => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0
  });
  const [sortingModel, setSortingModel] = useState<GridSortModel>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState<RowDef[]>();
  const [id,setId] = useState('');
  const [totalRow, setTotalRow] = useState(1);
  const navigate = useNavigate();
  
 
  useEffect(() => {
    let isMounted = true;
    const deleteData = async () => {
      try {
          const headers =  {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
          };
          const body:any = [];
          await fetchCall('delete',
            `${process.env.REACT_APP_GATEWAY_URL}/api/v1/schools/delete/${id}`,
            headers,
            body
          );

          if (isMounted) {
            setRefresh((state) => !state);
          }
  
      } catch(error) {
          console.log(error);
      } finally {
        setDeleting(false);
      }
  }

  if (deleting) {
    deleteData();
  }

  return () => {
    isMounted = false;
  }
  },[id,deleting])
 
  const deleteRec = (id: string) => {
    setDeleting(true);
    setId(id);
  }

  const column: GridColDef[] = [
    { field:  'id', headerName: 'Id', width: 200 },
    { field:  'name', headerName: 'Name', width: 500 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 500,
      renderCell: (params) => {
        return (
          <>
            <Button sx={{ marginRight: 2 }} variant='contained' onClick={() => navigate(`/school/edit/${params.id}`)}>Edit</Button>
            <Button variant='contained' color='error' onClick={() => deleteRec(params.id as string)}  >Delete</Button>
          </>
        )
      }
    }
  ];

  useEffect(() => {
    const fetchApi = async() => {
      setLoading(true);

      const params = new URLSearchParams({
        page: (paginationModel.page).toString(),
        pageSize: paginationModel.pageSize.toString(),
        ...(sortingModel[0] && {
          sort: sortingModel[0].sort || 'asc',
          field: sortingModel[0].field
        })
      })

      try {
        const response = await fetch(`${process.env.REACT_APP_GATEWAY_URL}/api/v1/schools/list?${params}`,{
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
          }
        });
        const result = await response.json();
        setData(result.content);
        setTotalRow(result.totalElements);
      } catch(error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = "/";
      } finally {
        setLoading(false);
      }
    }

    fetchApi();
  },[paginationModel,sortingModel, refresh])

  return (
    <div style={{ height: 600, width: '100%' }}>
       <Box display="flex" justifyContent="space-between" sx={{ m:2 }}>
       <Typography variant="h4" component="h4">
        School
      </Typography>
      <Button variant='contained' onClick={() => navigate('/school/create')}>Create</Button>
       </Box>
      <DataGrid
      columns={column}
      pageSizeOptions={[1,10,25,100]}
      onPaginationModelChange={setPaginationModel}
      onSortModelChange={setSortingModel}
      loading={loading}
      rows={data}
      rowCount={totalRow}
      paginationMode='server'
      sortingMode='server'
      />
    </div>
  );
};

export default SchoolDetail;