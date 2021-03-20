import { Typography, Badge } from '@material-ui/core';
import React from 'react';

import '../../../assests/styles/homedetailproductStyle.css';

import { currencyDic } from '../../../assests/constants';

import { useShopify } from "../../../hooks";
import { useSpring, animated, config } from 'react-spring';

import useMediaQuery from '@material-ui/core/useMediaQuery';

const HomeDealsProduct = (props) => {

    const { currency } = useShopify();
    const [hover, setHover] = React.useState(false);

    const matches = useMediaQuery('(min-width:1024px)', { noSsr: true });

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
            boxShadow: "rgba(99, 99, 99, 0.0) 0px 2px 8px 0px", transform: "scale(1)", margin: "25px 15px 25px 15px"
        },
        config: { config: config.stiff }
    })

    const getPercent = () => {
        return (((getCurrPrice(props.content.variants[0], 1)[0] -
            getCurrPrice(props.content.variants[0], 1)[1]) / getCurrPrice(props.content.variants[0], 1)[0]) * 100).toFixed(0)
    }

    return (
        matches ?
            <animated.div style={{ ...hoverSpring }} className="homedetailproduct_container" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {
                    props.content.variants[0].compareAtPrice !== null ?
                        <Badge className="saleBadge" color="secondary" badgeContent={`${getPercent()}% OFF`} />
                        : null
                }
                {hover ?
                    <div style={{
                        backgroundImage: `url(${props.content.images[1].src})`,
                        cursor: "pointer", padding: "4px", height: "300px",
                        backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center"
                    }} />
                    : <div style={{
                        backgroundImage: `url(${props.content.images[0].src})`,
                        cursor: "pointer", height: "300px",
                        backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center"
                    }} />
                }
                <div style={{ padding: "29px 0 10px 0", maxWidth: "70%", marginRight: "auto", marginLeft: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h6" className="homedetailproduct_text" align="center" style={{ fontWeight: "bold", marginBottom: "13px" }}>
                        {props.content.title}
                    </Typography>
                    <Typography variant="h6" align="center" style={{ marginBottom: "13px" }}>
                        {props.content.vendor}
                    </Typography>
                    {
                        props.content.variants[0].compareAtPrice !== null ?
                            <div style={{ display: "flex", alignItems: "flex-end" }}>
                                <Typography variant="h6" style={{ color: "#959494", marginRight: "15px", textDecoration: "line-through" }}>
                                    {currencyDic[currency].symbol} {getCurrPrice(props.content.variants[0], 1)[0]}
                                </Typography>
                                <Typography variant="h5" style={{ color: "#e13367", fontWeight: "bold" }}>
                                    {currencyDic[currency].symbol} {getCurrPrice(props.content.variants[0], 1)[1]}
                                </Typography>
                            </div>
                            :
                            <Typography variant="h5" style={{ color: "black", fontWeight: "bold" }}>
                                {currencyDic[currency].symbol} {getCurrPrice(props.content.variants[0], 0)[0]}
                            </Typography>
                    }
                </div>
            </animated.div>
            :
            <animated.div style={{ ...hoverSpring }} className="homedetailproduct_container" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {
                    props.content.variants[0].compareAtPrice !== null ?
                        <Badge className="saleBadge" color="secondary" badgeContent={`${getPercent()}% OFF`} />
                        : null
                }
                {hover ?
                    <div style={{
                        backgroundImage: `url(${props.content.images[1].src})`,
                        cursor: "pointer", padding: "4px", height: "200px",
                        backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center"
                    }} />
                    : <div style={{
                        backgroundImage: `url(${props.content.images[0].src})`,
                        cursor: "pointer", height: "200px",
                        backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center"
                    }} />
                }
                <div style={{ padding: "29px 0 10px 0", maxWidth: "80%", marginRight: "auto", marginLeft: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h6" className="homedetailproduct_text" align="center" style={{ fontWeight: "bold", marginBottom: "13px" }}>
                        {props.content.title}
                    </Typography>
                    <Typography variant="h6" align="center" style={{ marginBottom: "13px" }}>
                        {props.content.vendor}
                    </Typography>
                    {
                        props.content.variants[0].compareAtPrice !== null ?
                            <div style={{ display: "flex", alignItems: "flex-end" }}>
                                <Typography variant="h6" style={{ color: "#959494", marginRight: "8px", textDecoration: "line-through" }}>
                                    {currencyDic[currency].symbol} {getCurrPrice(props.content.variants[0], 1)[0]}
                                </Typography>
                                <Typography variant="h5" style={{ color: "#e13367", fontWeight: "bold" }}>
                                    {currencyDic[currency].symbol} {getCurrPrice(props.content.variants[0], 1)[1]}
                                </Typography>
                            </div>
                            :
                            <Typography variant="h5" style={{ color: "black", fontWeight: "bold" }}>
                                {currencyDic[currency].symbol} {getCurrPrice(props.content.variants[0], 0)[0]}
                            </Typography>
                    }
                </div>
            </animated.div>
    )
}

export default HomeDealsProduct;