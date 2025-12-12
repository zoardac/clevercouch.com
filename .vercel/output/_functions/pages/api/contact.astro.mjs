import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const resend = new Resend("re_6EWnSeem_DLsU4n3h3gSm3uiKfmVnzvpC");
async function sendProjectInquiry(name, email, message) {
  try {
    const {
      data,
      error
    } = await resend.emails.send({
      from: "brad@clevercouch.com",
      to: "brad@untoibeodo.resend.app",
      // replace with your real email
      subject: `New Project Inquiry from ${name}`,
      reply_to: email,
      html: `
				<p><strong>New Inquiry Received!</strong></p>
				<hr>
				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Message:</strong></p>
				<p>${message.replace(/\n/g, "<br>")}</p>
				<hr>
				<p>Sent via Clevercouch website contact form.</p>
			`
    });
    if (error) {
      console.error("Resend Error:", error);
      return false;
    }
    console.log("Email sent successfully:", data);
    return true;
  } catch (err) {
    console.error("Email Sending Exception:", err);
    return false;
  }
}
const POST = async ({
  request
}) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const message = formData.get("message")?.toString();
  if (!name || !email || !message) {
    return new Response(JSON.stringify({
      message: "Missing required fields."
    }), {
      status: 400
    });
  }
  const success = await sendProjectInquiry(name, email, message);
  if (success) {
    return new Response(JSON.stringify({
      message: "Success! Your inquiry has been sent to Clevercouch."
    }), {
      status: 200
    });
  } else {
    return new Response(JSON.stringify({
      message: "Email service failed."
    }), {
      status: 500
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	POST,
	prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
