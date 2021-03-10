import React from 'react';

import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import { Typography } from '@material-ui/core';

const Contact = (props) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MailOutlineOutlinedIcon style={{ fontSize: `${40 / 1920 * props.width}px` }} />
            <Typography style={{ fontSize: `${35 / 1920 * props.width}px`, margin: "35px 0 40px" }}>
                Stay up to date with all exclusive offers!
            </Typography>
            <div style={{ maxWidht: "500px" }}>

            </div>

        </div>
    )
}

export default Contact;