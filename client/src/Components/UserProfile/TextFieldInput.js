import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core'

const useStyles = makeStyles({})

export default function TextFieldInput(props) {
//let TextFieldInput = React.forwardRef((props, ref) => {
    // const classes = useStyles();
    let bigTextArea = ''
    if(props.rows) {
        bigTextArea = (
            <TextField
            //ref={ref}
            required
            id={props.id}
            name={props.name}
            label={props.label}
            fullWidth
            multiline
            variant={props.variant}
            rows={props.rows}
            value={props.value}
            onChange={props.onChange}
          />
        )
    } else {
        bigTextArea = (
        <TextField
          //ref={ref}
          multiline
          required
          id={props.id}
          name={props.name}
          label={props.label}
          fullWidth
          variant="outlined"
          value={props.value}
          onChange={props.onChange}
        />
        )
    }

    return (bigTextArea)
}

//export default TextFieldInput