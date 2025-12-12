// tailwind.config.js

module.exports = {
content: [
	'./src/**/*.{astro,html,js,jsx,ts,tsx}', 
	// This tells Tailwind to look inside all files in your 'src' folder 
	// that end in .astro, .html, .js, etc.
  ],
  theme: {
	extend: {
	  colors: {
		// --- Aura Digital Brand Colors ---
		'parchment-light': '#F1EFE7', // Background
		'charcoal': '#2D2926',      // Main Text/Dark Elements
		'charcoal-light': '#5A5450', // <--- THIS IS THE MISSING DEFINITION!
		'sand-accent': '#D4A373',   // Primary Accent
		'sage-dark': '#3C5B52',     // Secondary Accent
		// --- Blueprint Mode Colors ---
		'gray-code': '#1a1a1a',      
		'hacker-green': '#00FF41',  
	  },
	  // ... rest of your config (fontFamily, plugins, etc.)
	  fontFamily: {
		  // MAPPING 1: For Headings and Logo
		  'serif-heavy': ['"cormorant-garamond"', 'serif'], 
		   
		  // MAPPING 2: Corrected name for Subheads/Code/Technical Details
		  // Used by: font-mono-subhead
		  'mono-subhead': ['"ibm-plex-mono"', 'monospace'], 
		   
		  // MAPPING 3: Corrected name for the default sans-serif (Body text)
		  // Used by: font-sans (or just 'sans')
		  'sans': ['"nimbus-sans"', 'sans-serif'],
		},
	},
  },
  plugins: [],
}