// src/pages/api/contact.ts
import type { APIRoute } from 'astro';

// 🛑 Replace with your actual email sending logic (e.g., using Resend or Nodemailer)
async function sendEmail(name: string, email: string, message: string): Promise<boolean> {
	
	// --- TEMPORARY LOGIC FOR DEMO ---
	console.log(`Sending email from: ${name} (${email})`);
	console.log(`Message: ${message.substring(0, 50)}...`);

	// In a real application, you would use an email service SDK here:
	/*
	const response = await fetch('YOUR_EMAIL_API_ENDPOINT', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name, email, message })
	});
	return response.ok;
	*/
   
   // Assume success for now
   return true;
}

export const POST: APIRoute = async ({ request }) => {
	// 1. Get the data from the form submission
	const data = await request.formData();

	const name = data.get('name')?.toString();
	const email = data.get('email')?.toString();
	const message = data.get('message')?.toString();

	// 2. Validate data
	if (!name || !email || !message) {
		return new Response(
			JSON.stringify({
				message: "Missing required fields.",
			}),
			{ status: 400 }
		);
	}
	
	// 3. Process the submission (e.g., send the email)
	const success = await sendEmail(name, email, message);

	if (success) {
		// 4. Send a success response back to the client
		return new Response(
			JSON.stringify({
				message: "Success! Your inquiry has been sent to Clevercouch.",
			}),
			{ status: 200 }
		);
	} else {
		// 5. Handle failure
		return new Response(
			JSON.stringify({
				message: "Email service failed. Please try again later.",
			}),
			{ status: 500 }
		);
	}
};