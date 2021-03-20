import React from 'react';

import { Typography, Grid, Divider } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Skeleton } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import { Spring } from 'react-spring/renderprops-universal';

import { isEmpty, convertedLink } from '../../assests/functions';

import useMediaQuery from '@material-ui/core/useMediaQuery';

//styles
const typoHeaderStyle = { fontSize: `22px`, fontWeight: "bold", marginBottom: "20px" }
const typoStyle = { fontSize: `14px`, marginBottom: "15px" }
const linkStyle = { fontSize: "14px", textDecoration: "none", color: "inherit", fontFamily: "SofiaR" }

const FooterMenu = (props) => {
    const matches = useMediaQuery('(min-width:1024px)', { noSsr: true });

    //states 
    const [navIndex, setNavIndex] = React.useState(0);
    const [navIndexSec, setNavIndexSec] = React.useState(0);

    const navSection = [["About us", "Contact"],
    ["Refund Policy", "Privacy Policy", "Terms of Service"]]

    const handleClick = () => {
        if (props.scrollbar !== undefined) {
            props.scrollbar.current.scrollToTop()
        }
    }
    const createNavLinks = (arr, state, setState) => {
        return (
            arr.map((item, index) => {
                return (
                    <Spring
                        to={{ width: state === index + 1 ? "100%" : "0%" }}
                        from={{ width: "0%", backgroundColor: "black", height: "1.5px", marginBottom: "12px" }}
                        key={`footerlink-${item}`}
                    >
                        {prop =>
                            <div style={{ width: "fit-content" }} onMouseEnter={() => setState(index + 1)}
                                onMouseLeave={() => setState(0)}>
                                {
                                    isEmpty(props.shopDetails) ?
                                        <Skeleton animation="wave" width={30} height={10} />
                                        :
                                        <Link to={`/${convertedLink(item)}`} onClick={handleClick}
                                            style={{ ...linkStyle, color: "black" }}>
                                            {item}
                                        </Link>
                                }
                                <div style={prop} />
                            </div>
                        }
                    </Spring>
                )
            })
        )
    }

    return (
        matches ?
            <div style={{ width: "95vw", marginTop: "6.6vmax", marginLeft: "auto", marginRight: "auto" }}>
                <div style={{ padding: "50px 50px", border: "1px solid #f1f0f0", }}>
                    <Grid container spacing={7} justify="space-around">
                        <Grid item xs={3}>
                            {
                                isEmpty(props.shopDetails) ?
                                    <Skeleton animation="wave" width={30} height={10} />
                                    : <Typography style={typoHeaderStyle}>
                                        {props.shopDetails.info.name}
                                    </Typography>
                            }
                            {createNavLinks(navSection[0], navIndex, setNavIndex)}
                        </Grid>
                        <Grid item xs={3}>
                            <Typography style={typoHeaderStyle}>Customer Service</Typography>
                            {createNavLinks(navSection[1], navIndexSec, setNavIndexSec)}
                        </Grid>
                        <Grid>
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid item xs={3}>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <Typography style={typoHeaderStyle}>Contact Us</Typography>
                                <Typography style={typoStyle}>Do you have any questions or suggestions?</Typography>
                                <Typography style={{ fontSize: `${20 / 1920 * props.width}px`, marginBottom: "15px", textDecoration: "underline", fontWeight: "bold" }}>
                                    kentokobayashik@gmail.com
                            </Typography>
                                <Typography style={typoStyle}>Do you need assistance? Give us a call.</Typography>
                                <Typography style={{ fontSize: `${25 / 1920 * props.width}px`, marginBottom: "15px", fontWeight: "bold" }}>+647-228-3697</Typography>
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
            :
            <div style={{ maxWidth: "95vw", margin: "4.4vmax auto 0 auto" }}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        {
                            isEmpty(props.shopDetails) ?
                                <Skeleton animation="wave" width={30} height={10} />
                                : <Typography variant="h5" style={{ fontWeight: "bold" }}>
                                    {props.shopDetails.info.name}
                                </Typography>
                        }
                    </AccordionSummary>
                    <Divider style={{ width: "90%", margin: "0 auto 15px auto" }} />
                    <AccordionDetails style={{ display: "flex", flexDirection: "column", marginLeft: "2rem", justifyContent: "space-between", minHeight: "100px" }}>
                        {createNavLinks(navSection[0], navIndex, setNavIndex)}
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        {
                            isEmpty(props.shopDetails) ?
                                <Skeleton animation="wave" width={30} height={10} />
                                : <Typography variant="h5" style={{ fontWeight: "bold" }}>
                                    Customer Service
                                </Typography>
                        }
                    </AccordionSummary>
                    <Divider style={{ width: "90%", margin: "0 auto 15px auto" }} />
                    <AccordionDetails style={{ display: "flex", flexDirection: "column", marginLeft: "2rem", justifyContent: "space-between", minHeight: "150px" }}>
                        {createNavLinks(navSection[1], navIndexSec, setNavIndexSec)}
                    </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded={true}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        {
                            isEmpty(props.shopDetails) ?
                                <Skeleton animation="wave" width={30} height={10} />
                                : <Typography variant="h5" style={{ fontWeight: "bold" }}>
                                    Contact
                              </Typography>
                        }
                    </AccordionSummary>
                    <Divider style={{ width: "90%", margin: "0 auto 15px auto" }} />
                    <AccordionDetails style={{ display: "flex", flexDirection: "column", marginLeft: "2rem", justifyContent: "space-between", minHeight: "150px" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Typography style={typoStyle}>Do you have any questions or suggestions?</Typography>
                            <Typography style={{ fontSize: `${40 / 1024 * props.width}px`, marginBottom: "15px", textDecoration: "underline", fontWeight: "bold" }}>
                                kentokobayashik@gmail.com
                            </Typography>
                            <Typography style={typoStyle}>Do you need assistance? Give us a call.</Typography>
                            <Typography style={{ fontSize: `${45 / 1024 * props.width}px`, marginBottom: "15px", fontWeight: "bold" }}>+647-228-3697</Typography>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Typography align="center" style={{ fontSize: `13px`, margin: "20px 0 15px 0", fontWeight: "bold" }}>
                    © Copyright 2021 My Healthy Family. All rights reserved. Developed by Kento Kobayashi.
                </Typography>
            </div>
    )
}

export default FooterMenu;