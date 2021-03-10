import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

import { animated, useSpring } from 'react-spring';

const HomeContentDetails = (props) => {

    const [hover, setHover] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);

    const scaleSpring = useSpring({
        to: { transform: hover ? "scale(1.1)" : "scale(1)" },
        from: { height: "40vh", backgroundSize: "cover", transform: "scale(1)", width: "100%" }
    });

    const buttonSpring = useSpring({
        to: { transform: hover ? "translate(10%, -30%)" : "translate(0%, 0%)" },
        from: { background: "white", position: "absolute", bottom: "10px", left: "10px", transform: "translate(0%, 0%)" }
    })

    return (
        <div style={{ margin: "0 50px 0px 50px", cursor: "pointer", overflow: "hidden", position: "relative" }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <animated.img src={props.content.image.src} style={{ ...scaleSpring, display: loaded ? "" : "none" }} onLoad={() => setLoaded(true)} />
            <Skeleton animation="wave" style={{ width: "40vh", height: "50vh", display: loaded ? "none" : "" }} />
            <animated.div style={{ ...buttonSpring, display: loaded ? "" : "none" }}>
                <Typography style={{
                    textAlign: "left", fontSize: `${15 / 1920 * props.width}px`, fontWeight: "600", width: "fit-content",
                    color: "black", padding: `${15 / 1920 * props.width}px ${55 / 1920 * props.width}px`, zIndex: 2, textTransform: "capitalize"
                }} >{props.content.title.toLowerCase()}</Typography>
            </animated.div>
        </div>
    )
}

export default HomeContentDetails;