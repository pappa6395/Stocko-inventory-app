
export const siteConfig = {
  name: "Stocko-Online",
  title: "Its the best for you on the online-Market ",
  url: process.env.NEXT_PUBLIC_BASE_URL! || "https://stocko-inventory-app.vercel.app",
  ogImage: "https://res.cloudinary.com/duwdwnu8y/image/upload/v1747325682/stocko-onlne_oxsiyo.png",
  description:
    "Stocko-Online is your go-to e-commerce platform for high-quality, market-leading products. Fast, secure, and user-friendly shopping experience — all in one place.",
  links: {
    x: "https://x.com/stocko-online",
    github: "https://github.com/pappa6395/Stocko-inventory-app",
    facebook: "https://www.facebook.com/stocko.online",
  },
};
 
export type SiteConfig = typeof siteConfig;