import React from 'react';
import { Spinner } from 'reactstrap';


export const Loading = () => {
    return(
        <div className="col-12">
            <Spinner size="md" color="success" />
            <p>Loading, please, wait</p>
        </div>
    );
};
