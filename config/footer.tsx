import Logo from "@/components/global/Logo";
import { Copyright, Headset, Mail, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const footer = {
    logo: <Logo />,
    summary: "Stocko-Online is a powerful, all-in-one e-commerce and inventory management system designed to streamline online sales, real-time stock tracking, and seamless order fulfillment — empowering businesses to grow smarter and faster.",
    contacts: [
        {
            label: "+6694 254 5659",
            icon: Headset
        },
        {
            label: "https://stocko-inventory-app.vercel.app",
            icon: Mail
        },
        {
            label: "159 PAP Building, Bangna, Bangkok",
            icon: MapPin
        },
    ],
    navigation: [
        {
            title: "Getting Started",
            links: [
                { title: "Introduction", path: "/introduction" },
                { title: "Documentation", path: "/docs" },
                { title: "Usage", path: "/usage" },
                { title: "Global", path: "/global" },
                { title: "API", path: "/api-docs" },
            ]
        },
        {
            title: "Company",
            links: [
                { title: "About Us", path: "/about" },
                { title: "Careers", path: "/careers" },
                { title: "Community", path: "/community" },
                { title: "Contact Us", path: "/conact-us" },
                { title: "Blogs", path: "/blogs" },
            ]
        },
        {
            title: "Partner",
            links: [
                { title: "For individuals", path: "/individuals" },
                { title: "For freelancers", path: "/freelancers" },
                { title: "For teams", path: "/teams" },
                { title: "For enterprises", path: "/enterprises" },
            ]
        },
        {
            title: "Resources",
            links: [
                { title: "Support", path: "/support" },
                { title: "Security", path: "/security" },
                { title: "Help Center", path: "/help-center" },
                { title: "Preferences", path: "/preferences" },
                { title: "Privacy policy", path: "/privacy-policy" },
                { title: "Terms of use", path: "/terms-of-use" },
            ]
        },
    ],
}

export const belowFooter = {
    reserve: {
        icon: <Copyright className="size-5" />,
        title: "Stocko-Online",
        text: "- All rights reserved"
    },
    policy: [
        {
            title: "Terms & Conditions",
            path: "/terms-and-conditions"
        },
        {
            title: "Privacy Policy",
            path: "/privacy-policy"
        },
        {
            title: "Cookie Policy",
            path: "/cookie-policy"
        }
    ],
    socialLink: [
        {
            icon: FaFacebook,
            path: "https://www.facebook.com"
        },
        {
            icon: FaXTwitter,
            path: "https://x.com"
        },
        {
            icon: FaInstagram,
            path: "https://www.instagram.com"
        },
        {
            icon: FaLinkedin,
            path: "https://www.linkedin.com"
        }
    ]
}