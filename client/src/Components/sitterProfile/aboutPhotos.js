import React, { useState, useEffect } from "react";
import { GridList, makeStyles } from "@material-ui/core";
const useStyles = makeStyles({});
function AboutPhotos({ profile }) {
  const classes = useStyles();
  const [loaded, setLoaded] = useState(false);
  console.log(profile);
  useEffect(() => {
    setLoaded(true);
  }, [profile]);
  return (
    <GridList>
      {profile.aboutPics.map((url) => (
        <img src={url}></img>
      ))}
    </GridList>
  );
}
export default AboutPhotos;
