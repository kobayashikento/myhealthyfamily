import React, { useEffect, useState } from "react"

import { Link } from "react-router-dom"
import { useShopify } from "../../hooks"

import { Spring } from 'react-spring/renderprops-universal';
import { animated, useSpring } from "react-spring";

import { Breadcrumbs, Container, Grid, Typography, FormControl, Select, MenuItem, Divider, IconButton, Snackbar } from "@material-ui/core";
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { CarouselProvider, Slider, Slide, ImageWithZoom } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Skeleton } from "@material-ui/lab";
import CloseIcon from '@material-ui/icons/Close';

import parse from 'html-react-parser';

import { withStyles } from '@material-ui/core/styles';

import Contact from '../Footer/Contact';
import FooterMenu from '../Footer/FooterMenu';
import HomeDeals from "../Home/HomeDeals/HomeDeals";

import { currencyDic } from '../../assests/constants';

import { isEmpty, convertedLink } from '../../assests/functions';

import '../../assests/styles/productViewStyle.css';

function useWindowSize() {
	const [size, setSize] = React.useState([0, 0]);
	React.useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight]);
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);
	return size;
}

const CssFormControl = withStyles({
	root: {
		'& .MuiOutlinedInput-root': {
			borderRadius: "0px"
		},
		'& .MuiInputBase-root': {
			fontSize: "15px",
			width: "150px"
		},
		'& label.Mui-focused': {
			color: 'black',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: 'black',
		},
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
			borderColor: "black"
		}
	},
})(FormControl);

const linkStyle = { fontSize: "14px", textDecoration: "none", color: "inherit", textTransform: "capitalize" }

