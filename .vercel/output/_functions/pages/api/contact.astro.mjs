import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const resend = new Resend("re_6EWnSeem_DLsU4n3h3gSm3uiKfmVnzvpC");
const TEST_MODE = false;
const POST = async ({
  request
}) => {
  try {
    const formData = await request.formData();
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const message = formData.get("message")?.toString();
    console.log("Form submission received:", {
      name,
      email,
      message
    });
    if (!name || !email || !message) {
      return new Response(JSON.stringify({
        message: "Missing required fields.",
        debug: {
          name,
          email,
          message
        }
      }), {
        status: 400
      });
    }
    if (false) ;
    if (!TEST_MODE) {
      await resend.emails.send({
        from: "brad.mclaughlin@gmail.com",
        to: "onboarding@resend.dev",
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
      console.log("Email sent successfully!");
    }
    return new Response(JSON.stringify({
      message: "Your inquiry has been sent successfully!"
    }), {
      status: 200
    });
  } catch (err) {
    console.error("Error sending email:", err);
    return new Response(JSON.stringify({
      message: "Server error.",
      error: err.toString()
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
