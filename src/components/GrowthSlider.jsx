import { useEffect, useRef, useState } from 'preact/hooks';

// --- TIER DATA (Same as before) ---
const TIER_DATA = [
	{ name: "Bronze ($50/mo)", price: 50, features: [
		"1 Hour Dedicated Development", "Continuous Performance Audits", "Priority Bug Fixes",
	]},
	{ name: "Silver ($100/mo)", price: 100, features: [
		"2 Hours Dedicated Development", "Performance Guarantee (98+ Score)", "New Feature Development (Small)",
	]},
	{ name: "Gold ($500/mo)", price: 500, features: [
		"5 Hours Dedicated Development", "Monthly Strategy Call", "New Feature Development (Medium)", "Integrated A/B Testing",
	]},
	{ name: "Platinum ($1000/mo)", price: 1000, features: [
		"10 Hours Dedicated Development", "Dedicated Support Channel", "Full Feature Development Pipeline", "Custom API Integration Support",
	]},
];

export default function GrowthSlider() {
	
	// 🛑 NEW: Component State to trigger re-render on feature change
	const [activeIndex, setActiveIndex] = useState(1); 
	
	// Refs for the elements we need to manipulate
	const containerRef = useRef(null);
	const sliderRef = useRef(null);
	const priceDisplayRef = useRef(null);
	
	const currentTier = TIER_DATA[activeIndex];

	useEffect(() => {
		const slider = sliderRef.current;
		const container = containerRef.current;
		const priceDisplay = priceDisplayRef.current;
		
		if (slider && container && priceDisplay) {
			
			const tierLabels = container.querySelectorAll('.tier-label');
			
			const updateStateAndUI = (index) => {
				// 1. Update component state (Triggers re-render for the feature list)
				setActiveIndex(index); 
				
				// 2. Update Price Display (Direct DOM manipulation is fine here)
				priceDisplay.textContent = `$${TIER_DATA[index].price}`;
				
				// 3. Update Highlight
				tierLabels.forEach((label, i) => {
					label.classList.remove('text-charcoal', 'font-bold'); 
					if (i === index) {
						label.classList.add('text-charcoal', 'font-bold'); 
					}
				});
			};

			// Initialize the UI and state
			updateStateAndUI(parseInt(slider.defaultValue, 10));

			const handleInput = (event) => {
				updateStateAndUI(parseInt(event.target.value, 10));
			};
			
			slider.addEventListener('input', handleInput);
			
			return () => slider.removeEventListener('input', handleInput);
		}
	}, []);

	// Return the JSX (HTML) structure
	return (
		// Outermost container for the slider and price display
		<div ref={containerRef} className="w-full">
			
			{/* Price Display and Slider (relative positioning for price text) */}
			<div className="relative pt-10 pb-8"> 
				<div className="absolute w-full top-[-30px] text-center">
					<span 
						ref={priceDisplayRef}
						id="price-display" 
						className="text-4xl font-mono-subhead text-sand-accent font-bold tracking-wider"
					>
						{currentTier.price}
					</span>
					<span className="text-xl font-mono-subhead text-charcoal-light ml-1">
						/mo
					</span>
				</div>
				<input 
					type="range" 
					ref={sliderRef}
					id="growth-slider" 
					min="0" 
					max="3" 
					defaultValue="1" 
					className="w-full h-2 bg-charcoal-light/20 rounded-lg appearance-none cursor-pointer accent-sand-accent"
					aria-label="Growth Subscription Tier Selector"
				/>
			</div>
			
			{/* Tier Labels */}
			<div className="flex justify-between text-sm font-mono-subhead text-charcoal-light/70 pt-2">
				<span className="tier-label"> $50 </span>
				<span className="tier-label"> $100 </span>
				<span className="tier-label"> $500 </span>
				<span className="tier-label"> $1000 </span>
			</div>

			{/* 🛑 DYNAMIC FEATURE LIST RENDERED BY PREACT STATE */}
			<ul className="space-y-3 font-mono-subhead text-sm text-charcoal mt-10">
				{currentTier.features.map((feature, index) => (
					<li key={index} className="flex items-start">
						<span className="text-sage-dark mr-3 mt-1">//</span> {feature}
					</li>
				))}
			</ul>
		</div>
	);
}