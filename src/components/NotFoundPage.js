import { Typography } from '@material-ui/core';
import React from 'react';

import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Typography variant="h2">
                Page Not Found
            </Typography>
            <Typography variant="h5" style={{ marginTop: "2.2vmax" }}>
                This is not the page you’re looking for.
            </Typography>
            <Link to="/" style={{textDecoration: "none"}}>
                <div style={{ width: "fit-content", margin: "3.3vw auto 0 auto", background: "black", padding: "15px 30px", cursor: "pointer" }}>
                    <Typography variant="h5" style={{ color: "white" }} >
                        Go to Homepage
            </Typography>
                </div>
            </Link>
        </div>
    )
}

export default PageNotFound