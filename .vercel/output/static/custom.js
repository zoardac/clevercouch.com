document.addEventListener('DOMContentLoaded', function() {
	// 1. Get the necessary elements
	const toggleBtn = document.getElementById('blueprint-toggle');
	const body = document.body;
	const BLUEPRINT_CLASS = 'blueprint-mode';
	const STORAGE_KEY = 'auraDigitalBlueprint';

	if (!toggleBtn) {
		console.error("Blueprint toggle button not found.");
		return; 
	}

	// --- Initial Load Check ---
	const storedState = localStorage.getItem(STORAGE_KEY);
	if (storedState === 'on') {
		body.classList.add(BLUEPRINT_CLASS);
		// Optionally, change the icon's color immediately to reflect the 'on' state
		toggleBtn.classList.add('text-hacker-green'); 
	}

	// --- Event Listener for Click ---
	toggleBtn.addEventListener('click', () => {
		body.classList.toggle(BLUEPRINT_CLASS);
		const isBlueprintActive = body.classList.contains(BLUEPRINT_CLASS);

		if (isBlueprintActive) {
			// 3. Update icon style and save state
			toggleBtn.classList.add('text-hacker-green');
			localStorage.setItem(STORAGE_KEY, 'on');
		} else {
			// 3. Update icon style and save state
			toggleBtn.classList.remove('text-hacker-green');
			localStorage.setItem(STORAGE_KEY, 'off');
		}
	});
});

document.addEventListener('DOMContentLoaded', () => {
	const slider = document.getElementById('growth-slider');
	const priceDisplay = document.getElementById('price-display');
	
	// Define the tiers to map slider values (0, 1, 2, 3) to prices
	const tiers = [50, 100, 500, 1000];

	if (slider && priceDisplay) {
		// Function to update the display based on the slider value
		const updatePrice = (value) => {
			const index = parseInt(value);
			const price = tiers[index];
			
			// Update the text content
			priceDisplay.textContent = `$${price}`;
			
			// Optional: You can change the color or emphasis here
			priceDisplay.classList.remove('text-charcoal-light');
			priceDisplay.classList.add('text-sand-accent'); // Highlight the selected price
		};

		// 1. Set initial state on load
		updatePrice(slider.value);

		// 2. Add event listener for input change
		slider.addEventListener('input', (event) => {
			updatePrice(event.target.value);
		});
	}
});

document.addEventListener('DOMContentLoaded', () => {
	const displayElement = document.getElementById('page-weight-display');

	if (!displayElement) {
		console.warn('Page weight display element not found.');
		return;
	}

	// Helper function to format bytes into KB/MB
	const formatBytes = (bytes) => {
		if (bytes === 0) return '0 KB';
		const k = 1024;
		const sizes = ['bytes', 'KB', 'MB', 'GB'];
		
		// Find the appropriate unit (KB, MB, etc.)
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		
		// Return the formatted string (e.g., 205.5 KB)
		return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
	};

	// Function to calculate and update the total page weight
	const calculatePageWeight = () => {
		let totalTransferSize = 0;
		
		// The Performance API gets information about resources loaded by the browser
		const resources = performance.getEntriesByType('resource');
		
		resources.forEach(resource => {
			// 'transferSize' is the compressed size transferred over the network
			if (resource.transferSize) {
				totalTransferSize += resource.transferSize;
			}
		});

		// Add the document itself (HTML page)
		const navEntry = performance.getEntriesByType('navigation')[0];
		if (navEntry && navEntry.transferSize) {
			totalTransferSize += navEntry.transferSize;
		}

		// Update the HTML display
		displayElement.textContent = formatBytes(totalTransferSize);
	};

	// Run the calculation once the window has fully loaded all assets
	window.addEventListener('load', calculatePageWeight);

	// Fallback for immediate display if resources are already loaded
	if (document.readyState === 'complete') {
		calculatePageWeight();
	}
});