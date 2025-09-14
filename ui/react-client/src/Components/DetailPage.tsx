import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface DetailPageProps {
  selectedItem: string;
}

const DetailPage: React.FC<DetailPageProps> = ({ selectedItem }) => {
  return (
    <Box p={3}>
      <Typography variant="h4">Detail Page</Typography>
      <Typography variant="body1">
        You selected: {selectedItem}
      </Typography>
    </Box>
  );
};

export default DetailPage;