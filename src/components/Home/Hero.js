import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { Typography, Button } from '@material-ui/core';

import { animated, useSpring } from 'react-spring';

import heroPic from '../../assests/pictures/MHF_coverphoto.png';

import { Link } from 'react-router-dom';

const Hero = (props) => {
    const [hover, setHover] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);

    const fillBoxSpring = useSpring({
        to: { transform: !hover ? "translateY(100%)" : "translateY(0%)" },
        from: {
            position: "absolute", backgroundColor: "black", transform: "translateY(100%)", zIndex: 1, width: "100%", height: "100%"
        }
    })

    return (
        props.matches ? 
        <div style={{
            display: "flex", justifyContent: "center", alignItems: "center",
            height: "80vh", overflow: "hidden", marginBottom: "5.5vmax"
        }}>
            <div style={{
                position: "absolute", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center",
                marginTop: "6%"
            }}>
                <Typography style={{ fontSize: `${30 / 1920 * props.width}px`, color: "white", fontFamily: "SofiaM" }}>
                    STAY POSITIVE THIS WINTER
                    </Typography>
                <Typography style={{
                    fontSize: `${95 / 1920 * props.width}px`, color: "white",
                    fontWeight: "bold", margin: "36px 0", fontFamily: `FirusasHeader, "Times New Roman", Times, Georgia, serif`
                }}>
                    Try MyHealthyFamily
                    </Typography>
                <div onClick={() => props.scrollbar.current.scrollToTop()}
                    style={{ width: "fit-content", overflow: "hidden", position: "relative" }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <animated.div style={fillBoxSpring} />
                    <Link style={{ textDecoration: "none" }} to={`/best-sellers`}>
                        <Button style={{ border: "2px solid white", borderRadius: "2px", background: "white" }} >
                            <Typography style={{
                                textAlign: "left", fontSize: `${20 / 1920 * props.width}px`, fontWeight: "600",
                                color: hover ? "white" : "black", padding: "10px 45px", zIndex: 2
                            }} >SHOP NOW</Typography>
                        </Button>
                    </Link>
                </div>
            </div>
            <div style={{ overflow: "hidden" }}>
                <img src={heroPic} style={{
                    width: "96vw", maxHeight: "inherit",
                    filter: "contrast(0.8)", display: loaded ? "" : "none"
                }} onLoad={() => setLoaded(true)} />
                <Skeleton animation="wave" variant="rect" width={window.innerWidth * 0.96} height={window.innerHeight} style={{ display: loaded ? "none" : "" }} />
            </div>
        </div>
        :
        <div style={{
            display: "flex", justifyContent: "center", alignItems: "center", backgroundSize: "cover", backgroundPosition: "center",
            height: "66vh", overflow: "hidden", margin: "0 auto 5.5vmax auto", backgroundImage: `url(${heroPic})`, width: "93vw"
        }}>
            <div style={{
                position: "absolute", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center",
            }}>
                <Typography style={{ fontSize: `${50 / 1024 * props.width}px`, color: "white", fontFamily: "SofiaM" }}>
                    STAY POSITIVE THIS WINTER
                    </Typography>
                <Typography style={{
                    fontSize: `${95 / 1024 * props.width}px`, color: "white",
                    fontWeight: "bold", margin: "36px 0", fontFamily: `FirusasHeader, "Times New Roman", Times, Georgia, serif`
                }}>
                    Try MyHealthyFamily
                    </Typography>
                <div onClick={() => props.scrollbar.current.scrollToTop()}
                    style={{ width: "fit-content", overflow: "hidden", position: "relative" }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <animated.div style={fillBoxSpring} />
                    <Link style={{ textDecoration: "none" }} to={`/best-sellers`}>
                        <Button style={{ border: "2px solid white", borderRadius: "2px", background: "white" }} >
                            <Typography style={{
                                textAlign: "left", fontSize: `${40 / 1024 * props.width}px`, fontWeight: "600",
                                color: hover ? "white" : "black", padding: "7px 35px", zIndex: 2
                            }} >SHOP NOW</Typography>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Hero;