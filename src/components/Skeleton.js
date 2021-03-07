import React from "react"
import { useShopify } from "../hooks"

import Alert from './Alert';
import Header from './Header';
import Hero from './Hero';
import Product from "./Product";

import { Scrollbars } from 'react-custom-scrollbars';

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
		<Scrollbars
			style={{ width: width, height: height }}
			autoHide
		>
			<Alert />
			<Header history={props.history} />
			<Hero width={width} />
			<Product history={props.history} />
			{/* <header className="App__header">
				<div className="App__title">
					<h1>{shopDetails.name}: React / Redux Example</h1>
					<h2>{shopDetails.description}</h2>
				</div>
			</header> */}
		</Scrollbars>
	)
}
