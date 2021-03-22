import React from 'react';
import Contact from '../Footer/Contact';
import FooterMenu from '../Footer/FooterMenu';
import SortByDropdown from './SortByDropdown';
import HomeDealsProduct from '../Home/HomeDeals/HomeDealsProduct';

import { Breadcrumbs, Container, Typography, Grid, Button, Menu, MenuItem } from '@material-ui/core';
import { Spring } from 'react-spring/renderprops-universal';

import { Link } from 'react-router-dom';

import { useShopify } from '../../hooks';

import { isEmpty, convertedLink } from '../../assests/functions';
import { Skeleton } from '@material-ui/lab';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import TuneIcon from '@material-ui/icons/Tune';

const AllCatalog = (props) => {

    const { fetchProduct } = useShopify();
    const matches = useMediaQuery('(min-width:1024px)', { noSsr: true });

    const [breadHover, setBreadHover] = React.useState(0)
    const linkStyle = { fontSize: "14px", textDecoration: "none", color: "inherit" }
    const [products, setProducts] = React.useState([]);
    const [sortBy, setSortBy] = React.useState(0);
    const [navIndex, setNavIndex] = React.useState(0);

    function handleItemClick(e, product_id) {
        e.preventDefault()
        const id = product_id;
        fetchProduct(id).then((res) => {
            props.history.push(`/product/${res.id}`)
            props.scrollbar.current.scrollToTop();
        })
    }

    // onMount set the default sort option to be alphabetic
    React.useEffect(() => {
        let temp = [...props.collection.sort((a, b) => a.title.localeCompare(b.title))];
        setProducts(temp);
    }, [])

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

    React.useEffect(() => {
        if (products.length !== 0) {
            let sortedArr = sortProducts(products, sortBy);
            setProducts([...sortedArr]);
        }
    }, [sortBy])

    React.useEffect(() => {
        setProducts(props.collection);
    }, [props.collection])

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                                        isEmpty(props.shopDetails) ? null :
                                            <Link to="/" style={linkStyle}>
                                                {props.shopDetails.info.name}
                                            </Link>
                                    }
                                    <div style={prop} />
                                </div>
                            }
                        </Spring>
                        <Typography color="textPrimary" style={{ textTransform: "capitalize", fontSize: "14px" }}>
                            All Products
                            </Typography>
                    </Breadcrumbs>
                    <Typography style={{
                        fontSize: `${50 / 1920 * props.width}px`, textTransform: "capitalize", fontWeight: "500",
                        width: "fit-content", margin: "27px auto 27px auto", fontFamily: 'FirusasHeader, "Times New Roman", Times, Georgia, serif'
                    }}
                    >
                        All Products
                </Typography>
                    <Grid container spacing={7} justify="flex-start">
                        <Grid item xs={2} style={{ display: "flex", flexDirection: "column" }}>
                            {
                                props.featured.map((ele, index) => {
                                    return (
                                        <Spring
                                            to={{ width: navIndex === index + 1 ? "100%" : "0%" }}
                                            from={{
                                                width: "0%", background: "grey", height: "2px"
                                            }}
                                        >
                                            {prop =>
                                                <Link to={`/${convertedLink(ele.title)}`}
                                                    style={{ margin: "10px 0", width: "fit-content", cursor: "pointer", color: "inherit", textDecoration: "none" }}
                                                    onMouseEnter={() => setNavIndex(index + 1)} onMouseLeave={() => setNavIndex(0)}>
                                                    <Typography key={`type-${ele.title}`} style={{
                                                        fontSize: `${25 / 1920 * props.width}px`, textTransform: "capitalize", fontWeight: "bold",
                                                        width: "fit-content",
                                                    }}
                                                    >
                                                        {ele.title.toLowerCase()}
                                                    </Typography>
                                                    <div style={prop} />
                                                </Link>
                                            }
                                        </Spring>
                                    )
                                })
                            }
                        </Grid>
                        <Grid item xs={10}>
                            <div style={{
                                margin: "0 25px 10px 20px", display: "flex", justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Typography style={{
                                    fontSize: `15px`, color: "#2b2b2b",
                                    width: "fit-content"
                                }}>
                                    {products.length} items
                    </Typography>
                                <SortByDropdown sortBy={sortBy} setSortBy={(index) => setSortBy(index)} />
                            </div>
                            <Grid container>
                                {products.map((ele, index) => {
                                    return (
                                        <Grid key={`item-${index}`} item xs={4} onClick={(e) => handleItemClick(e, ele.id)}>
                                            <HomeDealsProduct content={ele} />
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
                    <Typography variant="h6" style={{ color: "black" }}>
                        All Products
                                            </Typography>
                </Breadcrumbs>
                <Typography style={{
                    fontSize: `${80 / 1024 * props.width}px`, textTransform: "capitalize", fontWeight: "500",
                    width: "fit-content", margin: "14px auto 0 auto", fontFamily: 'FirusasHeader, "Times New Roman", Times, Georgia, serif'
                }}
                >
                    All Products
                </Typography>
                <Typography variant="h5" style={{ color: "#2b2b2b", width: "fit-content", margin: "0 auto" }}>
                    {products.length} items
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
                        onClose={handleClose}
                    >
                        {
                            props.featured.map((ele, index) => {
                                return (
                                    <MenuItem onClick={handleClose}>
                                        <Link to={`/${convertedLink(ele.title)}`}
                                            style={{ margin: "10px 0", width: "fit-content", cursor: "pointer", color: "inherit", textDecoration: "none" }}
                                        >
                                            <Typography variant="h5" key={`type-${ele.title}`}
                                                style={{ textTransform: "capitalize", fontWeight: "bold", width: "fit-content", }}
                                            >
                                                {ele.title.toLowerCase()}
                                            </Typography>
                                        </Link>
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
                        {products.map((ele, index) => {
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

export default AllCatalog;