export const prerender = false;

import { Resend } from 'resend';

// Only initialize Resend if API key exists
const resend = import.meta.env.RESEND_API_KEY
  ? new Resend(import.meta.env.RESEND_API_KEY)
  : null;

export const POST = async ({ request }) => {
  try {
	const formData = await request.formData();
	const name = formData.get('name')?.toString();
	const email = formData.get('email')?.toString();
	const message = formData.get('message')?.toString();

	console.log("Form submission received:", { name, email, message });
	console.log("Resend API key exists:", !!import.meta.env.RESEND_API_KEY);
	console.log("FROM_EMAIL:", import.meta.env.FROM_EMAIL);
	console.log("TO_EMAIL:", import.meta.env.TO_EMAIL);

	if (!name || !email || !message) {
	  return new Response(JSON.stringify({
		message: 'Missing required fields.',
		debug: { name, email, message }
	  }), { status: 400 });
	}

	if (!resend) {
	  return new Response(JSON.stringify({
		message: "Server misconfiguration: Resend API key missing."
	  }), { status: 500 });
	}

	if (!import.meta.env.FROM_EMAIL || !import.meta.env.TO_EMAIL) {
	  return new Response(JSON.stringify({
		message: "Server misconfiguration: FROM_EMAIL or TO_EMAIL missing."
	  }), { status: 500 });
	}

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

	console.log("Email sent successfully!");
	return new Response(JSON.stringify({ message: 'Success! Your inquiry has been sent.' }), { status: 200 });

  } catch (err) {
	console.error("Error sending email:", err);
	return new Response(JSON.stringify({ message: 'Server error.', error: err.toString() }), { status: 500 });
  }
};
