import React, { useEffect, useState } from "react";
import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSearch,
  fetchData,
  fetchDataSuccess,
  setSearchTerm as setSearchTermAction,
  toggleSortOrder,
  updateFilteredItems,
} from "../redux/dataSlice";
import { sortItemsdata } from "../redux/dataOperations";
import Cards from "./Cards";
import styled from "@emotion/styled";
import { searchItems } from "../redux/dataOperations";

export const ButtonStyle = styled(Button)`
  text-transform: none;
  background: linear-gradient(#e66465, #9198e5);
  color: black;
  font-weight: bold;
  height: 48px;
  padding: 0 30px;
  margin-right: 10px;
`;

const DataItems = () => {
  const dispatch = useDispatch();
  const { loading, items, error, searchTerm, sortOrder, filteredItems } =
    useSelector((state) => state.data);
  const [viewMode, setViewMode] = useState("List");
  const [prevFilteredItems, setPrevFilteredItems] = useState([]);
  console.log("filteredItems:", filteredItems); // Add this line

  useEffect(() => {
    setPrevFilteredItems(filteredItems);
  }, [filteredItems]);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDataSuccess(items));
  }, [dispatch, items, searchTerm]);

  const handleToggleView = () => {
    setViewMode((prevMode) => (prevMode === "List" ? "Grid" : "List"));
  };

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    dispatch(setSearchTermAction(newSearchTerm));
    const filteredItems = searchItems(items, newSearchTerm);
    dispatch(updateFilteredItems(filteredItems));
  };
  
  const handleClearSearch = () => {
    dispatch(clearSearch());
  };

  const handleRefresh = () => {
    dispatch(fetchData());
  };

  const handleToggleSortOrder = () => {
    dispatch(toggleSortOrder());
    const sortedItems = sortItemsdata(items, sortOrder);
    dispatch(fetchDataSuccess(sortedItems));
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Box sx={{ mt: 5, ml: 5 }}>
        <ButtonStyle onClick={handleToggleView}>Toggle View</ButtonStyle>
        <ButtonStyle onClick={handleRefresh}>Refresh </ButtonStyle>
        <ButtonStyle onClick={handleToggleSortOrder}>Sort Order</ButtonStyle>
        <TextField
          sx={{
            height: "48px",
            mr:2,
            "& .MuiInputBase-root": {
              height: 48,
            }
          }}
          label="Search field"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <ButtonStyle onClick={handleClearSearch}>Clear </ButtonStyle>
        <Cards viewMode={viewMode} items={filteredItems} />
      </Box>
    </>
  );
};

export default DataItems;