const ProductView = (props) => {
	const [imgIndex, setImgIndex] = React.useState(0);
	const [verImgIndex, setVerImgIndex] = React.useState(0);
	const [imgHover, setImgHover] = React.useState(0);
	const [breadHover, setBreadHover] = React.useState(0);
	const [variation, setVariation] = React.useState(0);
	const [addCartHover, setAddCartHover] = React.useState(false);
	const [descIndex, setDescIndex] = React.useState(true);
	const [readHover, setReadHover] = React.useState(false);
	const [width, height] = useWindowSize();
	const [open, setOpen] = React.useState(false);

	const {
		product,
		fetchProduct,
		openCart,
		checkoutState,
		addVariant,
		shopDetails,
		featured,
		currency
	} = useShopify()

	const id = props.match.params.productId
	const description = product.description && product.description.split(".")

	function addToCart(variant, quantity) {
		try {
			const lineItemsToAdd = [
				{ variantId: variant, quantity: parseInt(quantity, 10) },
			]
			const checkoutId = checkoutState.id
			addVariant(checkoutId, lineItemsToAdd)
			setOpen(true)
			openCart()
		} catch (error) {

		}
	}

	useEffect(() => {
		fetchProduct(id)
	}, [id])

	const findFeatured = () => {
		let temp;
		if (featured.length !== 0) {
			featured.map(ele => {
				if (ele.title.toLowerCase() !== "best sellers") {
					ele.products.map(p => {
						if (p.id === id) { return temp = ele.title }
					})
				}
			})
		}
		return temp;
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

	const getPercent = (price) => {
		return Math.round(((price[0] - price[1]) / price[0]) * 100);
	}

	const createList = () => {
		return (
			product.variants &&
			product.variants.map((item, index) => {
				return (
					<MenuItem key={`variation-${index}`} style={{ fontSize: "15px" }} value={index}>
						{item.title}</MenuItem>
				)
			})
		)
	}

	const handleChange = (e) => {
		setVariation(e.target.value);
	}

	const getSameType = () => {
		let temp = [];
		featured.forEach(ele => {
			if (ele.title.toLowerCase() === findFeatured().toLowerCase()) {
				ele.products.forEach(p => {
					if (product.productType === p.productType && p.id !== id) {
						temp.push(p);
					}
				})
			}
		})
		return temp;
	}

	const readSpring = useSpring({
		to: { width: readHover ? "100%" : "0%" },
		from: { width: "0%", height: "1.5px", background: "black" }
	})

	const handleImgArrow = (dir) => {
		if (dir === "next" && imgIndex + 1 <= product.images.length - 1) {
			setImgIndex(imgIndex + 1);
		} else if (dir === "back" && imgIndex !== 0) {
			setImgIndex(imgIndex - 1);
		}
	}

	const createDescription = () => {
		try {
			return <div style={{ fontSize: "15px", fontFamily: "SofiaR" }}>{parse(`${product.descriptionHtml}`)}</div>
		} catch (error) {
			return (
				description.map((each, i) => {
					return <div
						key={`line-description +${i}`}>
						<Typography style={{ fontSize: "15px" }}>
							{each}
						</Typography>
					</div>
				})
			)
		}
	}

	// React.useEffect(() => {
	// 	if (imgIndex - 3 > verImgIndex) {
	// 		setVerImgIndex(verImgIndex + 1);
	// 	} else {
	// 		if (verImgIndex !== 0) {
	// 			setVerImgIndex(verImgIndex - 1);
	// 		}
	// 	}
	// }, [imgIndex])

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const shadow = "rgba(14, 30, 37, 0.8) 0px 2px 4px 0px, rgba(14, 30, 37, 0.8) 0px 2px 8px 0px";
	const noShadow = "rgba(14, 30, 37, 0) 0px 2px 4px 0px, rgba(14, 30, 37, 0) 0px 2px 8px 0px";

	return (
		<div style={{ marginTop: "2.2vmax" }}>
			<Container maxWidth="lg" style={{ marginBottom: "4.4vmax", paddingLeft: "3.3vmax" }}>
				<Grid container spacing={0} justify="flex-end" style={{ margin: "0", paddingBottom: "6.6vmax" }}>
					<Grid item xs={6} style={{ paddingLeft: "1.1vmax", marginTop: "2.2vmax", position: "relative" }}>
						{
							isEmpty(product) ? null :
								<Grid container justify="center" spacing={5} style={{ position: "sticky", top: "150px" }}>
									<Grid item xs={2} style={{ maxHeight: "70vh" }}>
										<CarouselProvider
											naturalSlideWidth={150}
											naturalSlideHeight={150}
											totalSlides={product.images.length}
											orientation="vertical"
											visibleSlides={6}
											dragEnabled={false}
											currentSlide={verImgIndex}
										>
											<Slider>
												{
													product.images.map((ele, index) => {
														return (
															<Slide key={`ver-image-${index}`} style={{
																opacity: imgHover === index || imgIndex === index ? 0.8 : 1,
															}}
																index={index} onClick={() => setImgIndex(index)} onMouseEnter={() => setImgIndex(index)}
															>
																<Spring
																	to={{
																		transform: imgHover === index ? "scale(1.1)" : "scale(1)",
																		boxShadow: imgIndex === index ? shadow : noShadow
																	}}
																	from={{
																		transform: "scale(1)", cursor: "pointer", boxShadow: noShadow,
																		height: "50px", width: "50px"
																	}}
																>
																	{prop =>
																		<div style={{ margin: "8px" }}>
																			<img
																				style={prop}
																				src={ele.src}
																				alt={`${ele.id} product shot`}
																			/>
																		</div>
																	}
																</Spring>
															</Slide>
														)
													})
												}
											</Slider>
										</CarouselProvider>
									</Grid>
									<Grid item xs={10} style={{ position: "relative", maxHeight: "500px", overflow: "hidden" }}>
										<CarouselProvider
											naturalSlideWidth={100}
											naturalSlideHeight={125}
											totalSlides={product.images.length}
											currentSlide={imgIndex}
										>
											<Slider>
												{
													product.images.map((ele, index) => {
														return (
															<Slide key={`product-image-${index}`} index={index}>
																<ImageWithZoom
																	style={{
																		marginRight: "auto", marginLeft: "auto",
																		padding: "0 20px", maxHeight: "60vh",
																	}}
																	className="mainImage"
																	src={ele.src}
																	alt={`${ele.id} product shot`}
																/>
															</Slide>
														)
													})
												}
											</Slider>
											<IconButton disabled={imgIndex >= product.images.length - 1} onClick={() => handleImgArrow("next")}
												style={{
													background: "transparent", border: "none", position: "absolute",
													top: "40%", right: "0"
												}}><ArrowForwardIosIcon fontSize="large" /></IconButton>
											<IconButton disabled={imgIndex === 0} onClick={() => handleImgArrow("back")}
												style={{
													background: "transparent", border: "none", position: "absolute",
													top: "40%", left: "1.1vmax"
												}}>
												<ArrowBackIosIcon fontSize="large" />
											</IconButton>
										</CarouselProvider>
									</Grid>
								</Grid>
						}
					</Grid>
					<Grid item xs={6} style={{ paddingLeft: "4.4vmax" }}>
						<Breadcrumbs style={{ marginBottom: "3.3vmax" }}>
							<Spring
								to={{ width: breadHover === 1 ? "100%" : "0%" }}
								from={{
									width: "0%", background: "grey", height: "1.5px"
								}}
							>
								{prop =>
									<div onMouseEnter={() => setBreadHover(1)} onMouseLeave={() => setBreadHover(0)}>
										{
											isEmpty(shopDetails) ? <Skeleton animation="wave" width={50} height={10} /> :
												<Link to="/" style={linkStyle}>
													{shopDetails.info.name}
												</Link>
										}
										<div style={prop} />
									</div>
								}
							</Spring>
							{
								!isEmpty(product) ?
									<Spring
										to={{ width: breadHover === 2 ? "100%" : "0%" }}
										from={{
											width: "0%", background: "grey", height: "1.5px"
										}}
									>
										{prop =>
											<div onMouseEnter={() => setBreadHover(2)} onMouseLeave={() => setBreadHover(0)}>
												<Link to={`/${convertedLink(findFeatured())}`} style={linkStyle}>
													{convertedLink(findFeatured())}
												</Link>
												<div style={prop} />
											</div>
										}
									</Spring>
									: null
							}
						</Breadcrumbs>
						<Typography style={{ fontSize: `30px`, fontWeight: "500", maxWidth: "80%" }}>
							{product.title}
						</Typography>
						<Typography style={{ fontSize: `18px`, color: "#555454", margin: "16px 0 36px" }}>
							{product.productType}
						</Typography>
						<div style={{ display: "flex", margin: "3.3vmax 0" }}>
							{isEmpty(product) ?
								null
								:
								product.variants[variation].compareAtPrice !== null ?
									<div style={{ display: "flex", alignItems: "center" }}>
										<Typography style={{ fontSize: `${25 / 1920 * width}px`, color: "#959494", marginRight: "15px", textDecoration: "line-through" }}>
											{currencyDic[currency].symbol} {getCurrPrice(product.variants[variation], 1)[0]}
										</Typography>
										<Typography style={{ fontSize: `${40 / 1920 * width}px`, color: "#e13367" }}>
											{currencyDic[currency].symbol} {getCurrPrice(product.variants[variation], 1)[1]} | {getPercent(getCurrPrice(product.variants[variation], 1))}% OFF
										</Typography>
									</div>
									:
									<Typography style={{ fontSize: `${40 / 1920 * width}px`, color: "black" }}>
										{currencyDic[currency].symbol} {getCurrPrice(product.variants[variation], 0)[0]}
									</Typography>
							}
						</div>
						<div style={{ display: "flex" }}>
							<CssFormControl variant="outlined" style={{ fontSize: "15px" }}>
								<Select
									value={variation}
									onChange={handleChange}
								>
									{createList()}
								</Select>
							</CssFormControl>
							<Spring
								to={{ color: addCartHover ? "white" : "black", backgroundColor: addCartHover ? "black" : "white" }}
								from={{
									color: "black", backgroundColor: "white"
								}}
							>
								{prop =>
									<div style={{
										border: "1px solid black", padding: "0 50px", ...prop,
										marginLeft: "1.1vmax", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center"
									}}
										onClick={() => addToCart(product.variants[variation].id.toString(), 1)}
										onMouseEnter={() => setAddCartHover(true)} onMouseLeave={() => setAddCartHover(false)}
									>
										<LocalMallOutlinedIcon style={{ fontSize: "16px" }} />
										<Typography style={{ fontSize: "16px", marginLeft: "1.1vmax" }}>Add To Cart</Typography>
									</div>
								}
							</Spring>
						</div>
						<Divider style={{ marginTop: "3.3vmax", marginRight: "5.5vmax" }} />
						<div style={{ marginTop: "3.3vmax" }}>
							<div style={{ display: "flex" }}>
								<Spring
									to={{ width: descIndex ? "100%" : "0%" }}
									from={{
										width: "100%", height: "2px", backgroundColor: "black"
									}}
								>
									{prop =>
										<div onClick={() => setDescIndex(true)}
											style={{ marginLeft: "0.5vmax", pointerEvents: descIndex ? "none" : "", cursor: "pointer", width: "fit-content" }}>
											<Typography style={{ fontSize: "16px", color: descIndex ? "black" : "grey" }}>
												DESCRIPTION
								</Typography>
											<div style={prop} />
										</div>
									}
								</Spring>
								<Spring
									to={{ width: !descIndex ? "100%" : "0%" }}
									from={{
										width: "0%", height: "2px", backgroundColor: "black"
									}}
								>
									{prop =>
										<div onClick={() => setDescIndex(false)}
											style={{
												marginLeft: "3.3vmax",
												pointerEvents: !descIndex ? "none" : "", cursor: "pointer", width: "fit-content"
											}}>
											<Typography style={{ fontSize: "16px", color: !descIndex ? "black" : "grey" }}>DELIVERY & RETURNS</Typography>
											<div style={prop} />
										</div>
									}
								</Spring>
							</div>
						</div>
						<div style={{ marginTop: "2.2vmax" }}>
							{
								descIndex ?
									<div style={{ maxWidth: "80%" }}>
										{description === undefined ? <Skeleton animation="wave" width={100} height={10} />
											: createDescription()
										}
									</div>
									:
									<div style={{ maxWidth: "80%" }}>
										<Typography style={{ fontSize: "15px" }}>
											{shopDetails.policies.refundPolicy.body}
										</Typography>
										<div style={{ width: "fit-content" }}>
											<Link to='/refund-policy' style={{ textDecoration: "none", color: "inherit" }}>
												<Typography onMouseEnter={() => setReadHover(true)} onMouseLeave={() => setReadHover(false)}
													style={{ fontSize: "15px", marginTop: "2.2vmax", cursor: "pointer", fontWeight: "bold" }}>
													Read More Here
										</Typography>
												<animated.div style={readSpring} />
											</Link>
										</div>
									</div>
							}
						</div>
					</Grid>
				</Grid>
				{
					getSameType().length !== 0 ?
						<div>
							<div style={{ display: "flex", justifyContent: 'center', alignItems: "center", overflow: "hidden" }}>
								<Divider style={{ width: "100%" }} />
								<Typography style={{
									fontSize: `${(55 / 1920 * width)}px`,
									fontFamily: `FirusasHeader, "Times New Roman", Times, Georgia, serif`,
									fontWeight: "bold"
								}}
									className="homedeals_title">
									You May Also Like
                </Typography>
								<Divider style={{ width: "100%" }} />
							</div>
							<HomeDeals width={width} history={props.history} scrollbar={props.scrollbar} content={getSameType()} />
						</div>
						: null
				}
			</Container>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
				message="Item Added to Cart"
				action={
					<React.Fragment>
						<IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
							<CloseIcon fontSize="small" />
						</IconButton>
					</React.Fragment>
				}
			/>
			<Contact width={width} />
			<FooterMenu width={width} shopDetails={shopDetails} />
		</div>
	)
}

export default (ProductView);