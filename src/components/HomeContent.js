import React from 'react';

import { Container, Grid, Typography, Button, Divider } from '@material-ui/core';
import HomeContentDetails from './HomeContentDetails';

import { useShopify } from "../hooks";
import { Skeleton } from '@material-ui/lab';

import { animated, useSpring } from 'react-spring';

const HomeContent = (props) => {

    const { featured } = useShopify();
    const [hover, setHover] = React.useState(false);

    const fillBoxSpring = useSpring({
        to: { transform: !hover ? "translateY(100%)" : "translateY(0%)" },
        from: {
            position: "absolute", backgroundColor: "black", transform: "translateY(100%)", zIndex: 1, width: "100%", height: "100%"
        }
    });

    return (
        <Container maxWidth="lg" style={{ marginTop: "5.5vmax", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "5.5vmax" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Typography style={{ fontSize: `${(45 / 1920 * props.width)}px` }} >
                    Shop now
                </Typography>
                <Typography style={{ fontSize: `${(45 / 1920 * props.width)}px`, fontFamily: "FirusasHeader, Times New Roman, Times, Georgia, serif", fontStyle: "italic", textIndent: "1rem" }} >
                    with
                </Typography>
                <Typography style={{ fontSize: `${(45 / 1920 * props.width)}px`, textIndent: "1rem" }}>
                    {props.shopDetails.name}
                </Typography>
            </div>
            <Grid container spacing={9} justify="center" style={{ paddingTop: "2.2vmax", margin: "0", minHeight: "50vh" }}>
                {
                    featured.map(ele => {
                        if (ele.title.toLowerCase() !== "best sellers") {
                            return (
                                <Grid item xs={5}>
                                    <HomeContentDetails content={ele} width={props.width}/>
                                </Grid>
                            )
                        }
                    })
                }
            </Grid>
            <div style={{ width: "fit-content", overflow: "hidden", position: "relative", marginTop: "1.1vmax", border: "1px solid #e4e4e4" }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                <animated.div style={fillBoxSpring} />
                <Button style={{ border: "2px solid white", borderRadius: "2px", background: "white", width: "100%" }} >
                    <Typography style={{
                        textAlign: "left", fontSize: `14px`, fontWeight: "600",
                        color: hover ? "white" : "black", padding: "7px 15px", zIndex: 2
                    }} >View All Products</Typography>
                </Button>
            </div>
        </Container>
    )
}

export default HomeContent;