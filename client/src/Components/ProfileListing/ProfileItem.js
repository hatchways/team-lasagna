import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  Avatar,
  CardContent,
  Typography,
  Box,
  Divider,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import Rating from "@material-ui/lab/Rating";
import RoomIcon from "@material-ui/icons/Room";

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    padding: "40px 0 0 0",
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  avatar: {
    backgroundColor: red[500],
  },
  name: {
    margin: "0",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    lineHeight: "2.5",
  },
}));

export default function ProfileListring({ profile }) {
  const classes = useStyles();
  const [photoPath, setPhotoPath] = useState("../assets/JasonMomoa.jpg");

  return (
    <Grid item xs={4} className={classes.root}>
      <Card className={classes.card}>
        <Grid item xs={12} align="center">
          <Avatar alt="userphot" src={photoPath} className={classes.large} />
        </Grid>
        <Grid item xs={12}>
          <CardContent style={{ textAlign: "center" }}>
            <Box>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.name}
              >
                {profile.firstName + " " + profile.lastName}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >
                {profile.about}
              </Typography>
            </Box>
            <Box>
              <Rating name="read-only" defaultValue={4} readOnly />
            </Box>
          </CardContent>
          <Divider />
          <CardContent>
            <Grid item xs={12} className={classes.footer}>
              <Typography
                variant="body1"
                color="textSecondary"
                component="span"
              >
                <RoomIcon fontSize="small"></RoomIcon>
                {profile.address.city + ", " + profile.address.province}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                component="span"
              >
                $14/hr
              </Typography>
            </Grid>
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  );
}
