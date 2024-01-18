import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CircularProgress, Typography } from '@mui/material';
import dayjs from 'dayjs';

const ItemDetails = () => {
  const { imdbID } = useParams();
  const { items } = useSelector((state) => state.data);
  const navigate = useNavigate();
  const item = items?.find((item) => item.imdbID === imdbID);

  if (!item) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const detailsToShow = [
    { label: 'Title', value: item.Title },
    { label: 'Year', value: item.Year },
    { label: 'Type', value: item.Type },
    { label: 'ID', value: item.imdbID },
  ];

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card>
      <Box p={4} textAlign="center">
  {detailsToShow.map((detail, index) => (
    <Typography key={index} variant="subtitle1" gutterBottom>
      {detail.label}:
      {detail.label === 'Year' ? dayjs(detail.value).year() : ` ${detail.value}`}
    </Typography>
  ))}
  <img
    src={item.Poster}
    alt="Poster"
    style={{ width: '15rem', height: '17rem', marginBottom: '1rem' }}
    onError={(e) => {
      e.target.src = 'כתובת התמונה לא קיים';
    }}
  />
  <Box mt={2}>
    <Button
      variant="contained"
      color="primary"
      onClick={() => navigate('/')}
    >
      הקודם
    </Button>
  </Box>
</Box>
      </Card>
    </Box>
  );
};

export default ItemDetails;
