import React from "react"
import { useShopify } from "../hooks"

import Hero from './Home/Hero';
import HomeDeals from './Home/HomeDeals/HomeDeals';
import HomeContent from './Home/HomeContent/HomeContent';
import Contact from "./Footer/Contact";
import FooterMenu from "./Footer/FooterMenu";

import { Typography, Divider } from '@material-ui/core';

import useMediaQuery from '@material-ui/core/useMediaQuery';

export default (props) => {
	const { shopDetails, featured } = useShopify();

	const matches = useMediaQuery('(min-width:1024px)', { noSsr: true });

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

	const [width, height] = useWindowSize();

	const getBestSeller = () => {
		let temp = [];
		featured.forEach(ele => {
			if (ele.title.toLowerCase() === "best sellers") {
				ele.products.forEach(p => {
					temp.push(p);
				})
			}
		})
		return temp;
	}

	return (
		matches ?
			<div>
				< Hero width={width} />
				<Typography style={{ fontSize: `${(18 / 1920 * width)}px`, color: "#959494", padding: "0 12px 12px 12px" }} className="homedeals_title">
					SHOW NOW
                </Typography>
				<div style={{ display: "flex", justifyContent: 'center', alignItems: "center", overflow: "hidden" }}>
					<Divider style={{ width: "100%" }} />
					<Typography style={{
						fontSize: `${(55 / 1920 * width)}px`,
						fontFamily: `FirusasHeader, "Times New Roman", Times, Georgia, serif`,
						fontWeight: "bold"
					}}
						className="homedeals_title">
						Best Sellers
                </Typography>
					<Divider style={{ width: "100%" }} />
				</div>
				<HomeDeals width={width} history={props.history} scrollbar={props.scrollbar} content={getBestSeller()} />
				<HomeContent shopDetails={shopDetails} width={width} scrollbar={props.scrollbar} />
				<Contact width={width} scrollbar={props.scrollbar} />
				<FooterMenu width={width} shopDetails={shopDetails} scrollbar={props.scrollbar} />
			</div >
			:
			<div style={{ display: "flex", justifyContent: "center", marginTop: "50%" }}>
				<Typography>
					Currently implementing the mobile compatibility, come back later!
					</Typography>
			</div>
	)
}
