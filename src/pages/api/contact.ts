console.log("RESEND KEY:", import.meta.env.RESEND_API_KEY);
export const prerender = false; // 🛑 Tells Astro NOT to build this as a static file
// src/pages/api/contact.ts
import type { APIRoute } from 'astro';
import { Resend } from 'resend'; // 🛑 NEW: Import Resend

// 🛑 Initialize Resend using the environment variable
const resend = new Resend(import.meta.env.RESEND_API_KEY); 

// 🛑 Replace the old placeholder with this function
async function sendProjectInquiry(name: string, email: string, message: string): Promise<boolean> {
	try {
		const { data, error } = await resend.emails.send({
			// 🛑 CRITICAL: Replace with your VERIFIED sender email
			// Temporary test in src/pages/api/contact.ts
			from: 'onboarding@resend.dev',
			to: 'your-personal-email@gmail.com', // Must be the email you signed up for Resend with
			
			subject: `New Project Inquiry from ${name}`,
			reply_to: email, // Allows you to hit 'Reply' directly
			
			html: `
				<p><strong>New Inquiry Received!</strong></p>
				<hr>
				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Message:</strong></p>
				<p>${message.replace(/\n/g, '<br>')}</p>
				<hr>
				<p>Sent via Clevercouch website contact form.</p>
			`,
		});

		if (error) {
			console.error('Resend Error:', error);
			return false;
		}
		
		console.log('Email sent successfully:', data);
		return true;

	} catch (error) {
		console.error('Email Sending Exception:', error);
		return false;
	}
}

export const POST: APIRoute = async ({ request }) => {
	// ... (data extraction and validation logic remains the same) ...

	const data = await request.formData();
	const name = data.get('name')?.toString();
	const email = data.get('email')?.toString();
	const message = data.get('message')?.toString();

	if (!name || !email || !message) {
		return new Response(JSON.stringify({ message: "Missing required fields." }), { status: 400 });
	}
	
	// 🛑 NEW: Use the robust function
	const success = await sendProjectInquiry(name, email, message);

	if (success) {
		return new Response(JSON.stringify({ message: "Success! Your inquiry has been sent to Clevercouch." }), { status: 200 });
	} else {
		return new Response(JSON.stringify({ message: "Email service failed. Please check server logs." }), { status: 500 });
	}
};