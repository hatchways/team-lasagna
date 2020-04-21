import React from 'react';
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

export default AlternateCheckbox;
