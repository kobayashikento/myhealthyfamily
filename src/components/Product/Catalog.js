import { Breadcrumbs, Button, Container, Grid, Menu, Typography, MenuItem } from '@material-ui/core';
import React from 'react';
import { Spring } from 'react-spring/renderprops-universal';
import HomeDealsProduct from '../Home/HomeDeals/HomeDealsProduct';
import Contact from '../Footer/Contact';
import FooterMenu from '../Footer/FooterMenu';
import SortByDropdown from './SortByDropdown';

import { Link } from 'react-router-dom';

import { useShopify } from "../../hooks";

import { animated, useSpring } from 'react-spring';
import { Skeleton } from '@material-ui/lab';

import { isEmpty } from '../../assests/functions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TuneIcon from '@material-ui/icons/Tune';

const linkStyle = { fontSize: "14px", textDecoration: "none", color: "inherit" }

const Catalog = (props) => {

    //takes in props collection
    const { fetchProduct } = useShopify();
    const matches = useMediaQuery('(min-width:1024px)', { noSsr: true });

    const [navIndex, setNavIndex] = React.useState(0);
    //0: Alphabet up, 1: Alphabet down, 2: Price low, 3: Price high, 4: newest, 5: oldest
    const [sortBy, setSortBy] = React.useState(0);
    const [productsList, setProducts] = React.useState([]);
    const [category, setCategory] = React.useState("default");
    const [catHover, setCatHover] = React.useState(false);
    const [breadHover, setBreadHover] = React.useState(0);

    // onMount set the default sort option to be alphabetic
    React.useEffect(() => {
        let temp = [...props.collection.products.sort((a, b) => a.title.localeCompare(b.title))];
        setProducts(temp);
    }, [])

    const getTypes = () => {
        let tempTypes = [];
        props.collection.products.forEach(product => {
            if (!(tempTypes.includes(product.productType.toLowerCase()))) {
                tempTypes.push(product.productType.toLowerCase())
            }
        })
        return tempTypes;
    }

    const sortProducts = (productArr, type) => {
        switch (type) {
            case 0:
                return (productArr.sort((a, b) => a.title.localeCompare(b.title)));
            case 1:
                return (productArr.sort((a, b) => b.title.localeCompare(a.title)));
            case 2:
                return (productArr.sort(function (a, b) {
                    if (parseInt(a.variants[0].compareAtPrice === null ?
                        a.variants[0].price : a.variants[0].compareAtPrice)
                        < parseInt(b.variants[0].compareAtPrice === null ? b.variants[0].price : b.variants[0].compareAtPrice)) { return -1; }
                    if (parseInt(a.variants[0].compareAtPrice === null ? a.variants[0].price : a.variants[0].compareAtPrice) >
                        parseInt(b.variants[0].compareAtPrice === null ? b.variants[0].price : b.variants[0].compareAtPrice)) { return 1; }
                    return 0;
                }))
            case 3:
                return (productArr.sort(function (a, b) {
                    if (parseInt(a.variants[0].compareAtPrice === null ?
                        a.variants[0].price : a.variants[0].compareAtPrice)
                        > parseInt(b.variants[0].compareAtPrice === null ? b.variants[0].price : b.variants[0].compareAtPrice)) { return -1; }
                    if (parseInt(a.variants[0].compareAtPrice === null ? a.variants[0].price : a.variants[0].compareAtPrice) <
                        parseInt(b.variants[0].compareAtPrice === null ? b.variants[0].price : b.variants[0].compareAtPrice)) { return 1; }
                    return 0;
                }))
            case 4:
                return (productArr.sort((a, b) => a.createdAt.localeCompare(b.createdAt)));
            case 5:
                return (productArr.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
            default:
        }
    }

    const ProductList = () => {
        let tempTypes = {};
        let content = [];
        props.collection.products.forEach(product => {
            if (!(product.productType in tempTypes)) {
                tempTypes[product.productType] = 1;
            } else {
                let tempCount = tempTypes[product.productType];
                tempTypes[product.productType] = tempCount + 1;
            }
        })
        let index = 0;
        for (const type in tempTypes) {
            const newIndex = index += 1;
            content.push(
                <Spring
                    to={{ transform: navIndex === newIndex ? "translateX(1rem)" : "translateX(0rem)" }}
                    from={{
                        transform: "translateX(0rem)", color: "#2b2b2b",
                        fontSize: `15px`, cursor: "pointer", fontFamily: "SofiaR", marginBottom: "8px",
                    }}
                    key={`link-${props.collection.title}-${newIndex}`}
                >
                    {prop =>
                        <div style={{ width: "fit-content", ...prop, pointerEvents: category === type ? "none" : "auto" }}>
                            <div style={{ textTransform: "capitalize", color: "inherit", textDecoration: "none", display: "flex", alignItems: "center" }}
                                onMouseEnter={() => setNavIndex(newIndex)} onMouseLeave={() => setNavIndex(0)}
                                onClick={() => setCategory(type)}
                            >
                                <div style={{
                                    height: "6px", width: "6px", borderRadius: "50%", background: "black", marginRight: "5px",
                                    display: category === type ? "" : "none"
                                }} />
                                <span>
                                    {type}
                                    <Spring
                                        to={{ width: navIndex === newIndex ? "100%" : "0%" }}
                                        from={{
                                            width: "0%", height: "1.5px", backgroundColor: "black", marginTop: "2px"
                                        }}
                                        key={`link-${props.collection.title}-${newIndex}-underline`}
                                    >
                                        {innerprop => <div style={innerprop} />}
                                    </Spring>
                                </span>
                                <span style={{ marginLeft: "4px", color: "grey", marginBottom: "4px" }}>
                                    ({tempTypes[type]})
                                </span>
                            </div>
                        </div>
                    }
                </Spring>
            )
        }
        return (content);
    }

    // Change the category based on types
    React.useEffect(() => {
        let temp = [];
        if (category === "default") {
            temp = sortProducts([...props.collection.products], sortBy);
            return setProducts(temp);
        }
        props.collection.products.forEach(ele => {
            if (ele.productType.toLowerCase() === category.toLowerCase()) {
                temp.push(ele)
            }
        })
        let sortArr = sortProducts(temp, sortBy);
        return setProducts(sortArr);
    }, [category, sortBy]);

    // Handle Sorting Options 
    React.useEffect(() => {
        if (productsList.length !== 0) {
            let sortedArr = sortProducts(productsList, sortBy);
            setProducts([...sortedArr]);
        }
    }, [sortBy])

    function handleItemClick(e, product_id) {
        e.preventDefault()
        const id = product_id;
        fetchProduct(id).then((res) => {
            props.history.push(`/product/${res.id}`);
            props.scrollbar.current.scrollToTop();
        })
    }

    const catSpring = useSpring({
        to: { width: catHover ? "100%" : "0%" },
        from: { width: "0%", height: "1.5px", background: "black", marginBottom: `20px`, }
    })

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e) => {
        setAnchorEl(null);
        setCategory(e);
    };

    return (
        matches ?
            <div>
                <Container maxWidth="lg" style={{ marginBottom: "5.5vmax" }}>
                    <Breadcrumbs>
                        <Spring
                            to={{ width: breadHover === 1 ? "100%" : "0%" }}
                            from={{
                                width: "0%", background: "grey", height: "1.5px"
                            }}
                        >
                            {prop =>
                                <div onMouseEnter={() => setBreadHover(1)} onMouseLeave={() => setBreadHover(0)}>
                                    {
                                        isEmpty(props.shopDetails) ? <Skeleton animation="wave" width={70} height={10} />
                                            :
                                            <Link to="/" style={linkStyle}>
                                                <Typography variant="h6">
                                                    {props.shopDetails.info.name}
                                                </Typography>
                                            </Link>
                                    }
                                    <div style={prop} />
                                </div>
                            }
                        </Spring>
                        <Spring
                            to={{ width: breadHover === 2 ? "100%" : "0%" }}
                            from={{
                                width: "0%", background: "grey", height: "1.5px",
                                color: category === "default" ? "black" : "grey"
                            }}
                        >
                            {prop =>
                                <div style={{ pointerEvents: category === "default" ? "none" : "auto", }} onMouseEnter={() => setBreadHover(2)} onMouseLeave={() => setBreadHover(0)}>
                                    <Typography variant="h6" color="textPrimary" style={{
                                        textTransform: "capitalize", color: category === "default" ? "black" : "grey", cursor: "pointer"
                                    }} onClick={() => setCategory("default")}
                                    >
                                        {props.collection.title.toLowerCase()}
                                    </Typography>
                                    <div style={prop} />
                                </div>
                            }
                        </Spring>
                        {
                            category === "default" ? null :
                                <Typography variant="h6" color="textPrimary" style={{ textTransform: "capitalize" }}>
                                    {category}
                                </Typography>
                        }
                    </Breadcrumbs>
                    <Typography style={{
                        fontSize: `${50 / 1920 * props.width}px`, textTransform: "capitalize", fontWeight: "500",
                        width: "fit-content", margin: "27px auto 27px auto", fontFamily: 'FirusasHeader, "Times New Roman", Times, Georgia, serif'
                    }}
                    >
                        {props.collection.title.toLowerCase()}
                    </Typography>
                    <Grid container spacing={7} justify="flex-start">
                        <Grid item xs={2} style={{ display: "flex", flexDirection: "column" }}>
                            <div>
                                <Typography style={{ fontSize: "17px", fontWeight: "bold", width: "fit-content", textTransform: "uppercase", cursor: "pointer" }}
                                    onClick={() => setCategory("default")} onMouseEnter={() => setCatHover(true)} onMouseLeave={() => setCatHover(false)}
                                >
                                    {props.collection.title.toLowerCase()}
                                    <animated.div style={catSpring} />
                                </Typography>
                                {
                                    isEmpty(props.collection) ? undefined :
                                        <ProductList />
                                }
                            </div>
                        </Grid>
                        <Grid item xs={10}>
                            <div style={{
                                margin: "0 25px 10px 20px", display: "flex", justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Typography variant="h5" style={{ color: "#2b2b2b", width: "fit-content" }}>
                                    {productsList.length} items
                    </Typography>
                                <SortByDropdown sortBy={sortBy} setSortBy={(index) => setSortBy(index)} />
                            </div>
                            <Grid container>
                                {productsList.map((ele, index) => {
                                    return (
                                        <Grid key={`item-${index}`} item xs={4} onClick={(e) => handleItemClick(e, ele.id)}>
                                            <HomeDealsProduct content={ele} scrollbar={props.scrollbar} />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                <Contact width={props.width} />
                <FooterMenu width={props.width} shopDetails={props.shopDetails} scrollbar={props.scrollbar} />
            </div >
            :
            <div style={{ overflow: "hidden" }}>
                <Breadcrumbs style={{ width: "fit-content", margin: "2.2vmax auto 0 auto" }}>
                    <Spring
                        to={{ width: breadHover === 1 ? "100%" : "0%" }}
                        from={{
                            width: "0%", background: "grey", height: "1.5px"
                        }}
                    >
                        {prop =>
                            <div onMouseEnter={() => setBreadHover(1)} onMouseLeave={() => setBreadHover(0)}>
                                {
                                    isEmpty(props.shopDetails) ? <Skeleton animation="wave" width={70} height={10} />
                                        :
                                        <Link to="/" style={linkStyle}>
                                            <Typography variant="h6">
                                                {props.shopDetails.info.name}
                                            </Typography>
                                        </Link>
                                }
                                <div style={prop} />
                            </div>
                        }
                    </Spring>
                    <Spring
                        to={{ width: breadHover === 2 ? "100%" : "0%" }}
                        from={{
                            width: "0%", background: "grey", height: "1.5px",
                            color: category === "default" ? "black" : "grey"
                        }}
                    >
                        {prop =>
                            <div style={{ pointerEvents: category === "default" ? "none" : "auto", }} onMouseEnter={() => setBreadHover(2)} onMouseLeave={() => setBreadHover(0)}>
                                <Typography variant="h6" color="textPrimary" style={{
                                    textTransform: "capitalize", color: category === "default" ? "black" : "grey", cursor: "pointer"
                                }} onClick={() => setCategory("default")}
                                >
                                    {props.collection.title.toLowerCase()}
                                </Typography>
                                <div style={prop} />
                            </div>
                        }
                    </Spring>
                    {
                        category === "default" ? null :
                            <Typography variant="h6" color="textPrimary" style={{ textTransform: "capitalize" }}>
                                {category}
                            </Typography>
                    }
                </Breadcrumbs>
                <Typography style={{
                    fontSize: `${80 / 1024 * props.width}px`, textTransform: "capitalize", fontWeight: "500",
                    width: "fit-content", margin: "14px auto 0 auto", fontFamily: 'FirusasHeader, "Times New Roman", Times, Georgia, serif'
                }}
                >
                    {props.collection.title.toLowerCase()}
                </Typography>
                <Typography variant="h5" style={{ color: "#2b2b2b", width: "fit-content", margin: "0 auto" }}>
                    {productsList.length} items
                </Typography>
                <div style={{ display: "flex", width: "90vw", margin: "2.2vmax auto 0 auto", justifyContent: "center" }}>
                    <div style={{ marginRight: "5px" }}>
                        <Button onClick={handleClick} style={{ border: "1px solid #CDCDCD", display: "flex", alignItems: "center", borderRadius: "0px", minHeight: "50px", padding: "0 20px" }}>
                            <TuneIcon fontSize="large" style={{ color: "black" }} />
                            <Typography variant="h6" >Filter</Typography>
                        </Button>
                    </div>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={() => handleClose(category)}
                    >
                        {
                            getTypes().map((ele, index) => {
                                return (
                                    <MenuItem onClick={() => handleClose(ele)}>
                                        <Typography variant="h5" key={`type-${ele.title}`}
                                            style={{ textTransform: "capitalize", fontWeight: "bold", width: "fit-content", }}
                                        >
                                            {ele}
                                        </Typography>
                                    </MenuItem>
                                )
                            })
                        }
                    </Menu>
                    <div style={{ marginLeft: "5px" }}>
                        <Button style={{ border: "1px solid #CDCDCD", display: "flex", alignItems: "center", borderRadius: "0px", minHeight: "50px" }}>
                            <SortByDropdown sortBy={sortBy} setSortBy={(index) => setSortBy(index)} />
                        </Button>
                    </div>
                </div>
                <div style={{
                    margin: "15px 10px 10px 10px", display: "flex", justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Grid container spacing={2}>
                        {productsList.map((ele, index) => {
                            return (
                                <Grid key={`item-${index}`} item xs={6} onClick={(e) => handleItemClick(e, ele.id)}>
                                    <HomeDealsProduct content={ele} scrollbar={props.scrollbar} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
                <Contact width={props.width} />
                <FooterMenu width={props.width} shopDetails={props.shopDetails} scrollbar={props.scrollbar} />
            </div>
    )
}

export default (Catalog);