import { Typography, Grid, Divider } from '@material-ui/core';
import React from 'react';

const FooterMenu = (props) => {

    const typoHeaderStyle = {
        fontSize: `22px`, fontWeight: "bold", marginBottom: "20px"
    }

    const typoStyle = {
        fontSize: `14px`, marginBottom: "15px"
    }

    return (
        <div style={{ width: "95vw", marginTop: "6.6vmax", marginLeft: "auto", marginRight: "auto" }}>
            <div style={{ padding: "50px 50px", border: "1px solid #f1f0f0", }}>
                <Grid container spacing={7} justify="space-around">
                    <Grid item xs={3}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Typography style={typoHeaderStyle}>
                                {props.shopDetails.name}
                            </Typography>
                            <Typography style={typoStyle}>
                                About Us
                    </Typography>
                            <Typography style={typoStyle}>
                                Contact
                    </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Typography style={typoHeaderStyle}>
                                Customer Service
                    </Typography>
                            <Typography style={typoStyle}>
                                Refund Policy
                    </Typography>
                            <Typography style={typoStyle}>
                                Shipping Policy
                    </Typography>
                            <Typography style={typoStyle}>
                                Privacy Policy
                    </Typography>
                            <Typography style={typoStyle}>
                                Terms of Service
                    </Typography>
                        </div>
                    </Grid>
                    <Grid>
                        <Divider orientation="vertical" />
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Typography style={typoHeaderStyle}>
                                Contact Us
                    </Typography>
                            <Typography style={typoStyle}>
                                Do you have any questions or suggestions?
                    </Typography>
                            <Typography style={{ fontSize: `${20 / 1920 * props.width}px`, marginBottom: "15px", textDecoration: "underline", fontWeight: "bold" }}>
                                kentokobayashik@gmail.com
                    </Typography>
                            <Typography style={typoStyle}>
                                Do you need assistance? Give us a call.
                    </Typography>
                            <Typography style={{ fontSize: `${25 / 1920 * props.width}px`, marginBottom: "15px", fontWeight: "bold" }}>
                                +833-432-6432
                    </Typography>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div style={{ padding: "20px 0 0 50px" }}>
                <Typography style={{ fontSize: `13px`, marginBottom: "15px", fontWeight: "bold" }}>
                    © Copyright 2021 My Healthy Family. All rights reserved. Developed by Kento Kobayashi.
            </Typography>
            </div>
        </div>
    )
}

export default FooterMenu;