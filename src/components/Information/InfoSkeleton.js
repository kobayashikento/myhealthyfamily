import { Breadcrumbs, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';

import Contact from '../Footer/Contact';
import FooterMenu from '../Footer/FooterMenu';

import { Spring } from 'react-spring/renderprops-universal';

import { Link } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';

import parse from 'html-react-parser';

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const convertedLink = (r) => {
    return r.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-");
}

const InfoSkeleton = (props) => {
    const [breadHover, setBreadHover] = React.useState(0);
    const [navIndex, setNavIndex] = React.useState(0);
    const [navIndexSec, setNavIndexSec] = React.useState(0);

    const linkStyle = { fontSize: "14px", textDecoration: "none", color: "inherit", fontFamily: "SofiaR" }

    const navSection = [["About us", "Contact"],
    ["Refund Policy", "Privacy Policy", "Terms of Service"]]

    const makeNavBar = (title, i, state, setState) => {
        return (
            <div style={{ marginBottom: "2.2vmax" }}>
                {isEmpty(props.shopDetails) ?
                    <Skeleton animation="wave" width={60} height={12} />
                    :
                    <Typography style={{
                        fontSize: `17px`, fontWeight: "bold", marginBottom: "2.2vmax",
                        width: "fit-content", textTransform: "capitalize"
                    }}
                    >
                        {title}
                    </Typography>
                }
                {navSection[i].map((item, index) => {
                    return (
                        <Spring
                            to={{ width: state === index + 1 ? "100%" : "0%" }}
                            from={{
                                width: "0%", backgroundColor: props.route === item ? "black" : "grey", height: "1.5px", marginBottom: "12px"
                            }}
                            key={`sidenav-${item}`}
                        >
                            {prop =>
                                <div style={{ width: "fit-content" }}
                                    onMouseEnter={() => setState(index + 1)} onMouseLeave={() => setState(0)}>
                                    {
                                        isEmpty(props.shopDetails) ?
                                            <Skeleton animation="wave" width={30} height={10} />
                                            :
                                            <Link to={`/${convertedLink(item)}`} style={{ ...linkStyle, color: props.route === item ? "black" : "grey" }}>
                                                {item}
                                            </Link>
                                    }
                                    <div style={prop} />
                                </div>
                            }
                        </Spring>
                    )
                }
                )}
            </div>
        )
    }
    
    const createContent = () => {
        switch (props.route) {
            case "About us":
                return (props.shopDetails.info.description);
            case "Refund Policy":
                return (parse(props.shopDetails.policies.refundPolicy.body));
            case "Privacy Policy":
                return (parse(props.shopDetails.policies.privacyPolicy.body));
            case "Terms of Service":
                return (parse(props.shopDetails.policies.termsOfService.body));
            default:
        }
    }

    return (
        <div>
            <Container maxWidth="lg" style={{ marginBottom: "5.5vmax" }}>
                <Breadcrumbs>
                    <Spring
                        to={{ width: breadHover === 1 ? "100%" : "0%" }}
                        from={{
                            width: "0%", background: "grey", height: "1.5px"
                        }}
                    >
                        {prop =>
                            <div onMouseEnter={() => setBreadHover(1)} onMouseLeave={() => setBreadHover(0)}>
                                {
                                    isEmpty(props.shopDetails) ?
                                        <Skeleton animation="wave" width={60} height={10} />
                                        :
                                        <Link to="/" style={linkStyle}>
                                            {props.shopDetails.info.name}
                                        </Link>
                                }
                                <div style={prop} />
                            </div>
                        }
                    </Spring>
                    {
                        isEmpty(props.shopDetails) ?
                            <Skeleton animation="wave" width={60} height={10} />
                            :
                            <Typography color="textPrimary" style={{ fontSize: "14px" }}>
                                {props.route.toLowerCase()}
                            </Typography>
                    }
                </Breadcrumbs>
                <Typography style={{
                    fontSize: `${50 / 1920 * props.width}px`, textTransform: "capitalize", fontWeight: "500",
                    width: "fit-content", margin: "27px auto 27px auto", fontFamily: 'FirusasHeader, "Times New Roman", Times, Georgia, serif'
                }}
                >
                    {props.route.toLowerCase()}
                </Typography>
                <Grid container>
                    <Grid item xs={3}>
                        {
                            isEmpty(props.shopDetails) ?
                                <Skeleton animation="wave" width={150} height={15} />
                                :
                                <div>
                                    {makeNavBar(props.shopDetails.info.name, 0, navIndex, setNavIndex)}
                                    <div style={{ paddingTop: "1.1vmax" }}>
                                        {makeNavBar("Customer Service", 1, navIndexSec, setNavIndexSec)}
                                    </div>
                                </div>
                        }
                    </Grid>
                    <Grid item xs={8} style={{ fontSize: "15px", fontFamily: "SofiaR" }}>
                        {
                            isEmpty(props.shopDetails) ?
                                navSection[1].map(ele => {
                                    return (
                                        <Skeleton animation="wave" width={window.innerWidth * 0.5} height={12} style={{ marginBottom: "1.1vmax" }} />
                                    )
                                })
                                : createContent()

                        }
                    </Grid>
                </Grid>
            </Container>
            <Contact width={props.width} />
            <FooterMenu width={props.width} shopDetails={props.shopDetails} scrollbar={props.scrollbar} />
        </div>
    )
}

export default InfoSkeleton;