import { useSelector, useDispatch } from "react-redux"
import Client from "shopify-buy"

const API_KEY = process.env.REACT_APP_API_KEY;
const DOMAIN = process.env.REACT_APP_SHOP_DOMAIN;

const client = Client.buildClient({
	storefrontAccessToken: API_KEY,
	domain: DOMAIN,
})

// fetch the large, unoptimized version of the SDK
import largeClient from 'shopify-buy/index.unoptimized.umd';

const largeclient = largeClient.buildClient({
	domain: DOMAIN,
	storefrontAccessToken: API_KEY
});

const PRODUCTS_FOUND = "shopify/PRODUCTS_FOUND"
const PRODUCT_FOUND = "shopify/PRODUCT_FOUND"
const COLLECTION_FOUND = "shopify/COLLECTION_FOUND"
const CHECKOUT_FOUND = "shopify/CHECKOUT_FOUND"
const SHOP_FOUND = "shopify/SHOP_FOUND"
const ADD_VARIANT_TO_CART = "shopify/ADD_VARIANT_TO_CART"
const UPDATE_QUANTITY_IN_CART = "shopify/UPDATE_QUANTITY_IN_CART"
const REMOVE_LINE_ITEM_IN_CART = "shopify/REMOVE_LINE_ITEM_IN_CART"
const OPEN_CART = "shopify/OPEN_CART"
const CLOSE_CART = "shopify/CLOSE_CART"
const CART_COUNT = "shopify/CART_COUNT"
const SET_CURRENCY = "shopify/SET_CURRENCY"

const initialState = {
	isCartOpen: false,
	cartCount: 0,
	checkout: {},
	products: [],
	featured: [],
	product: {},
	shop: {},
	currency: "CAD"
}

export default (state = initialState, action) => {
	switch (action.type) {
		case PRODUCTS_FOUND:
			return { ...state, products: action.payload }
		case PRODUCT_FOUND:
			return { ...state, product: action.payload }
		case COLLECTION_FOUND:
			return { ...state, featured: action.payload }
		case CHECKOUT_FOUND:
			return { ...state, checkout: action.payload }
		case SHOP_FOUND:
			return { ...state, shop: action.payload }
		case ADD_VARIANT_TO_CART:
			return { ...state, checkout: action.payload }
		case UPDATE_QUANTITY_IN_CART:
			return { ...state, checkout: action.payload }
		case REMOVE_LINE_ITEM_IN_CART:
			return { ...state, checkout: action.payload }
		case OPEN_CART:
			return { ...state, isCartOpen: true }
		case CLOSE_CART:
			return { ...state, isCartOpen: false }
		case CART_COUNT:
			return { ...state, cartCount: action.payload }
		case SET_CURRENCY:
			return { ...state, currency: action.payload }
		default:
			return state
	}
}

// Gets all the products from Shopify
function getProducts() {
	return (dispatch) => {
		client.product.fetchAll().then((resp) => {
			dispatch({
				type: PRODUCTS_FOUND,
				payload: resp,
			})
		})
	}
}

// Gets individual item based on id
function getProduct(id) {

	const productsQuery = largeclient.graphQLClient.query((root) => {
		root.addConnection('products', { args: { first: 10 } }, (product) => {
			product.add('title');
			product.add('tags');// Add fields to be returned
		});
	});

	largeclient.graphQLClient.send(productsQuery).then(({ model, data }) => {
		// Do something with the products
		// console.log(model);
	});

	return async (dispatch) => {
		const resp = await client.product.fetch(id)
		// console.log(resp, id)
		dispatch({
			type: PRODUCT_FOUND,
			payload: resp,
		})
		return resp
	}
}

//
// Gets a collection based on that collection's id
//
function getCollection() {
	return (dispatch) => {
		client.collection.fetchAllWithProducts().then((resp) => {
			dispatch({
				type: COLLECTION_FOUND,
				payload: resp,
			})
		})
	}
}

