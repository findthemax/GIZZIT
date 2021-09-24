import React, {Fragment, useEffect, useReducer} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link } from "react-router-dom";
import InputText from "../../input/InputText";
import {order} from "../../../actions/order"
import InputDropdown from "../../input/InputDropdown";
import {checkEmailBasic, checkLengthMax, checkLengthMin, checkPostcodeBasic} from "../../../utils/formFieldValidator";
import {checkEmptyParams, setBtnOpacity} from "../../../utils/formValidator";
import {setValue} from "../../../utils/formActions";
import CheckBox from "../../input/CheckBox";

function reducer(state, action) {
    switch (action.type) {
        case 'setValue' :
            state = setValue(action, state)
            //check errors and set button opacity
            state.emptyErrors = checkEmptyParams(state)
            state.btnOpacity = setBtnOpacity(state)

            if(action.data.param === 'delivery') {
                state.deliveryCost = action.data.value === 'DELUK' ? 750 : 0
            }

            if(action.data.param === 'payment') {
                if(action.data.value === 'SER330') {
                    state.watchCost = 33000
                    state.depositCost = 15000
                }
                if(action.data.value === 'PUB330') {
                    state.watchCost = 33000
                    state.depositCost = 33000
                }
                if(action.data.value === 'SER300' | action.data.value === 'VET300') {
                    state.watchCost = 30000
                    state.depositCost = 30000
                }

            }
            break
        case 'toggleShow':
            state =  {
                ...state,
            }
            state[action.param].showState = !state[action.param].showState
            break
        case 'submitCheck':
            state = {
                ...state,
                showEmptyErrors: true
            }

            if(state.errors.length === 0 && state.emptyErrors.length === 0) {
                //submit form
                state.submitError = ''

                action.dispatchRedux(order({
                    fName: state.fName.value,
                    lName: state.lName.value,
                    email: state.email.value,
                    sku: "RN/FAA/814/20/WAT01/"+ state.strap.value,
                    engraving: state.engraving.value,
                    address1: state.address1.value,
                    address2: state.address2.value,
                    city: state.city.value,
                    postcode: state.postcode.value,
                    payment: state.payment.value,
                    delivery: state.delivery.value,
                }))

            } else {
                const labelArray = []
                state.errors.forEach(error => {
                    if(labelArray.indexOf(error.label) === -1) {
                        labelArray.push(error.label)
                    }
                })
                state.emptyErrors.forEach(error => {
                    if(labelArray.indexOf(error.label) === -1) {
                        labelArray.push(error.label)
                    }
                })
                state.submitError = `In order to place your order please correct the following fields above that contain errors: ${labelArray.toString().replace(/,/g, ', ')}`
            }
            break
        case 'reduxErrors':
            state = {
                ...state,
                errors: action.errors
            }
            break
        default :
            state =  {
                ...state
            }
    }
    return state
}

