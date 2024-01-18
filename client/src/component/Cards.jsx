import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Input,
  List,
  Button,
  Typography,
  Card,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setPreviousItemTitle, updateItem } from "../redux/dataSlice";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const StyledBox = styled(Box)`
  padding: 10px;
  border: 2px solid transparent;
  border-image: linear-gradient(#e66465, #9198e5);
  border-image-slice: 1;
  margin-bottom: 1rem;
  border-radius: 50%;
`;

const StyledCard = styled(Card)`
  width: 100%;
  max-width: 40rem;
  display: flex;
  gap: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  margin-bottom: 2rem;
`;

const StyledImageBox = styled(Box)`
  width: 15rem;
  height: 15rem;
  overflow: hidden;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    border-radius: 25px;
  }
`;

const StyledContentBox = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`;

const Cards = ({ viewMode }) => {
  const { items, filteredItems } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const [itemInputValues, setItemInputValues] = useState({});
  const [editingItemId, setEditingItemId] = useState(null);
  const navigate = useNavigate();
  const ContainerComponent = viewMode === "Grid" ? Grid : List;

  useEffect(() => {
    console.log("filteredItems in Cards:", filteredItems);
  }, [filteredItems]);

  const handleInputChange = (e, imdbID) => {
    const updatedValue = e.target.value;
    setItemInputValues((prevValues) => ({
      ...prevValues,
      [imdbID]: updatedValue,
    }));
  };

  const handleInputBlur = (imdbID, previousTitle) => {
    const editedTitle = itemInputValues[imdbID];
    dispatch(setPreviousItemTitle(previousTitle));
    if (editedTitle && editedTitle !== previousTitle) {
      dispatch(
        updateItem({
          item: { imdbID, Title: editedTitle },
          editedTitle,
          previousTitle,
        })
      );
    }
    setEditingItemId(null);
    setItemInputValues((prevValues) => ({
      ...prevValues,
      [imdbID]: "",
    }));
  };

  const handleInputFocus = (itemId) => {
    setEditingItemId(itemId);
    setItemInputValues((prevValues) => ({
      ...prevValues,
      [itemId]: items.find((item) => item.imdbID === itemId).Title,
    }));
  };

    return (
      <Box sx={{ flexGrow: 1 }}>
        <ContainerComponent container spacing={2}>
          {filteredItems.length === 0
            ? items.map((item, index) => (
                <ContainerComponent item key={index} xs={12} sm={6} md={4} lg={3}>
                  <StyledCard key={index}>
                    <StyledImageBox>
                      <img
                        alt="item"
                        src={item.Poster}
                        onClick={() => navigate(`item/${item.imdbID}`)}
                      />
                    </StyledImageBox>
                    <StyledContentBox>
                      <StyledBox>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography>Title:</Typography>
                          <Input
                            sx={{ marginLeft: 2 }}
                            value={itemInputValues[item.imdbID] || item.Title}
                            onChange={(e) => handleInputChange(e, item.imdbID)}
                            onFocus={() => handleInputFocus(item.imdbID)}
                            onBlur={() => handleInputBlur(item.imdbID, item.Title)}
                          />
                        </Box>
                        {editingItemId === item.imdbID && (
                          <Button
                            sx={{ textTransform: "none" }}
                            onClick={() => handleInputBlur(item.imdbID, item.Title)}
                          >
                            Update
                          </Button>
                        )}
                      </StyledBox>
    
                      <StyledBox>
                        <Typography>Year: {item.Year}</Typography>
                      </StyledBox>
                    </StyledContentBox>
                  </StyledCard>
                </ContainerComponent>
              ))
            : filteredItems.map((item, index) => (
                <ContainerComponent item key={index} xs={12} sm={6} md={4} lg={3}>
                  <StyledCard key={index}>
                    <StyledImageBox>
                      <img
                        alt="item"
                        src={item.Poster}
                        onClick={() => navigate(`item/${item.imdbID}`)}
                      />
                    </StyledImageBox>
                    <StyledContentBox>
                      <StyledBox>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography>Title:</Typography>
                          <Input
                            sx={{ marginLeft: 2 }}
                            value={itemInputValues[item.imdbID] || item.Title}
                            onChange={(e) => handleInputChange(e, item.imdbID)}
                            onFocus={() => handleInputFocus(item.imdbID)}
                            onBlur={() => handleInputBlur(item.imdbID, item.Title)}
                          />
                        </Box>
                        {editingItemId === item.imdbID && (
                          <Button
                            sx={{ textTransform: "none" }}
                            onClick={() => handleInputBlur(item.imdbID, item.Title)}
                          >
                            Update
                          </Button>
                        )}
                      </StyledBox>
    
                      <StyledBox>
                        <Typography>Year: {item.Year}</Typography>
                      </StyledBox>
                    </StyledContentBox>
                  </StyledCard>
                </ContainerComponent>
              ))}
        </ContainerComponent>
      </Box>
    );
  
};

export default Cards;