// Creates initial checkout state from Shopify
function checkout() {
	return (dispatch) => {
		client.checkout.create().then((resp) => {
			dispatch({
				type: CHECKOUT_FOUND,
				payload: resp,
			})
		})
	}
}

// Gets Shopify store information
function shopInfo() {
	return (dispatch) => {
		client.shop.fetchInfo().then((resp) => {
			dispatch({
				type: SHOP_FOUND,
				payload: resp,
			})
		})
	}
}

// Adds variants to cart/checkout
function addVariantToCart(checkoutId, lineItemsToAdd) {
	return async (dispatch) => {
		const response = await client.checkout.addLineItems(
			checkoutId,
			lineItemsToAdd
		)
		dispatch({
			type: ADD_VARIANT_TO_CART,
			payload: response,
		})
		return response
	}
}

// Updates quantity of line items in cart and in checkout state
function updateQuantityInCart(lineItemId, quantity, checkoutId) {
	const lineItemsToUpdate = [
		{ id: lineItemId, quantity: parseInt(quantity, 10) },
	]

	return async (dispatch) => {
		const resp = await client.checkout.updateLineItems(
			checkoutId,
			lineItemsToUpdate
		)
		dispatch({
			type: UPDATE_QUANTITY_IN_CART,
			payload: resp,
		})
		return resp
	}
}

// Removes line item from cart and checkout state
function removeLineItemInCart(checkoutId, lineItemId) {
	return (dispatch) => {
		client.checkout.removeLineItems(checkoutId, [lineItemId]).then((resp) => {
			dispatch({
				type: REMOVE_LINE_ITEM_IN_CART,
				payload: resp,
			})
		})
	}
}

// To close the cart
function handleCartClose() {
	return {
		type: CLOSE_CART,
	}
}

// To open the cart
function handleCartOpen() {
	return {
		type: OPEN_CART,
	}
}

// Set the count of items in the cart
function handleSetCount(count) {
	return {
		type: CART_COUNT,
		payload: count,
	}
}

function handleSetCurrency(curr) {
	return {
		type: SET_CURRENCY,
		payload: curr,
	}
}


export function useShopify() {
	const dispatch = useDispatch()
	const cartStatus = useSelector((appState) => appState.shopifyState.isCartOpen)
	const cartCount = useSelector((appState) => appState.shopifyState.cartCount)
	const products = useSelector((appState) => appState.shopifyState.products)
	const product = useSelector((appState) => appState.shopifyState.product)
	const featured = useSelector((appState) => appState.shopifyState.featured)
	const checkoutState = useSelector(
		(appState) => appState.shopifyState.checkout
	)
	const shopDetails = useSelector((appState) => appState.shopifyState.shop)
	const currency = useSelector((appState) => appState.shopifyState.currency)
	const fetchProducts = () => dispatch(getProducts())
	const fetchProduct = (id) => dispatch(getProduct(id))
	const fetchCollection = () => dispatch(getCollection())
	const createCheckout = () => dispatch(checkout())
	const createShop = () => dispatch(shopInfo())
	const closeCart = () => dispatch(handleCartClose())
	const openCart = () => dispatch(handleCartOpen())
	const setCount = (count) => dispatch(handleSetCount(count))
	const setCurrency = (curr) => dispatch(handleSetCurrency(curr))

	const addVariant = (checkoutId, lineItemsToAdd) =>
		dispatch(addVariantToCart(checkoutId, lineItemsToAdd))
	const updateQuantity = (lineItemId, quantity, checkoutID) =>
		dispatch(updateQuantityInCart(lineItemId, quantity, checkoutID))
	const removeLineItem = (checkoutId, lineItemId) =>
		dispatch(removeLineItemInCart(checkoutId, lineItemId))

	return {
		products,
		product,
		featured,
		cartStatus,
		checkoutState,
		cartCount,
		shopDetails,
		currency,
		addVariant,
		fetchProducts,
		fetchProduct,
		fetchCollection,
		createCheckout,
		createShop,
		closeCart,
		openCart,
		updateQuantity,
		removeLineItem,
		setCount,
		setCurrency,
	}
}
