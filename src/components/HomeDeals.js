import React from 'react';

import { Container, Divider, IconButton, Typography } from '@material-ui/core';

import '../assests/styles/homedealsStyle.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import HomeDealsProduct from './HomeDealsProduct';

import { useShopify } from "../hooks";

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { useSpring, animated } from 'react-spring';

import { Skeleton } from '@material-ui/lab';

const HomeDeals = (props) => {

    const skeleRef = React.useRef();
    const { featured } = useShopify();
    const slider = React.useRef();

    const [best, setBest] = React.useState([]);
    const [allHover, setAllHover] = React.useState(false);
    const [activeSlide, setActiveSlide] = React.useState(0)

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToScroll: 4,
        slidesToShow: 4,
        beforeChange: (current, next) => setActiveSlide(next),
    };

    React.useEffect(() => {
        setBest(featured);
    }, [featured])

    const getBestSeller = () => {
        let temp = []
        best.forEach(item => {
            if (item.title === "Best Sellers") {
                temp = item
                return;
            }
        })
        return temp;
    }

    const allHoverSpring = useSpring({
        to: { width: allHover ? "100%" : "0%" },
        from: { width: "0%", opacity: 1, background: "black", height: "1px", marginBottom: "18px" }
    })

    const handleClick = (direction) => {
        console.log(activeSlide)
        if (slider.current !== undefined) {
            if (direction === 0 && activeSlide !== 0) {
                slider.current.slickGoTo(activeSlide - 1);
            } else if (direction === 1 && activeSlide !== best.length - 4) {
                slider.current.slickGoTo(activeSlide + 1);
            }
        }
    }

    const makeProductSekelton = () => {
        let content = [];
        for (let i = 0; i < 4; i++) {
            content.push(
                <div style={{ width: "25%", height: "50vh", margin: "55px 15px 50px" }}>
                    <Skeleton animation="wave" variant="rect" style={{ width: "100%", height: "60%" }} />
                    <div style={{ padding: "40px 0px 10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Skeleton animation="wave" style={{ width: "70%", marginBottom: "20px" }} />
                        <Skeleton animation="wave" style={{ width: "40%", marginBottom: "20px" }} />
                        <Skeleton animation="wave" style={{ width: "30%" }} />
                    </div>
                </div>
            )
        }
        return content;
    }

    return (
        <div>
            {
                best.length !== 0 ?
                    <Container maxWidth="lg">
                        <Typography style={{ fontSize: `${(18 / 1920 * props.width)}px`, color: "#959494", padding: "0 12px 12px 12px" }} className="homedeals_title">
                            SHOW NOW
                </Typography>
                        <div style={{ display: "flex", justifyContent: 'center', alignItems: "center", overflow: "hidden" }}>
                            <Divider style={{ width: "100%" }} />
                            <Typography style={{ fontSize: `${(45 / 1920 * props.width)}px` }} className="homedeals_title">
                                Best Sellers
                </Typography>
                            <Divider style={{ width: "100%" }} />
                        </div>
                        <Slider ref={slider} {...settings}>
                            {getBestSeller().products.map(ele => {
                                return (
                                    <HomeDealsProduct content={ele} />
                                )
                            })}
                        </Slider>
                        <Divider style={{ width: "100%" }} />
                        <div className="homedeals_footer" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
                            <IconButton disabled={activeSlide === 0} onClick={() => handleClick(0)}>
                                <ChevronLeftIcon fontSize="large" />
                            </IconButton>
                            <Divider orientation="vertical" style={{ height: "30px", margin: "0 15px 0 15px" }} />
                            <IconButton disabled={activeSlide === best.length - 4} onClick={() => handleClick(1)}>
                                <ChevronRightIcon fontSize="large" />
                            </IconButton>
                            <div style={{
                                width: "fit-content", cursor: "pointer", position: "absolute", bottom: "0px", right: "0px", paddingRight: "20px",
                                display: "flex", flexDirection: "column"
                            }} onMouseEnter={() => setAllHover(true)} onMouseLeave={() => setAllHover(false)}>
                                <Typography style={{ fontSize: "15px", fontWeight: "500" }}>
                                    View All Products →
                                </Typography>
                                <animated.div style={allHoverSpring} />
                            </div>
                        </div>
                    </Container>
                    :
                    <Container maxWidth="lg">
                        <div style={{ display: "flex", justifyContent: 'center', alignItems: "center", overflow: "hidden" }}>
                            <Divider style={{ width: "100%" }} />
                            <Typography style={{ fontSize: `${(45 / 1920 * props.width)}px` }} className="homedeals_title">
                                Best Sellers
            </Typography>
                            <Divider style={{ width: "100%" }} />
                        </div>
                        <div style={{ display: "flex" }}>
                            {makeProductSekelton()}
                        </div>
                        <Divider style={{ width: "100%" }} />
                        <div className="homedeals_footer" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
                            <IconButton disabled={true} onClick={() => handleClick(0)}>
                                <ChevronLeftIcon fontSize="large" />
                            </IconButton>
                            <Divider orientation="vertical" style={{ height: "30px", margin: "0 15px 0 15px" }} />
                            <IconButton disabled={true} onClick={() => handleClick(1)}>
                                <ChevronRightIcon fontSize="large" />
                            </IconButton>
                            <div style={{
                                width: "fit-content", cursor: "pointer", position: "absolute", bottom: "0px", right: "0px", paddingRight: "20px",
                                display: "flex", flexDirection: "column"
                            }} onMouseEnter={() => setAllHover(true)} onMouseLeave={() => setAllHover(false)}>
                                <Typography style={{ fontSize: "15px", fontWeight: "500" }}>
                                    View All Products →
                            </Typography>
                                <animated.div style={allHoverSpring} />
                            </div>
                        </div>
                    </Container>
            }
        </div>
    )
}

export default HomeDeals;