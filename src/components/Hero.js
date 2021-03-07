import { Typography, Button } from '@material-ui/core';
import React from 'react';

import { animated, useSpring } from 'react-spring';

import heroPic from '../assests/pictures/MHF_coverphoto.png';

const Hero = (props) => {
    const [hover, setHover] = React.useState(false);

    const fillBoxSpring = useSpring({
        to: { transform: !hover ? "translateY(100%)" : "translateY(0%)" },
        from: {
            position: "absolute", backgroundColor: "black", transform: "translateY(100%)", zIndex: 1, width: "100%", height: "100%"
        }
    })

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "absolute", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", top: "46%" }}>
                <Typography style={{ fontSize: `${30 / 1920 * props.width}px`, color: "white", fontWeight: "500" }}>
                    STAY POSITIVE THIS WINTER
                    </Typography>
                <Typography style={{ fontSize: `${95 / 1920 * props.width}px`, color: "white", fontWeight: "bold", margin: "36px 0", fontFamily: "SofiaM" }}>
                    Try MyHealthyFamily
                    </Typography>
                <div style={{ width: "fit-content", overflow: "hidden", position: "relative" }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <animated.div style={fillBoxSpring} />
                    <Button style={{ border: "2px solid white", borderRadius: "2px", background: "white" }} >
                        <Typography style={{
                            textAlign: "left", fontSize: `${20 / 1920 * props.width}px`, fontWeight: "600",
                            color: hover ? "white" : "black", padding: "15px 55px", zIndex: 2
                        }} >SHOP NOW</Typography>
                    </Button>
                </div>
            </div>
            <div style={{ height: "100vh", overflow: "hidden" }}>
                <img src={heroPic} style={{ width: "96vw", maxHeight: "inherit", transform: "translateY(-15%)", filter: "contrast(0.8)" }} />
            </div>
        </div>
    )
}

export default Hero;