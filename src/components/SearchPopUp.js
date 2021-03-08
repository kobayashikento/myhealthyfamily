import { Divider, Typography } from '@material-ui/core';
import React from 'react';

import CloseIcon from '@material-ui/icons/Close';

import '../assests/styles/searchPopupStyle.css';

import { useShopify } from "../hooks";

import { animated, useSpring } from 'react-spring';
import { Spring } from 'react-spring/renderprops';

import { currencyDic } from '../assests/constants';

const SearchPopUp = (props) => {
    let popupRef = React.useRef();

    const { products, fetchProduct, currency } = useShopify();
    const [categories, setCategories] = React.useState([]);
    const [display, setDisplay] = React.useState({});
    const [hover, setHover] = React.useState(0);
    const [allHover, setAllHover] = React.useState(false);

    const categoryTitle = { fontSize: "14px", fontWeight: "bold", paddingBottom: "18px" }

    function handleClick(e, product_id) {
        const id = product_id
        fetchProduct(id).then((res) => {
            props.history.push(`/Product/${res.id}`)
        })
    }

    const getData = (input) => {
        let tempCat = [];
        let tempDisplay = {};
        products.forEach(ele => {
            if (ele.productType.toLowerCase().includes(input.toLowerCase())) {
                if (!(tempCat.includes(ele.productType))) {
                    tempCat.push(ele.productType);
                }
            }
            if (ele.productType.toLowerCase().includes(input.toLowerCase()) || ele.title.toLowerCase().includes(input.toLowerCase())) {
                if (!(ele.id in tempDisplay)) {
                    tempDisplay[`${ele.id}`] = ele;
                }
            }
        });
        return [tempCat, tempDisplay];
    }

    const makeCategory = () => {
        return (
            categories.map((category, index) => {
                if (index < 9) {
                    return (
                        <Spring
                            to={{ width: hover === index + 1 ? "100%" : "0%" }}
                            from={{ width: "0%", opacity: 1, background: "black", height: "1px", marginBottom: "10px" }}
                            key={`category-${index}`}
                        >
                            {prop =>
                                <div style={{ width: "fit-content", cursor: "pointer" }} onMouseEnter={() => setHover(index + 1)} onMouseLeave={() => setHover(0)}>
                                    <Typography style={{ fontSize: "15px", fontWeight: "500" }}>
                                        {category}
                                    </Typography>
                                    <animated.div style={prop} />
                                </div>
                            }
                        </Spring>
                    )
                }
                return false;
            })
        )
    }

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

    const makeDisplay = () => {
        let dis = [];
        let index = 0;
        for (const item in display) {
            if (index === 3) {
                break;
            }
            dis.push(
                <a key={`display-${index}`} className="search_popup_product" onClick={(e) => handleClick(e, item)}>
                    <div className="search_popup_left">
                        <img src={`${display[item].images[0].src}`} />
                    </div>
                    <div>
                        <Typography style={{ fontSize: "16px", fontWeight: "500", marginBottom: "15px" }}>
                            {display[item].title}
                        </Typography>
                        <Typography style={{ fontSize: "14px", marginBottom: "15px", color: "#555454" }}>
                            {display[item].productType}
                        </Typography>
                        <div>
                            {display[item].presentmentPriceRanges !== undefined ?
                                null
                                :
                                display[item].variants[0].compareAtPrice !== null ?
                                    <div style={{ display: "flex", alignItems: "flex-end" }}>
                                        <Typography style={{ fontSize: "14px", color: "#959494", marginRight: "15px", textDecoration: "line-through" }}>
                                            {currencyDic[currency].symbol} {getCurrPrice(display[item].variants[0], 1)[0]}
                                        </Typography>
                                        <Typography style={{ fontSize: "18px", color: "#e13367" }}>
                                            {currencyDic[currency].symbol} {getCurrPrice(display[item].variants[0], 1)[1]}
                                        </Typography>
                                    </div>
                                    :
                                    <Typography style={{ fontSize: "14px", color: "black" }}>
                                        {currencyDic[currency].symbol} {getCurrPrice(display[item].variants[0], 0)[0]}
                                    </Typography>
                            }
                        </div>
                    </div>
                </a>
            )
            index += 1;
        }
        return dis;
    }

    React.useEffect(() => {
        setCategories(getData(props.input)[0]);
        setDisplay(getData(props.input)[1]);
    }, [props.input]);

    React.useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                props.setSearchHover(false);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [popupRef]);

    const openPopup = useSpring({
        to: { opacity: props.input === '' ? 0 : props.searchHover ? 1 : 0, display: props.input === '' ? "none" : props.searchHover ? "flex" : "none" },
        from: { opacity: 0, display: "none" }
    })

    return (
        <animated.div style={openPopup} ref={popupRef} className="search_popup">
            <CloseIcon style={{ position: "absolute", right: "20px", cursor: "pointer" }} onClick={() => props.setSearchHover(false)} />
            <div style={{ width: "240px" }}>
                <Typography style={categoryTitle}>
                    CATEGORIES
                </Typography>
                <Divider />
                {
                    categories.length === 0 ?
                        <Typography style={{ ...categoryTitle, fontWeight: "400", margin: "20px 20px 40px 0" }}>
                            Unfortunately we could not find any results for your search
                </Typography>
                        :
                        <div style={{ marginTop: "20px", marginLeft: "10px" }}>
                            {makeCategory()}
                        </div>
                }
            </div>
            <Divider orientation="vertical" style={{ height: "auto", marginTop: "40px" }} />
            <div style={{ width: "311px" }}>
                <Typography style={{ ...categoryTitle, marginLeft: "1rem" }}>
                    PRODUCTS
                </Typography>
                <Divider />
                {
                    Object.keys(display).length === 0 ?
                        <Typography style={{ ...categoryTitle, fontWeight: "400", margin: "20px 20px 40px 20px" }}>
                            Unfortunately we could not find any results for your search
                </Typography>
                        :
                        <div>
                            {makeDisplay()}
                        </div>
                }
            </div>
            <Spring
                to={{ width: allHover ? "100%" : "0%" }}
                from={{ width: "0%", opacity: 1, background: "black", height: "1px", marginBottom: "18px" }}
                key={`category-view-all`}
            >
                {prop =>
                    <div style={{ width: "fit-content", cursor: "pointer", position: "absolute", bottom: "0px" }} onMouseEnter={() => setAllHover(true)} onMouseLeave={() => setAllHover(false)}>
                        <Typography className="headerDrop_item" style={{ fontSize: "15px", fontWeight: "500" }}>
                            View All →
                                </Typography>
                        <animated.div style={prop} />
                    </div>
                }
            </Spring>
        </animated.div>
    )
}

export default SearchPopUp;