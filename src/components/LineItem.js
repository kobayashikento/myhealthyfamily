import { Divider, Typography } from "@material-ui/core"
import React from "react"
import { useShopify } from "../hooks"
import { Scrollbars } from 'react-custom-scrollbars';

import useMediaQuery from '@material-ui/core/useMediaQuery';

export default (props) => {
	const { checkoutState, updateQuantity, removeLineItem } = useShopify()
	const matches = useMediaQuery('(min-width:1024px)', { noSsr: true });

	function decrementQuantity(lineItemId, lineItemQuantity, e) {
		e.preventDefault()
		const checkoutId = checkoutState.id
		const updatedQuantity = lineItemQuantity - 1
		updateQuantity(lineItemId, updatedQuantity, checkoutId)
	}

	function incrementQuantity(lineItemId, lineItemQuantity, e) {
		e.preventDefault()
		const checkoutId = checkoutState.id
		const updatedQuantity = lineItemQuantity + 1
		updateQuantity(lineItemId, updatedQuantity, checkoutId)
	}

	function deleteLineItem(lineItemId, e) {
		e.preventDefault()
		const checkoutId = checkoutState.id
		removeLineItem(checkoutId, lineItemId)
	}

	const getPrice = (item) => {
		if (item.variant.compareAtPrice === null) {
			return (
				matches ?
					<Typography style={{ fontSize: "16px", color: "black" }}>
						{`$ ${(item.quantity * item.variant.price).toFixed(2)}`}
					</Typography>
					:
					<div style={{ display: "flex", margin: "20px 10px" }}>
						<Typography style={{ fontSize: "14px", color: "rgb(149, 148, 148)", textDecoration: "line-through" }}>
							{`$ ${(item.quantity * item.variant.price).toFixed(2)}`}
						</Typography>
						<Typography style={{ fontSize: "16px", color: "rgb(225, 51, 103)", marginLeft: "8px", fontWeight: "bold" }}>
							{`$ ${(item.quantity * item.variant.compareAtPrice).toFixed(2)}`}
						</Typography>
					</div>
			)
		}
		return (
			matches ?
				<div>
					<Typography style={{ fontSize: "14px", color: "rgb(149, 148, 148)", textDecoration: "line-through" }}>
						{`$ ${(item.quantity * item.variant.price).toFixed(2)}`}
					</Typography>
					<Typography style={{ fontSize: "16px", color: "rgb(225, 51, 103)", marginLeft: "8px", fontWeight: "bold" }}>
						{`$ ${(item.quantity * item.variant.compareAtPrice).toFixed(2)}`}
					</Typography>
				</div>
				:
				<div style={{ display: "flex", margin: "20px 10px" }}>
					<Typography style={{ fontSize: "14px", color: "rgb(149, 148, 148)", textDecoration: "line-through" }}>
						{`$ ${(item.quantity * item.variant.price).toFixed(2)}`}
					</Typography>
					<Typography style={{ fontSize: "16px", color: "rgb(225, 51, 103)", marginLeft: "8px", fontWeight: "bold" }}>
						{`$ ${(item.quantity * item.variant.compareAtPrice).toFixed(2)}`}
					</Typography>
				</div>
		)
	}

	return (
		matches ?
			<Scrollbars
				style={{ height: 300 }}
			>
				<li className="Line-item">
					{checkoutState.lineItems &&
						checkoutState.lineItems.map((lineItem, i) => {
							return (
								<div key={`${lineItem.title}` + i} className="lineItemDiv">
									<div className="Line-item__img">
										{lineItem.variant.image ? (
											<img
												src={lineItem.variant.image.src}
												alt={`${lineItem.title} product shot`}
											/>
										) : null}
									</div>
									<div className="Line-item__content">
										<div className="Line-item__content-row">
											<div className="Line-item__variant-title">
												{lineItem.variant.title}
											</div>
											<span className="Line-item__title">{lineItem.title}</span>
										</div>
										<div className="Line-item__content-row">
											<div className="Line-item__quantity-container">
												<button
													className="Line-item__quantity-update"
													onClick={(e) =>
														decrementQuantity(lineItem.id, lineItem.quantity, e)
													}
												>
													-
										</button>
												<span className="Line-item__quantity">
													{lineItem.quantity}
												</span>
												<button
													className="Line-item__quantity-update"
													onClick={(e) => {
														incrementQuantity(lineItem.id, lineItem.quantity, e)
													}}
												>
													+
										</button>
											</div>
											<span className="Line-item__price">
												{getPrice(lineItem)}
											</span>
											<button
												className="Line-item__remove"
												onClick={(e) => deleteLineItem(lineItem.id, e)}
											>
												×
									</button>
										</div>
									</div>
									<Divider style={{ width: "100%", margin: "14px 0" }} />
								</div>
							)
						})}
				</li>
			</Scrollbars>
			:
			<Scrollbars
				style={{ height: window.innerHeight * 0.5 }}
			>
				<li className="Line-item">
					{checkoutState.lineItems &&
						checkoutState.lineItems.map((lineItem, i) => {
							return (
								<div key={`${lineItem.title}` + i} className="lineItemDiv">
									<div className="Line-item__content" style={{ padding: "0px" }}>
										<button
											style={{ float: "right", marginBottom: "15px", padding: "0px" }}
											className="Line-item__remove"
											onClick={(e) => deleteLineItem(lineItem.id, e)}
										>
											×
	</button>
										<div className="Line-item__content-row" style={{ display: "flex", flexDirection: "column", maxWidth: "90%" }}>
											<span className="Line-item__title">{lineItem.title}</span>
											<div className="Line-item__variant-title">
												{lineItem.variant.title}
											</div>
										</div>
										<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
											<div className="Line-item__img" style={{ position: "relative", display: "flex", width: "100px", height: "100px" }}>
												{lineItem.variant.image ? (
													<img
														src={lineItem.variant.image.src}
														alt={`${lineItem.title} product shot`}
													/>
												) : null}
											</div>
											<div className="Line-item__content-row" style={{ width: "fit-content" }}>
												<div className="Line-item__quantity-container">
													<button
														className="Line-item__quantity-update"
														onClick={(e) =>
															decrementQuantity(lineItem.id, lineItem.quantity, e)
														}
													>
														-
										</button>
													<span className="Line-item__quantity">
														{lineItem.quantity}
													</span>
													<button
														className="Line-item__quantity-update"
														onClick={(e) => {
															incrementQuantity(lineItem.id, lineItem.quantity, e)
														}}
													>
														+
										</button>
												</div>
											</div>
										</div>
										<span className="Line-item__price" style={{ width: "100%", margin: "0" }}>
											{getPrice(lineItem)}
										</span>
									</div>
									<Divider style={{ width: "100%", margin: "14px 0" }} />
								</div>
							)
						})}
				</li>
			</Scrollbars>
	)
}
