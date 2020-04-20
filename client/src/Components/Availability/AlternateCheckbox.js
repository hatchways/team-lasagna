import React from 'react';
import {  FormHelperText } from '@material-ui/core'
import './AlternateCheckbox.css';

const AlternateCheckbox = ({ type = "checkbox", name, checked = false, onChange }) => {
	return  (
		<label className="Container">
		<input type={type} name={name} checked={checked} onChange={onChange} />
		<span className="checkmark"></span>
		</label> 
	)
};

// The botton is late by a click, dont worry when you click submit the state is good by then.
//<input type={type} name={name} checked={checked} onChange={onChange} />

export default AlternateCheckbox;
