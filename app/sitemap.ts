//app/sitemap.js
import { getAllBrands } from "../actions/brand";
import { getAllCategories } from "../actions/category";
import { getAllMainCategories } from "../actions/main-categories";
import { getAllProducts } from "../actions/products";
import { getAllSubCategories } from "../actions/subCategories";
import { siteConfig } from "../config/site";

export default async function sitemap() {
  const baseUrl = siteConfig.url;
 
  const products = await getAllProducts() || [];
  const categories = await getAllCategories() || []; 
  const mainCategories = await getAllMainCategories() || []; 
  const subCategories = await getAllSubCategories() || [];
  const brands = await getAllBrands() || [];

  const productUrls = products?.map((product) => {
    return {
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(),
    };
  });
  const categoryUrls = categories.map((cat) => {
    return {
      url: `${baseUrl}/categories/${cat.slug}?type=cate`,
      lastModified: new Date(),
    };
  });
  const mainCategoryUrls = mainCategories.map((main) => {
    return {
      url: `${baseUrl}/categories/${main.slug}?type=main`,
      lastModified: new Date(),
    };
  });
  const subCategoryUrls = subCategories.map((sub) => {
    return {
      url: `${baseUrl}/categories/${sub.slug}?type=sub`,
      lastModified: new Date(),
    };
  });
  const brandUrls = brands.map((b) => {
    return {
      url: `${baseUrl}/brands/${b.slug}?id=${b.id}`,
      lastModified: new Date(),
    };
  });
 
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    // {
    //   url: `${baseUrl}/contact`,
    //   lastModified: new Date(),
    // },
    ...productUrls,
    ...mainCategoryUrls,
    ...categoryUrls,
    ...subCategoryUrls,
    ...brandUrls,
  ];
}