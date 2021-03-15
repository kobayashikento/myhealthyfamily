import { Breadcrumbs, Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { Spring } from 'react-spring/renderprops-universal';
import HomeDealsProduct from '../Home/HomeDeals/HomeDealsProduct';
import Contact from '../Footer/Contact';
import FooterMenu from '../Footer/FooterMenu';
import SortByDropdown from './SortByDropdown';

import { Link } from 'react-router-dom';

import { useShopify } from "../../hooks";
import { SportsRugbyTwoTone } from '@material-ui/icons';

const convertedLink = (ele) => {
    return ele.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-");

}

const Catalog = (props) => {

    //takes in props collection
    const { fetchProduct } = useShopify();

    const [navIndex, setNavIndex] = React.useState(0);
    //0: Alphabet, 1: Price, 2: Newest, 3: Sale
    const [sortBy, setSortBy] = React.useState(0);
    const [products, setProducts] = React.useState([]);

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
                        transform: "translateX(0rem)", marginBottom: "20px", color: "#2b2b2b",
                        fontSize: `15px`, cursor: "pointer"
                    }}
                    key={`link-${props.collection.title}-${newIndex}`}
                >
                    {prop =>
                        <div style={prop}>
                            <Link style={{ textTransform: "capitalize", color: "inherit", textDecoration: "none" }}
                                onMouseEnter={() => setNavIndex(newIndex)} onMouseLeave={() => setNavIndex(0)}
                                to={`/${convertedLink(props.collection.title)}/${type}`}
                            >
                                {type} ({tempTypes[type]})
                            </Link>
                        </div>
                    }
                </Spring>
            )
        }
        return (content);
    }

    const getAllTags = () => {
        const tagsArr = [];
        let id = "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY1NTY4OTg3ODc1MDc="
        let item = fetchProduct(id)
        // props.collection.products.forEach(product => {
        //     let item = fetchProduct(product.id)
        //     // product.tags.forEach(tag => {
        //     //     if (!(tagsArr.includes(tag))) {
        //     //         tagsArr.push(tag)
        //     //     }
        //     // })
        // })

        //console.log(tagsArr)
        return item.tags
    }

    React.useEffect(() => {
        switch (sortBy) {
            case 0:
                setProducts(props.collection.products.sort((a, b) => a.title.localeCompare(b.title)));
                break;
            case 1:
                setProducts(props.collection.products.sort((a, b) => b.title.localeCompare(a.title)));
                break;
            case 2:
                products.sort(function (a, b) {
                    if ((a.variants[0].compareAtPrice === null ? a.variants[0].price : a.variants[0].compareAtPrice) <
                        (b.variants[0].compareAtPrice === null ? b.variants[0].price : b.variants[0].compareAtPrice)) { return -1; }
                    if ((a.variants[0].compareAtPrice === null ? a.variants[0].price : a.variants[0].compareAtPrice) >
                        (b.variants[0].compareAtPrice === null ? b.variants[0].price : b.variants[0].compareAtPrice)) { return 1; }
                    return 0;
                })
                break;
            default:
        }
    }, [sortBy])

    React.useEffect(() => {
        setProducts(props.collection.products.sort((a, b) => a.title.localeCompare(b.title)));
    }, [props.collection])

    return (
        <div>
            <Container maxWidth="lg" style={{ marginBottom: "5.5vmax" }}>
                <Breadcrumbs>
                    <Link to="/" style={linkStyle}>
                        {props.shopDetails.name}
                    </Link>
                    <Typography color="textPrimary" style={{ textTransform: "capitalize", fontSize: "14px" }}>
                        {props.collection.title.toLowerCase()}
                    </Typography>
                </Breadcrumbs>
                <Typography style={{
                    fontSize: `${50 / 1920 * props.width}px`, textTransform: "capitalize", fontWeight: "500",
                    width: "fit-content", margin: "27px auto 27px auto", fontFamily: 'FirusasHeader, "Times New Roman", Times, Georgia, serif'
                }}>
                    {props.collection.title.toLowerCase()}
                </Typography>
                <Grid container spacing={7} justify="flex-start">
                    <Grid item xs={2} style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                            <Typography style={{
                                fontSize: `17px`, fontWeight: "bold",
                                width: "fit-content", marginBottom: `20px`, textTransform: "capitalize"
                            }}>
                                {props.collection.title.toLowerCase()}
                            </Typography>
                            {getAllProductTypes()}
                        </div>
                        <div style={{ marginTop: "4.4vmax" }}>
                            <Typography style={{
                                fontSize: `17px`, fontWeight: "bold",
                                width: "fit-content", marginBottom: `20px`
                            }}>
                                Tags
                            </Typography>
                        </div>
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
                                {props.collection.products.length} items
                    </Typography>
                            <SortByDropdown sortBy={sortBy} setSortBy={(index) => setSortBy(index)} />
                        </div>
                        <Grid container>
                            {products.map(ele => {
                                return (
                                    <Grid item xs={4}>
                                        <HomeDealsProduct content={ele} />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Contact width={props.width} />
            <FooterMenu width={props.width} shopDetails={props.shopDetails} />
        </div >
    )
}

export default React.memo(Catalog);