const initialState = {
    fName: {
        type: "text",
        param: 'fName',
        label: 'First Name',
        value: '',
        validate: [
            {check: checkLengthMax, checkParams: {length: 105, trim: true}, msg: "Please only enter your first name"},
            ],
        info: "We require your first name in order to identify your payment and secure the delivery to you the individual. We retain this data as a record of sale for a period of 3 years in order to manage your consumer rights and protection.",
        dispatchType: 'setValue',
        required: true,
    },lName: {
        type: "text",
        param: 'lName',
        label: 'Last Name',
        value: '',
        validate: [
            {check: checkLengthMax, checkParams: {length: 105, trim: true}, msg: "Please only enter your last name"},
        ],
        info: "We require your last name in order to identify your payment and secure the delivery to you the individual. We retain this data as a record of sale for a period of 3 years in order to manage your consumer rights and protection.",
        dispatchType: 'setValue',
        required: true,
    }, email: {
        type: "email",
        param: 'email',
        label: 'Email',
        value: '',
        validate: [
            {check: checkEmailBasic, checkParams: {}, msg: "Please enter a valid email"},
        ],
        info: "We require your email in order to communicate with you through the sales process. We retain this data as a record of sale for a period of 3 years unless you ask for it to be removed from our records. We do not sell or share this information with any third party (unless compelled by law).",
        dispatchType: 'setValue',
        required: true,
    },
    strap: {
        type: "dropdown",
        param: "strap",
        label: "Strap Type",
        value: null,
        info: null,
        options: [
            {value: "SLTI", label: "Stamped Leather Tiger (Yellow) Stitch", available: true},
            {value: "SLTA", label: "Stamped Leather Tactical (Black) Stitch", available: true},
            {value: "FMJ", label: "Full Metal Jacket", available: true},
            {value: "TS", label: "Tactical Silicone", available: true}
        ],
        showState: false,
        required: true,
    },
    engraving: {
        type: "text",
        param: 'engraving',
        label: 'Callsign or Name to be engraved',
        value: '',
        validate: [
            {check: checkLengthMax, checkParams: {length: 25, trim: false}, msg: "Your engraving must only be a maximum of 25 characters."},
        ],
        info: "This will be etched on to the side of the watch. It must be a maximum of 25 characters long. You may leave this option blank if you don't wish to have your piece engraved.",
        dispatchType: 'setValue',
        required: false,
    },
    delivery: {
        type: "dropdown",
        param: "delivery",
        label: "Delivery Option",
        value: null,
        info: "If you require an international shipping, or shipping to BFPO please email us (orders@topgizzit.com) to arrange - you can click the email icon at the bottom of this page to email us. If you are a veteran or civil servant with access to RNAS Culdrose and want to collect please select 'Serving Personnel'.",
        options: [
            {value: 'CU', label: 'Collect from RNAS Culdrose (Serving Personnel Only)', available: false, unsetRequiredParams: ['address1', 'city', 'postcode']},
            {value: 'DELUK', label: 'Delivered to UK Postal Address via Royal Mail (+£7.50)', available: true, requiredParams: ['address1', 'city', 'postcode']},
        ],
        showState: false,
        required: true,
    },
    address1: {
        type: "text",
        param: 'address1',
        label: 'Property name or number and Street',
        value: '',
        validate: [
            {check: checkLengthMin, checkParams: {length: 2}, msg: "Please enter a valid address"},
        ],
        info: "This is the address we will ship the watch to via recorded, signed for delivery. We retain this data in the record of sale for a period of 3 years unless you ask for it to be removed from our records. We do not sell or share this information with any third party (unless compelled by law).",
        dispatchType: 'setValue',
        required: false,
    },
    address2: {
        type: "text",
        param: 'address2',
        label: 'Local area or Village',
        value: '',
        info: "This is the address we will ship the watch to via recorded, signed for delivery. We retain this data in the record of sale for a period of 3 years unless you ask for it to be removed from our records. We do not sell or share this information with any third party (unless compelled by law).",
        dispatchType: 'setValue',
        required: false,
    },
    city: {
        type: "text",
        param: 'city',
        label: 'City or Town',
        value: '',
        validate: [
            {check: checkLengthMin, checkParams: {length: 2}, msg: "Please enter a valid town or city"},
        ],
        info: "This is the address we will ship the watch to via recorded, signed for delivery. We retain this data in the record of sale for a period of 3 years unless you ask for it to be removed from our records. We do not sell or share this information with any third party (unless compelled by law).",
        dispatchType: 'setValue',
        required: false,
    },
    postcode: {
        type: "text",
        param: 'postcode',
        label: 'Postcode',
        value: '',
        uppercase: true,
        validate: [
            {check: checkPostcodeBasic, checkParams: {}, msg: "Please enter a valid postcode"},
        ],
        info: "This is the address we will ship the watch to via recorded, signed for delivery. We retain this data in the record of sale for a period of 3 years unless you ask for it to be removed from our records. We do not sell or share this information with any third party (unless compelled by law).",
        dispatchType: 'setValue',
        required: false,
    },
    payment: {
        type: "dropdown",
        param: "payment",
        label: "Payment Option",
        value: null,
        info: "Please note that if you have selected a delivery it (£7.50) will need to be paid on top of the watch price",
        options: [
            {value: 'SER330', label: 'Serving Personnel - Pay £150 part payment now and £180 on delivery - £330 total', available: true, makeAvailable: [{param: 'delivery', values: ['CU']}]},
            {value: 'SER300', label: 'Serving Personnel - £300 total paid upfront (save 10% on total cost)', available: true, makeAvailable: [{param: 'delivery', values: ['CU']}]},
            {value: "VET300", label: "Veterans - £300 total paid upfront (save 10%)", available: true, makeUnAvailable: [{param: 'delivery', values: ['CU']}]},
            {value: "PUB330", label: "General Public - £330 total paid upfront", available: true, makeUnAvailable: [{param: 'delivery', values: ['CU']}]},
        ],
        showState: false,
        required: true,
    },
    termsConditions: {
        type: 'checkbox',
        param: 'termsConditions',
        value: '',
        label: "Terms and Conditions",
        info: 'We want you to understand your rights and responsibilities of this unique purchase. Please state that you have read and agreed to these terms before you continue.',
        alignment: 'right',
        required: true,
        content: [' I agree to the ', <Link to={"/terms_conditions"} target="_blank">Terms and Conditions</Link>]
    },
    errors: [],
    emptyErrors: [],
    showEmptyErrors: false,
    btnOpacity: .5,
    submitError: '',
    watchCost: 0,
    deliveryCost: 0,
    depositCost: 0

}

