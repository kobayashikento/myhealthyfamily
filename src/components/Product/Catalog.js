import { Breadcrumbs, Container, Grid, Typography } from '@material-ui/core';
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

const convertedLink = (ele) => {
    return ele.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-");
}

function isEmpty(obj) {
	return Object.keys(obj).length === 0;
}

const Catalog = (props) => {

    //takes in props collection
    const { fetchProduct } = useShopify();

    const [navIndex, setNavIndex] = React.useState(0);
    //0: Alphabet, 1: Price, 2: Newest, 3: Sale
    const [sortBy, setSortBy] = React.useState(0);
    const [products, setProducts] = React.useState([]);
    const [category, setCategory] = React.useState("default");

    const linkStyle = { fontSize: "14px", textDecoration: "none", color: "inherit" }

    const getAllProductTypes = () => {
        let tempTypes = {};
        let content = [];

        props.collection.products.forEach(product => {
            if (!(product.productType.toLowerCase() in tempTypes)) {
                tempTypes[product.productType.toLowerCase()] = 1;
            } else {
                let tempCount = tempTypes[product.productType.toLowerCase()];
                tempTypes[product.productType.toLowerCase()] = tempCount + 1;
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
                        fontSize: `15px`, cursor: "pointer", fontFamily: "SofiaR", marginBottom: "20px",
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
                                </span>
                                <span style={{ marginLeft: "4px", color: "grey" }}>
                                    ({tempTypes[type]})
                                </span>
                            </div>
                            <Spring
                                to={{ width: navIndex === newIndex ? "100%" : "0%" }}
                                from={{
                                    width: "0%", height: "1.5px", backgroundColor: "black", marginTop: "2px"
                                }}
                                key={`link-${props.collection.title}-${newIndex}-underline`}
                            >
                                {innerprop => <div style={innerprop} />}
                            </Spring>
                        </div>
                    }
                </Spring>
            )
        }
        return (content);
    }

    // const getAllTags = () => {
    //     const tagsArr = [];
    //     let id = "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY1NTY4OTg3ODc1MDc="
    //     let item = fetchProduct(id)
    //     // props.collection.products.forEach(product => {
    //     //     let item = fetchProduct(product.id)
    //     //     // product.tags.forEach(tag => {
    //     //     //     if (!(tagsArr.includes(tag))) {
    //     //     //         tagsArr.push(tag)
    //     //     //     }
    //     //     // })
    //     // })

    //     //console.log(tagsArr)
    //     return item.tags
    // }

    React.useEffect(() => {
        let temp = [];
        if (category === "default") {
            temp = props.collection.products
        } else {
            props.collection.products.forEach(ele => {
                if (ele.productType.toLowerCase() === category) {
                    temp.push(ele)
                }
            })
        }
        setProducts(temp);
    }, [category]);

    React.useEffect(() => {
        switch (sortBy) {
            case 0:
                products.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 1:
                products.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 2:
            // products.sort(function (a, b) {
            //     if ((a.variants[0].compareAtPrice === null ? a.variants[0].price : a.variants[0].compareAtPrice) <
            //         ({ return -1; }
            //     if ((a.variants[0].compareAtPrice === null ? a.variants[0].price : a.variants[0].compareAtPrice) >
            //             (b.variants[0].compareAtPrice === null ? b.variants[0].price : b.variants[0].compareAtPrice)) { return 1; }
            //     return 0;
            // })
            // break;
            default:
        }
    }, [sortBy])

    React.useEffect(() => {
        setProducts(props.collection.products.sort((a, b) => a.title.localeCompare(b.title)));
    }, [props.collection])

    function handleItemClick(e, product_id) {
        e.preventDefault()
        const id = product_id;
        fetchProduct(id).then((res) => {
            props.history.push(`/product/${res.id}`);
            props.scrollbar.current.scrollToTop();
        })
    }

    const [catHover, setCatHover] = React.useState(false);

    const catSpring = useSpring({
        to: { width: catHover ? "100%" : "0%" },
        from: { width: "0%", height: "1.5px", background: "black", marginBottom: `20px`, }
    })

    const [breadHover, setBreadHover] = React.useState(0)

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
                                {
                                    isEmpty(props.shopDetails) ? <Skeleton animation="wave" width={70} height={10} />
                                        :
                                        <Link to="/" style={linkStyle}>
                                            {props.shopDetails.info.name}
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
                                <Typography color="textPrimary" style={{
                                    textTransform: "capitalize", fontSize: "14px",
                                    color: category === "default" ? "black" : "grey",
                                    cursor: "pointer"
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
                            <Typography color="textPrimary" style={{ textTransform: "capitalize", fontSize: "14px" }}>
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
                            <Typography style={{
                                fontSize: `17px`, fontWeight: "bold",
                                width: "fit-content", textTransform: "capitalize", cursor: "pointer"
                            }}
                                onClick={() => setCategory("default")} onMouseEnter={() => setCatHover(true)} onMouseLeave={() => setCatHover(false)}
                            >
                                {props.collection.title.toLowerCase()}
                                <animated.div style={catSpring} />
                            </Typography>
                            {getAllProductTypes()}
                        </div>
                        {/* <div style={{ marginTop: "4.4vmax" }}>
                            <Typography style={{
                                fontSize: `17px`, fontWeight: "bold",
                                width: "fit-content", marginBottom: `20px`
                            }}>
                                Tags
                            </Typography>
                        </div> */}
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
    )
}

export default React.memo(Catalog);