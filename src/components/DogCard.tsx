/* eslint-disable react/jsx-no-comment-textnodes */
import {
  Card,
  Typography,
  CardContent,
  CardMedia,
  Button,
  CardActions,
} from "@mui/material";
import React from "react";

export default function DogCard() {
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 340 }}
          image="/sparkles.jpg"
          title="Sparkles"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Sparkles
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Bio: Sparkles is kind and so loving, just looking for long walks on
            the beach and quality time!
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Visit My Page</Button>
        </CardActions>
      </Card>
    </div>
  );
}