const OrderForm = () => {

    const [ state, dispatch ] = useReducer(reducer, initialState)

    const dispatchRedux = useDispatch()
    const errors = useSelector(state => state.order.errors)
    const order = useSelector(state => state.order.order)

    const onSubmit = async e => {
        e.preventDefault()
        await dispatch({type: 'submitCheck', dispatchRedux})
    }

    useEffect(() => {
        if(errors.length > 0) {
            dispatch({type: "reduxErrors", errors})
        }
    },  [errors])

    if(order) {
        //todo create a forward to success page
        return <Redirect to='/order_success' />
    }


    return (
        <div className="order-form">
            <form className="form" onSubmit={ e => onSubmit(e)}>
                <h3>Order Your Watch</h3>
                <p className="error">All orders and payment must be received by 04 August 2020</p>
                <p>Please be aware that this is a personalised product made to order. The quality manufacturing of these bespoke pieces takes up to 5 months. You will be kept informed of the progress of the manufacturing process throughout. We hope to have the pieces delivered or ready for collection by Christmas 2020 but please be aware that due to COVID19 this may not be possible.</p>
                <p>Our payment system is by bank transfer in order to keep the costs and price to a minimum. Once you place your order you will be sent a payment code. Once we receive payment with that payment code your order will be secured and you will receive a payment confirmation.</p>
                <p>We can arrange for international bank transfer and delivery if required.</p>
                <p>If you are Serving Personnel and select to split the payment (with £150 part payment now and £180 on delivery) you are entering in to an agreement to purchase the watch. You can only cancel your order up until 03 August 2020.</p>
                <p>For any questions please contact <a href="mailto:orders@topgizzit.com?subject=814 NAS Flying Tiger Watch Enquiry">orders@topgizzit.com</a></p>
                <div className="input-area">
                    <InputText
                        data={state.fName}
                        dispatch={dispatch}
                        errors={state.errors}
                        autoComplete="given-name"
                    />
                    <InputText
                        data={state.lName}
                        dispatch={dispatch}
                        errors={state.errors}
                        autoComplete="family-name"
                    />
                    <InputText
                        data={state.email}
                        dispatch={dispatch}
                        errors={state.errors}
                        autoComplete="email"
                    />

                    <InputDropdown
                        data={state.strap}
                        dispatch={dispatch}
                        errors={state.showEmptyErrors ? [...state.errors, ...state.emptyErrors] : state.errors}
                    />

                    <InputText
                        data={state.engraving}
                        dispatch={dispatch}
                        errors={state.errors}
                        autoComplete="email"
                    />

                    <InputDropdown
                        data={state.payment}
                        dispatch={dispatch}
                        errors={state.showEmptyErrors ? [...state.errors, ...state.emptyErrors] : state.errors}
                    />

                    <InputDropdown
                        data={state.delivery}
                        dispatch={dispatch}
                        errors={state.showEmptyErrors ? [...state.errors, ...state.emptyErrors] : state.errors}
                    />

                    {
                        state.delivery.value === 'DELUK' &&

                        <Fragment>

                            <InputText
                                data={state.address1}
                                dispatch={dispatch}
                                errors={state.errors}
                                autoComplete="address-line1"
                            />

                            <InputText
                                data={state.address2}
                                dispatch={dispatch}
                                errors={state.errors}
                                autoComplete="address-line2"
                            />

                            <InputText
                                data={state.city}
                                dispatch={dispatch}
                                errors={state.showEmptyErrors ? [...state.errors, ...state.emptyErrors] : state.errors}
                                autoComplete="address-line3"
                            />

                            <InputText
                                data={state.postcode}
                                dispatch={dispatch}
                                errors={state.errors}
                                autoComplete="postal-code"
                            />


                        </Fragment>
                    }

                </div>

                <div className="info-area">
                    <CheckBox
                        data={state.termsConditions}
                        dispatch={dispatch}
                        errors={state.errors}
                    />


                    <div className="cost-calc">
                        <h4>Watch Cost: £{state.watchCost/100}</h4>
                        <h4>Delivery Cost: £{(state.deliveryCost/100).toFixed(2)}</h4>
                        <h4>Total to pay to secure order: £{state.deliveryCost > 0 ? ((state.depositCost + state.deliveryCost)/100).toFixed(2) : (state.depositCost + state.deliveryCost)/100}</h4>
                        <h4>Total to pay on delivery: £{(state.watchCost - state.depositCost)/100}</h4>
                    </div>
                </div>

                {state.submitError.length > 0 &&
                    <p className="form-error-final">{state.submitError}</p>
                }
                <button className="btn btn-green-inverted"
                        type="submit"
                        style={{opacity: state.btnOpacity}}
                >Order</button>
            </form>
        </div>
    )
}


export default OrderForm
