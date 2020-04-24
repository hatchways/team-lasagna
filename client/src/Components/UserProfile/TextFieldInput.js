import React from 'react';
import { TextField } from '@material-ui/core'

export default function TextFieldInput({id, name, label, variant, rows, required, value, onChange}) {
    let bigTextArea = ''
    if(rows) {
        bigTextArea = (
            <TextField
            required={required}
            id={id}
            name={name}
            label={label}
            fullWidth
            multiline
            variant={variant}
            rows={rows}
            value={value}
            onChange={onChange}
          />
        )
    } else {
        bigTextArea = (
        <TextField
          multiline
          required={required}
          id={id}
          name={name}
          label={label}
          fullWidth
          variant="outlined"
          value={value}
          onChange={onChange}
        />
        )
    }

    return (bigTextArea)
}