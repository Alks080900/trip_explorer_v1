import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea
} from "@mui/material";
import defaultImage from "../images/default.png";

const CardItem = ({ country, gallery }) => {
  const imageUrl = gallery && gallery.length > 0 ? gallery[0].url : defaultImage;

  return (
      <Card sx={{ width: 470 }}>
        <CardActionArea>
          <CardMedia
              component="img"
              height="300"
              image={imageUrl}
              alt={gallery && gallery.length > 0 ? gallery[0].place : "default"}
          />
          <Typography gutterBottom variant="h6" component="div" sx={{margin: "5px 0 0 10px"}}>
            {country}
          </Typography>
        </CardActionArea>
      </Card>
  );
};

export default CardItem;
