import React from 'react';

import '../../assests/styles/headerDropStyle.css';

import { Spring } from 'react-spring/renderprops';

import { Container, Typography, Button, Divider } from '@material-ui/core/';
import { animated, useSpring } from 'react-spring';

import { Link } from 'react-router-dom';

const convertLink = (string) => {
    return string.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-");
}

const HeaderDropDown = (props) => {
    const [hover, setHover] = React.useState(false);
    const [allHover, setAllHover] = React.useState(false);

    const fillBoxSpring = useSpring({
        to: { transform: !hover ? "translateY(100%)" : "translateY(0%)" },
        from: {
            position: "absolute", backgroundColor: "black", transform: "translateY(100%)", zIndex: 1, width: "100%", height: "100%"
        }
    });

    const getTypes = () => {
        let types = []
        props.content[0].products.forEach(ele => {
            if (!(types.includes(ele.productType))) {
                types.push(ele.productType);
            }
        })
        return types
    }

    const createTypes = () => {
        return (
            getTypes().map((type, index) => {
                if (index < 6) {
                    return (
                        <Spring
                            to={{ width: hover === index + 1 ? "100%" : "0%" }}
                            from={{ width: "0%", opacity: 1, background: "black", height: "1px", marginBottom: "18px" }}
                            key={`category-${index}`}
                        >
                            {prop =>
                                <div style={{ width: "fit-content", cursor: "pointer" }} onMouseEnter={() => setHover(index + 1)}
                                    onMouseLeave={() => setHover(0)} onClick={() => props.setDropbarhover(0)}>
                                    <Link style={{ textDecoration: "none", color: "inherit" }} to={`/${convertLink(props.content[0].title)}/${convertLink(type)}`}>
                                        <Typography className="headerDrop_item" style={{ fontSize: "17px", fontWeight: "500" }}>
                                            {type}
                                        </Typography>
                                        <animated.div style={prop} />
                                    </Link>
                                </div>
                            }
                        </Spring>
                    )
                }
                return false;
            })
        )
    }

    return (
        props.content.length === 0 ? null :
            props.content[0].image !== null ?
                <Container maxWidth="lg" className="headerDrop_container" style={{ display: "flex", width: "95vw" }}>
                    <div style={{ maxHeight: "330px", overflow: "hidden" }}>
                        <div style={{ marginRight: "75px", width: "fit-content", position: "relative" }}>
                            <div style={{ position: "absolute", marginTop: "40%", left: "50%", transform: "translateX(-50%)", zIndex: 1 }}>
                                <Typography style={{
                                    color: "white", fontSize: "3rem",
                                    fontFamily: "'Playfair Display', serif", textTransform: "uppercase",
                                    fontWeight: "bold"
                                }}>
                                    {props.content[0].title}
                                </Typography>
                                <div style={{ width: "100%", overflow: "hidden", position: "relative", marginTop: "1.1vmax" }}
                                    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                                    onClick={() => props.setDropbarhover(0)}>
                                    <animated.div style={fillBoxSpring} />
                                    <Link to={`/${convertLink(props.content[0].title)}`} style={{ textDecoration: "none" }}>
                                        <Button style={{ border: "2px solid white", borderRadius: "2px", background: "white", width: "100%" }} >
                                            <Typography style={{
                                                textAlign: "left", fontSize: `14px`, fontWeight: "600",
                                                color: hover ? "white" : "black", padding: "7px 15px", zIndex: 2
                                            }} >SHOP NOW</Typography>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div className="imgFilter" style={{
                                backgroundImage: `url(${props.content[0].image.src})`, width: "480px",
                                height: "330px", backgroundSize: "cover"
                            }} />
                        </div>
                    </div>
                    <Divider orientation="vertical" style={{ height: "auto", margin: "15px 0" }} />
                    <div className="headerDrop_items">
                        {createTypes()}
                        <Spring
                            to={{ width: allHover ? "100%" : "0%" }}
                            from={{ width: "0%", opacity: 1, background: "black", height: "1px", marginBottom: "18px" }}
                            key={`category-view-all`}
                        >
                            {prop =>
                                <div style={{ width: "fit-content", cursor: "pointer" }} onMouseEnter={() => setAllHover(true)} onMouseLeave={() => setAllHover(false)}>
                                    <Link style={{ textDecoration: "none", color: "inherit" }} to={`/${convertLink(props.content[0].title)}`}>
                                        <Typography className="headerDrop_item" style={{ fontSize: "17px", fontWeight: "500" }}>
                                            View All ???
                                </Typography>
                                        <animated.div style={prop} />
                                    </Link>
                                </div>
                            }
                        </Spring>
                    </div>
                    <Divider orientation="vertical" style={{ height: "auto", margin: "15px 0" }} />
                    <div className="headerDrop_items">
                        <Typography style={{ fontSize: "1.5rem" }}>
                            {props.content[0].description}
                        </Typography>
                    </div>
                </Container>
                : null
    )
}

export default HeaderDropDown;