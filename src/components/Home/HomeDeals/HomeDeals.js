import React from 'react';

import { Container, Divider, IconButton, Typography } from '@material-ui/core';

import '../../../assests/styles/homedealsStyle.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import HomeDealsProduct from './HomeDealsProduct';

import { useShopify } from "../../../hooks";

import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';

import { Skeleton } from '@material-ui/lab';

const HomeDeals = (props) => {

    const { fetchProduct } = useShopify();
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
        setBest(props.content);
    }, [props.content])

    const allHoverSpring = useSpring({
        to: { width: allHover ? "100%" : "0%" },
        from: { width: "0%", opacity: 1, background: "black", height: "1px", marginBottom: "18px" }
    })

    const handleClick = (direction) => {
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
                <div key={`home-deals-skeleton-${i}`} style={{ width: "25%", height: "50vh", margin: "55px 15px 50px" }}>
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
    function handleItemClick(e, product_id) {
        e.preventDefault()
        const id = product_id;
        //props.scrollbar.current.scrollToTop();
        fetchProduct(id).then((res) => {
            props.history.push(`/product/${res.id}`)
        })
    }

    return (
        best.length !== 0 ?
            <Container maxWidth="lg">
                <Slider ref={slider} {...settings}>
                    {props.content.map((ele, index) => {
                        return (
                            <div key={`product-${ele.id}`} onClick={(e) => handleItemClick(e, ele.id)}>
                                <HomeDealsProduct key={`home-deals-${index}`} content={ele} />
                            </div>
                        )
                    })}
                </Slider>
                <Divider style={{ width: "100%" }} />
                <div className="homedeals_footer" style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }}>
                    <IconButton disabled={activeSlide === 0} onClick={() => handleClick(0)}>
                        <ChevronLeftIcon fontSize="large" />
                    </IconButton>
                    <Divider orientation="vertical" style={{ height: "30px", margin: "0 15px 0 15px" }} />
                    <IconButton disabled={activeSlide >= best.length - 4} onClick={() => handleClick(1)}>
                        <ChevronRightIcon fontSize="large" />
                    </IconButton>
                    <Link to="/all" style={{
                        width: "fit-content", cursor: "pointer", position: "absolute", bottom: "0px", right: "0px", paddingRight: "20px",
                        display: "flex", flexDirection: "column", textDecoration: "none", color: "inherit"
                    }} onMouseEnter={() => setAllHover(true)} onMouseLeave={() => setAllHover(false)}>
                        <Typography style={{ fontSize: "15px", fontWeight: "500" }}>
                            View All Products ???
                                </Typography>
                        <animated.div style={allHoverSpring} />
                    </Link>
                </div>
            </Container>
            :
            <Container maxWidth="lg">
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
                            View All Products ???
                            </Typography>
                        <animated.div style={allHoverSpring} />
                    </div>
                </div>
            </Container>
    )
}

export default HomeDeals;