import React from 'react';
import Contact from '../Footer/Contact';
import FooterMenu from '../Footer/FooterMenu';
import SortByDropdown from './SortByDropdown';
import HomeDealsProduct from '../Home/HomeDeals/HomeDealsProduct';

import { Breadcrumbs, Container, Typography, Grid } from '@material-ui/core';
import { Spring } from 'react-spring/renderprops-universal';

import { Link } from 'react-router-dom';

import { useShopify } from '../../hooks';

const makeLink = (s) => {
    return s.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-");
}

const AllCatalog = (props) => {

    const { fetchProduct } = useShopify();

    const [breadHover, setBreadHover] = React.useState(0)
    const linkStyle = { fontSize: "14px", textDecoration: "none", color: "inherit" }
    const [products, setProducts] = React.useState(props.collection);
    const [sortBy, setSortBy] = React.useState(0);
    const [navIndex, setNavIndex] = React.useState(0);

    function handleItemClick(e, product_id) {
        e.preventDefault()
        const id = product_id;
        fetchProduct(id).then((res) => {
            props.history.push(`/product/${res.id}`)
        })
        props.scrollbar.current.scrollToTop();
    }

    React.useEffect(() => {
        setProducts(props.collection);
    }, [props.collection])

    return (
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
                                <Link to="/" style={linkStyle}>
                                    {props.shopDetails.info.name}
                                </Link>
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
                                            <Link to={`/${makeLink(ele.title)}`}
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
    )
}

export default AllCatalog;