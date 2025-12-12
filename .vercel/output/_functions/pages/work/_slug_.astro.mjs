/* empty css                                    */
import { e as createComponent, f as createAstro, r as renderTemplate } from '../../chunks/astro/server_BTnS4FML.mjs';
import 'piccolore';
import 'clsx';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
async function getStaticPaths() {
  const projectSlugs = [
    { slug: "ecommerce-re-architecture" },
    { slug: "software-docs-migration" },
    { slug: "high-traffic-content-portal" }
  ];
  return projectSlugs.map((project) => {
    return {
      params: { slug: project.slug }
      // You can pass the actual project data here as 'props' 
      // to make the template rendering easier and faster:
      // props: projectData.find(d => d.slug === project.slug) 
    };
  });
}
const $$slug = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const dummyProjects = [
    {
      slug: "ecommerce-re-architecture",
      title: "E-Commerce Re-Architecture: 10x Faster Checkout",
      client: "Global Retailer Inc.",
      problem: "The client's legacy system was built on a monolithic platform, leading to 8-second page loads...",
      solution: "We rebuilt the entire front-end as a static, headless application using Astro...",
      results: { pageSpeed: "98/100 (from 42)", loadTime: "0.8 seconds (from 8.2s)", conversionRate: "18% increase year-over-year" },
      techStack: ["Astro", "Tailwind CSS", "Headless Commerce API"]
    }
    // Include all other project data objects here...
  ];
  const projectData = dummyProjects.find((p) => p.slug === slug);
  if (!projectData) return Astro2.redirect("/404");
  return renderTemplate``;
}, "/Users/bradmclaughlin/Projects/clevercouch.com/src/pages/work/[slug].astro", void 0);

const $$file = "/Users/bradmclaughlin/Projects/clevercouch.com/src/pages/work/[slug].astro";
const $$url = "/work/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$slug,
	file: $$file,
	getStaticPaths,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
