import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://lovingsitter.com/">
        Loving Sitter
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  forceFooter: {
    backgroundColor: "white",
    borderTop: "1px solid #E7E7E7",
    marginTop: "20px",
    textAlign: "center",
    padding: "5px",
    position: "absolute",
    left: "-1",
    bottom: "-1",
    width: "100%",
  },
  footer: {
    backgroundColor: "white",
    borderTop: "1px solid #E7E7E7",
    marginTop: "20px",
    textAlign: "center",
    padding: "5px",
    position: "absolute",
    left: "0",
    bottom: "0",
    width: "100%",
  }
}));

export default function StickyFooter(props) {
  const classes = useStyles();
  let Footing = (<footer className={classes.footer}>
            <Container maxWidth="sm">
              <Typography variant="body1">Contact us for more.</Typography>
              <Copyright />
            </Container>
          </footer>)
  if(props.force) {
    Footing = (<footer className={classes.forceFooter}>
      <Container maxWidth="sm">
        <Typography variant="body1">Contact us for more.</Typography>
        <Copyright />
      </Container>
    </footer>)
  }

  return (
    Footing
  );
}