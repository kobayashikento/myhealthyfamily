import { Typography } from '@material-ui/core';
import React from 'react';

import '../assests/styles/homedetailproductStyle.css';

import { currencyDic } from '../assests/constants';

import { useShopify } from "../hooks";
import { useSpring, animated, config } from 'react-spring';

const HomeDealsProduct = (props) => {

    const { currency } = useShopify();
    const [hover, setHover] = React.useState(false);

    // 0: no compare price, 1: compare price
    const getCurrPrice = (item, type) => {
        //[0] = price, [1] = compareAtPrice
        let price = [0, 0];
        if (type === 0) {
            item.presentmentPrices.map(ele => {
                if (ele.price.currencyCode === currency) {
                    price[0] = parseFloat(ele.price.amount).toFixed(2)
                    return;
                }
            });
        } else if (type === 1) {
            item.presentmentPrices.forEach(ele => {
                if (ele.price.currencyCode === currency) {
                    price = [parseFloat(ele.price.amount).toFixed(2), parseFloat(ele.compareAtPrice.amount).toFixed(2)];
                    return;
                }
            });
        }
        return price;
    }

    const hoverSpring = useSpring({
        to: {
            boxShadow: hover ? "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" : "rgba(99, 99, 99, 0.0) 0px 2px 8px 0px", transform: hover ? "scale(1.1)" : "scale(1)"
        },
        from: {
           boxShadow: "rgba(99, 99, 99, 0.0) 0px 2px 8px 0px", transform: "scale(1)", margin: "55px 15px 50px 15px"
        },
        config: { config: config.stiff }
    })

    return (
        <animated.div style={{ ...hoverSpring }} className="homedetailproduct_container" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {hover ?
                <img src={props.content.images[1].src} style={{ cursor: "pointer", padding: "4px" }} />
                : <img src={props.content.images[0].src} style={{ cursor: "pointer" }} />
            }
            <div style={{ padding: "29px 0 10px 0", maxWidth: "70%", marginRight: "auto", marginLeft: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography className="homedetailproduct_text" align="center" style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "13px" }}>
                    {props.content.title}
                </Typography>
                <Typography align="center" style={{ fontSize: "14px", marginBottom: "13px" }}>
                    {props.content.productType}
                </Typography>
                {
                    props.content.variants[0].compareAtPrice !== null ?
                        <div style={{ display: "flex", alignItems: "flex-end" }}>
                            <Typography style={{ fontSize: "14px", color: "#959494", marginRight: "15px", textDecoration: "line-through" }}>
                                {currencyDic[currency].symbol} {getCurrPrice(props.content.variants[0], 1)[0]}
                            </Typography>
                            <Typography style={{ fontSize: "18px", color: "#e13367", fontWeight: "bold" }}>
                                {currencyDic[currency].symbol} {getCurrPrice(props.content.variants[0], 1)[1]}
                            </Typography>
                        </div>
                        :
                        <Typography style={{ fontSize: "14px", color: "black", fontWeight: "bold" }}>
                            {currencyDic[currency].symbol} {getCurrPrice(props.content.variants[0], 0)[0]}
                        </Typography>
                }
            </div>
        </animated.div>
    )
}

export default HomeDealsProduct;