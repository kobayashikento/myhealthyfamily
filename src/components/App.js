import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import Cart from "./Product/Cart"
import Skeleton from './Skeleton';
import ProductView from "./Product/ProductView"
import { useShopify } from "../hooks"

import Alert from './Header/Alert';
import Header from './Header/Header';
import Catalog from './Product/Catalog';

import { Scrollbars } from 'react-custom-scrollbars';
import AllCatalog from "./Product/AllCatalog";
import InfoSkeleton from './Information/InfoSkeleton';

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

const App = (props) => {
	const scrollbar = React.useRef();

	const {
		createShop,
		createCheckout,
		fetchProducts,
		fetchCollection,
		fetchPages,
		featured,
		shopDetails,
		products,
		pages
	} = useShopify()

	useEffect(() => {
		createShop()
		fetchProducts()
		createCheckout()
		fetchPages()
		fetchCollection()
	}, []);

	const [width, height] = useWindowSize();

	const createCategoryPaths = () => {
		return (
			featured.map((ele) => {
				let convertedLink = ele.title.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-");
				return <Route key={`route-${convertedLink}`} path={`/${convertedLink}`}
					render={props =>
						<Catalog {...props} collection={ele} shopDetails={shopDetails} width={width} history={props.history} scrollbar={scrollbar} />
					} />
			})
		)
	}

	const getSale = () => {
		// .products => [], .title => string, 
		let temp = { title: "Sale" }
		let saleProduct = [];
		products.forEach(ele => {
			if (ele.variants[0].compareAtPrice !== null) {
				saleProduct.push(ele)
			}
		})
		temp["products"] = saleProduct;
		return temp;
	}

	const aboutRoutes = {
		"Store": ["About us", "Contact"],
		"Service": ["Refund Policy", "Privacy Policy", "Terms of Service"]
	}

	const createAboutRoutes = () => {
		let routes = []
		for (const route in aboutRoutes) {
			aboutRoutes[route].map(r => {
				let convertedLink = r.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-");
				routes.push(
					<Route key={`route-${convertedLink}`} path={`/${convertedLink}`}
						render={props =>
							<InfoSkeleton {...props} shopDetails={shopDetails} width={width}
								history={props.history} scrollbar={scrollbar} route={r} pages={pages}/>
						} />
				)
			})
		}
		return routes;
	}

	return (
		<Scrollbars
			ref={scrollbar}
			style={{ width: width, height: height}}
			autoHide
			renderTrackHorizontal={props => <div {...props} style={{display: 'none'}} className="track-horizontal"/>}
			renderThumbHorizontal={props => <div {...props} className="thumb-horizontal" style={{ display: "none" }} />}
		>
			<Alert/>
			<Router>
				<Route exact path="/" render={() => <Redirect to="/home" />} />
				<Route path="/" render={props => <Header {...props} history={props.history} width={width} scrollbar={scrollbar} />} />
				<Switch>
					<Route exact path="/home" render={props => <Skeleton {...props} history={props.history} scrollbar={scrollbar} />} />
					{featured.length !== 0 ?
						createCategoryPaths()
						:
						null
					}
					<Route exact path={`/sale`}
						render={props =>
							<Catalog {...props} collection={getSale()} shopDetails={shopDetails} width={width}
								history={props.history} scrollbar={scrollbar} />
						} />
					<Route exact path={`/all`}
						render={props =>
							<AllCatalog {...props} collection={products} shopDetails={shopDetails} width={width}
								history={props.history} scrollbar={scrollbar} featured={featured} />
						} />
					{createAboutRoutes()}
					<Route path="/product/:productId" render={(prop) => <ProductView {...prop} scrollbar={scrollbar}/>} />
				</Switch>
			</Router>
		</Scrollbars>
	)
}

export default React.memo(App)