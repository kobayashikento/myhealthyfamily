import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useShopify } from "../../hooks"

import { Spring } from 'react-spring/renderprops-universal';

import Contact from '../Footer/Contact';
import FooterMenu from '../Footer/FooterMenu';
import { Breadcrumbs, Container, Grid, Typography, FormControl, Select, MenuItem, Divider, IconButton } from "@material-ui/core";

import { withStyles } from '@material-ui/core/styles';

import { currencyDic, deliveryPolicy } from '../../assests/constants';

import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import HomeDeals from "../Home/HomeDeals/HomeDeals";
import { animated, useSpring } from "react-spring";

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, CarouselContext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Skeleton } from "@material-ui/lab";

import parse from 'html-react-parser';

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

const convertLink = (string) => {
	if (string !== undefined) {
		return string.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-");
	}
}

function isEmpty(obj) {
	return Object.keys(obj).length === 0;
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

const ProductView = (props) => {

	const [imgIndex, setImgIndex] = React.useState(0);
	const [imgHover, setImgHover] = React.useState(0);
	const [breadHover, setBreadHover] = React.useState(0);
	const [variation, setVariation] = React.useState(0);
	const [addCartHover, setAddCartHover] = React.useState(false);
	const [descIndex, setDescIndex] = React.useState(true);
	const [readHover, setReadHover] = React.useState(false);

	const linkStyle = { fontSize: "14px", textDecoration: "none", color: "inherit", textTransform: "capitalize" }

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
	const defaultSize = product.variants && product.variants[0].id.toString()
	const [size, setSize] = useState("")
	const [quantity, setQuantity] = useState(1)

	const description = product.description && product.description.split(".")

	const [width, height] = useWindowSize();

	function changeSize(sizeId, quantity) {
		openCart()
		if (sizeId === "") {
			sizeId = defaultSize
			const lineItemsToAdd = [
				{ variantId: sizeId, quantity: parseInt(quantity, 10) },
			]
			const checkoutId = checkoutState.id
			addVariant(checkoutId, lineItemsToAdd)
		} else {
			const lineItemsToAdd = [
				{ variantId: sizeId, quantity: parseInt(quantity, 10) },
			]
			const checkoutId = checkoutState.id
			addVariant(checkoutId, lineItemsToAdd)
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
		setVariation(e.target.value)
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
			return <div style={{fontSize: "15px", fontFamily: "SofiaR"}}>{parse(`${product.descriptionHtml}`)}</div>
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

	return (
		<div style={{ marginTop: "2.2vmax" }}>
			<Container maxWidth="lg" style={{ marginBottom: "4.4vmax", paddingLeft: "3.3vmax" }}>
				<Grid container spacing={0} justify="flex-end" style={{ margin: "0", paddingBottom: "6.6vmax" }}>
					<Grid item xs={6} style={{ paddingLeft: "1.1vmax", marginTop: "2.2vmax", position: "relative" }}>
						{
							isEmpty(product) ? null :
								<Grid container justify="center" spacing={5} style={{ position: "sticky", top: "150px" }}>
									<Grid item xs={3} style={{ maxHeight: "500px", overflow: "hidden" }}>
										<CarouselProvider
											naturalSlideWidth={100}
											naturalSlideHeight={100}
											totalSlides={product.images.length}
											orientation="vertical"
											visibleSlides={4}
											currentSlide={imgIndex}
										>
											<Slider>
												{
													product.images.map((ele, index) => {
														return (
															<Slide index={index} onClick={() => setImgIndex(index)} onMouseEnter={() => setImgHover(index)} onMouseLeave={() => setImgHover(-1)}>
																<Spring
																	to={{ transform: imgHover === index ? "scale(1.1)" : "scale(1)" }}
																	from={{
																		transform: "scale(1)"
																	}}
																>
																	{prop =>
																		<img
																			style={{
																				...prop,
																				filter: imgIndex === index ? "brightness(0.8)" : "",
																				marginRight: "auto", marginLeft: "auto", padding: "15px 0", cursor: "pointer"
																			}}
																			src={ele.src}
																			alt={`${ele.title} product shot`}
																		/>
																	}
																</Spring>
															</Slide>
														)
													})
												}
											</Slider>
										</CarouselProvider>
									</Grid>
									<Grid item xs={9} style={{ position: "relative", maxHeight: "500px", overflow: "hidden", marginTop: "20px" }}>
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
															<Slide index={index}>
																<img
																	style={{ marginRight: "auto", marginLeft: "auto", padding: "0 20px" }}
																	src={ele.src}
																	alt={`${ele.title} product shot`}
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
							// <img
							// 	style={{ position: "sticky", top: "200px" }}
							// 	src={product.images[imgIndex - 1].src}
							// 	alt={`${product.title} product shot`}
							// />
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
												<Link to={`/${convertLink(findFeatured())}`} style={linkStyle}>
													{convertLink(findFeatured())}
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
								product.variants[0].compareAtPrice !== null ?
									<div style={{ display: "flex", alignItems: "center" }}>
										<Typography style={{ fontSize: `${25 / 1920 * width}px`, color: "#959494", marginRight: "15px", textDecoration: "line-through" }}>
											{currencyDic[currency].symbol} {getCurrPrice(product.variants[0], 1)[0]}
										</Typography>
										<Typography style={{ fontSize: `${40 / 1920 * width}px`, color: "#e13367" }}>
											{currencyDic[currency].symbol} {getCurrPrice(product.variants[0], 1)[1]} | {getPercent(getCurrPrice(product.variants[0], 1))}% OFF
										</Typography>
									</div>
									:
									<Typography style={{ fontSize: `${40 / 1920 * width}px`, color: "black" }}>
										{currencyDic[currency].symbol} {getCurrPrice(product.variants[0], 0)[0]}
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
										onMouseEnter={() => setAddCartHover(true)} onMouseLeave={() => setAddCartHover(false)}
									>
										<LocalMallOutlinedIcon style={{ fontSize: "16px" }} />
										<Typography style={{ fontSize: "16px", marginLeft: "1.1vmax" }}>
											Add To Cart
										</Typography>
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
											<Typography style={{ fontSize: "16px", color: !descIndex ? "black" : "grey" }}>
												DELIVERY & RETURNS
								</Typography>
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
											{deliveryPolicy.short}
										</Typography>
										<div style={{ width: "fit-content" }}>
											<Link to='/refund-policy' style={{textDecoration: "none", color: "inherit"}}>
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
					{/* <div className="Product__info">
						<h2 className="Product__title2"></h2>
						<ul className="Product__description">
							{description &&
								description.map((each, i) => {
									return <li key={`line-description +${i}`}>{each}</li>
								})}
						</ul>
						<div>
							<label htmlFor={"prodOptions"}>Size</label>
							<select
								id="prodOptions"
								name={size}
								onChange={(e) => {
									setSize(e.target.value)
								}}
							>
								{product.variants &&
									product.variants.map((item, i) => {
										return (
											<option
												value={item.id.toString()}
												key={item.title + i}
											>{`${item.title}`}</option>
										)
									})}
							</select>
						</div>
						<div>
							<label>Quantity</label>
							<input
								className="quantity"
								type="number"
								min={1}
								value={quantity}
								onChange={(e) => {
									setQuantity(e.target.value)
								}}
							></input>
						</div>
						<h3 className="Product__price">
							${product.variants && product.variants[0].price}
						</h3>
						<button
							className="prodBuy button"
							onClick={(e) => changeSize(size, quantity)}
						>
							Add to Cart
					</button>
					</div> */}
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
			<Contact width={width} />
			<FooterMenu width={width} shopDetails={shopDetails} />
		</div>
	)
}

export default React.memo(ProductView);