export const prerender = false;

import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST = async ({ request }) => {
  try {
	const formData = await request.formData();

	const name = formData.get('name')?.toString();
	const email = formData.get('email')?.toString();
	const message = formData.get('message')?.toString();

	if (!name || !email || !message) {
	  return new Response(JSON.stringify({ message: 'Missing required fields.' }), { status: 400 });
	}

	// Send email via Resend
	await resend.emails.send({
	  from: import.meta.env.FROM_EMAIL,
	  to: import.meta.env.TO_EMAIL,
	  subject: `New Project Inquiry from ${name}`,
	  reply_to: email,
	  html: `
		<p><strong>New Inquiry Received!</strong></p>
		<hr>
		<p><strong>Name:</strong> ${name}</p>
		<p><strong>Email:</strong> ${email}</p>
		<p><strong>Message:</strong></p>
		<p>${message.replace(/\n/g, '<br>')}</p>
	  `,
	});

	return new Response(JSON.stringify({ message: 'Success! Your inquiry has been sent.' }), { status: 200 });
  } catch (err) {
	console.error('Error sending email:', err);
	return new Response(JSON.stringify({ message: 'Server error.' }), { status: 500 });
  }
};
