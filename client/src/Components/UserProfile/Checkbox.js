import React from 'react';
import PropTypes from 'prop-types';

const Checkboxx = ({ type = 'checkbox', checked = false, onChange, id }) => {
	return <input id={id} type={type} checked={checked} onChange={onChange} />
};

Checkboxx.propTypes = {
	type: PropTypes.string,
	name: PropTypes.string.isRequired,
	checked: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
};

export default Checkboxx;
