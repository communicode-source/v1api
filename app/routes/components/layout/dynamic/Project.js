import React, { PropTypes } from 'react';

const Project = ({ data }) =>
    <div>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
    </div>;

Project.propTypes = {
    data: PropTypes.object
};

export default Project;
