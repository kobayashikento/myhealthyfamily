import React from "react"
import { useShopify } from "../hooks"

import Alert from './Alert';
import Header from './Header';
import Hero from './Hero';
import HomeDeals from './HomeDeals';
import HomeContent from './HomeContent';

import Product from "./Product";

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
			<HomeDeals />
			<HomeContent />
			{/* <header className="App__header">
				<div className="App__title">
					<h1>{shopDetails.name}: React / Redux Example</h1>
					<h2>{shopDetails.description}</h2>
				</div>
			</header> */}
		</div>
	)
}
