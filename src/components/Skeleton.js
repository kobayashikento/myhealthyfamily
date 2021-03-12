import React from "react"
import { useShopify } from "../hooks"

import Hero from './Home/Hero';
import HomeDeals from './Home/HomeDeals/HomeDeals';
import HomeContent from './Home/HomeContent/HomeContent';
import Contact from "./Footer/Contact";
import FooterMenu from "./Footer/FooterMenu";

export default (props) => {
	const { shopDetails } = useShopify();

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

	return (
		<div>
			<Hero width={width} />
			<HomeDeals width={width} />
			<HomeContent shopDetails={shopDetails} width={width} />
			<Contact width={width} />
			<FooterMenu width={width} shopDetails={shopDetails} />
		</div>
	)
}
