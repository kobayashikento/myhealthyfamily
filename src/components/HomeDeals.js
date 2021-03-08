import React from 'react';

import { Container, Divider, Typography } from '@material-ui/core';

import '../assests/styles/homedealsStyle.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import HomeDealsProduct from './HomeDealsProduct';

import { useShopify } from "../hooks";

const HomeDeals = (props) => {

    const { featured } = useShopify();

    const [best, setBest] = React.useState([]);

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToScroll: 4,
        slidesToShow: 4
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

    return (
        <div>
            {
                best.length !== 0 ?
                    <div>
                        <Container maxWidth="lg">
                            <div style={{ display: "flex", justifyContent: 'center', alignItems: "center", overflow: "hidden", margin: "0 auto 55px" }}>
                                <Divider style={{ width: "100%" }} />
                                <Typography className="homedeals_title" style={{ fontSize: "3.2rem !important" }}>
                                    Best Sellers
                </Typography>
                                <Divider style={{ width: "100%" }} />
                            </div>
                        </Container>
                        <Slider {...settings} style={{ padding: "0 30px 50px" }}>
                            {getBestSeller().products.map(ele => {
                                return (
                                    <div>
                                        <HomeDealsProduct content={ele} />
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                    : null
            }
        </div>
    )
}

export default HomeDeals;