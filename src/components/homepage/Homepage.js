import React from 'react';
import OrderForm from "./components/OrderForm";

const Homepage = () => {
    return (
        <div className="product">
            <div className="product-main">
                <div className="product-img">
                    <img src={require("../../img/product/product.UK.RN.FAA.814.20.watch.V2.jpg")} alt="814 NAS 2020 Watch"/>
                </div>
                <div className="product-info">
                    <div className="product-title">
                        <h2>Special Edition RSC 2020 45mm Chronograph Watch</h2>
                        <h3>814 NAS - The Flying Tigers</h3>
                    </div>
                    <div className="product-logos">
                        <img src={require("../../img/logos/rsc.logo.png")} alt="RSC Logo"/>
                        <img src={require("../../img/logos/combat-stress-sq.logo.png")} alt="Supporting Combat Stress"/>
                        <img src={require("../../img/logos/814-Squadron-Crest.png")} alt="814 NAS Crest"/>
                        <img src={require("../../img/logos/rn-logo.png")} alt="Royal Navy Logo"/>
                    </div>
                    <div className="product-details">
                        <p>RSC has become synonymous with pilots watches with thousands of military, ex-military and civilian pilots flying with their watch ranges. They are now the number 1 supplier of pilots watches in the world.</p>
                        <p>RSC provides bespoke and personalised watches to air squadrons across the globe. Top Gizzit has teamed up with RSC and 814 Naval Air Squadron to raise money for Combat Stress and make available the Flying Tigers Special Edition 2020 Chronograph: celebrating 60 years since 814 NAS took ownership of their first helicopter.</p>
                        <p>This is the first time that veterans and enthusiasts can be included in the limited production run and by getting involved you can help support the incredible military charity Combat Stress.</p>
                        <p>Your watch will be manufactured to order and personalised with your callsign or nickname. It is delivered in a presentation box and a booklet on 814 NAS The Flying Tigers</p>
                        <p>Your watch comes with a 3 year warranty. For more warranty information please visit:</p>
                        <a href="https://rscwatches.com/warranty-repairs/" target="_blank" rel="noopener noreferrer">RSC Warranty</a>
                        <h4>Available with either 814 NAS stamped Calf Leather, Full Metal Jacket or Tactical Silicon Strap</h4>
                        <h4>Swiss Movement</h4>
                        <h4>316L Stainless Steel Case</h4>
                        <h4>5 ATM water resistance</h4>
                        <h4>Scratch proof sapphire crystal face</h4>
                        <h4>Back plate engraved with 814 NAS crest</h4>
                        <h4>Includes presentation box</h4>
                        <h4>Squadron booklet and 3 year warranty card</h4>
                        <h4>Numbered piece with name/callsign engraved</h4>
                        <h3 className="price">Serving Personnel and Veterans: £300</h3>
                        <h3 className="price">Everyone else: £330</h3>
                        <p>The order form is below</p>

                    </div>
                </div>
            </div>
            <div className="product-charity">
                <a href="https://www.combatstress.org.uk/" target="_blank" rel="noopener noreferrer">
                    <img src={require("../../img/logos/combat-stress-logo.svg")} className="logo" alt="Combat Stress Logo"/>
                </a>
                <div>
                    <h2>Raising Money for Combat Stress</h2>
                    <p>50% of all sales profit is donated to Charity</p>
                </div>
            </div>
            <OrderForm/>
        </div>

    );
};

export default Homepage;
