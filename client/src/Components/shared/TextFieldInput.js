import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'


const useStyles = makeStyles({})

export default function TextFieldInput(props) {
    // const classes = useStyles();
    const [firstName, setFirstName] = useState('')

    return (
        <TextField
          required
          id={props.id}
          name={props.name}
          label={props.label}
          fullWidth
          value={props.value}
          onChange={props.onChange}
        />
    )
}