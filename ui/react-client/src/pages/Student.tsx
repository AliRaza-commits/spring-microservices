import React, { useEffect, useState } from 'react';
import { DataGrid, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchCall } from '../helpers/fetchCall';

interface RowDef {
  id: number,
  [field: string]: any
}

const StudentDetail = () => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0
  });
  const [sortingModel, setSortingModel] = useState<GridSortModel>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RowDef[]>();
  const [totalRow, setTotalRow] = useState(1);
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [id, setId] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const deleteData = async() => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+localStorage.getItem('token')
        };
        const body:any = [];
        const resposne = await fetchCall('delete', `${process.env.REACT_APP_GATEWAY_URL}/api/v1/students/delete/${id}`,
          headers,
          body
        )
        
      } catch(error) {
        console.log(error);
      } finally {
        setDeleting(false);
        setRefresh((state) => !state);
      }
    }

    if (deleting) {
      deleteData()
    }
    return () => {
      isMounted = false;
    }
    
  },[deleting])

  const deleteData = (id: string) => {
    setDeleting(true);
    setId(id);
  }

  const column = [
    { field:  'id', headerName: 'Id', width: 200 },
    { field:  'firstName', headerName: 'First Name', width: 200 },
    { field:  'lastName', headerName: 'Last Name', width: 200 },
    { field:  'email', headerName: 'Email', width: 200 },
    {
      field: 'actions',
      width: 400,
      renderCell: (param:any) => {
        return (
          <>
            <Button sx={{ marginRight: 2 }} variant='contained' onClick={() => navigate(`/student/edit/${param.id}`)} >Edit</Button>
            <Button color='error' variant='contained' onClick={() => deleteData(param.id)} >Delete</Button>
          </>
        )
      }
    }
  ];

  useEffect(() => {
    const fetchApi = async() => {
      console.log("fetch called");
      setLoading(true);

      const params = new URLSearchParams({
        pageNumber: (paginationModel.page).toString(),
        pageSize: paginationModel.pageSize.toString(),
        ...(sortingModel[0] && {
          sort: sortingModel[0].sort || 'asc',
          field: sortingModel[0].field
        })
      })

      try {
        const response = await fetch(`${process.env.REACT_APP_GATEWAY_URL}/api/v1/students/list?${params}`,{
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
  },[paginationModel,sortingModel,refresh])

  return (
    <div style={{ width: '100%', margin: '2', padding: '2' }}>
      <Box display={'flex'} justifyContent={'space-around'} sx={{ m: 2 }}>
        <Typography variant="h4" component="h4">
          Students
        </Typography>
        <Button variant='contained' onClick={() => navigate('/student/create')}>Create</Button>
      </Box>
      
      <DataGrid
      columns={column}
      pageSizeOptions={[2,5,10,25,100]}
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

export default StudentDetail;