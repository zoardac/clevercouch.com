import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const resend = new Resend("re_6EWnSeem_DLsU4n3h3gSm3uiKfmVnzvpC");
const POST = async ({
  request
}) => {
  try {
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
    await resend.emails.send({
      from: undefined                          ,
      to: undefined                        ,
      subject: `New Project Inquiry from ${name}`,
      reply_to: email,
      html: `
		<p><strong>New Inquiry Received!</strong></p>
		<hr>
		<p><strong>Name:</strong> ${name}</p>
		<p><strong>Email:</strong> ${email}</p>
		<p><strong>Message:</strong></p>
		<p>${message.replace(/\n/g, "<br>")}</p>
	  `
    });
    return new Response(JSON.stringify({
      message: "Success! Your inquiry has been sent."
    }), {
      status: 200
    });
  } catch (err) {
    console.error("Error sending email:", err);
    return new Response(JSON.stringify({
      message: "Server error."
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
