"use server"


import { AddProductToCartProps, IProductCarts } from "@/components/frontend/listings/AddToCartButton";
import { ProductwithBrand } from "@/components/pos/PointOfSale";
import { prismaClient } from "@/lib/db";
import { GroupProducts, IProducts, ProductProps, SBProducts, SearchProduct } from "@/type/types";
import { Products } from "@prisma/client";
import { revalidatePath } from "next/cache";


export async function createProduct(data: ProductProps) {
    console.log("Payload checked:", data);
    
    const slug = data.slug

    try {
        const existingProduct = await prismaClient.products.findUnique({
            where: {
                slug
            }
        });
        if (existingProduct) {
            return {
                success: false,
                data: null,
                error: "Product with this slug already exists"
            }
        }

        const newProduct = await prismaClient.products.create({
            data
        });
        revalidatePath("/dashboard/inventory/products")
        return {
            success: true,
            data: newProduct,
            error: null
        }

    } catch (err) {
        console.error("Failed to create product:",err);
        return {
            success: false,
            data: null,
            error: "Failed to create product"
        }
    }
}

// export async function createWarehouseProduct(data: WarehouseProductProps) {
//     console.log("Payload checked:", data);
    
//     try {

//         const newWarehouseProduct = await prismaClient.warehouseProduct.create({
//             data
//         });
//         revalidatePath("/dashboard/inventory/products")
//         return newWarehouseProduct;

//     } catch (err) {
//         console.error("Failed to create warehouse product:",err);
//         return null;
//     }
// }

export async function getAllProducts() {
    
    try {
        const products  = await prismaClient.products.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                subCategory: true,
                brand: true,
            }
        });

        return products as IProducts[];

    } catch (err) {
        console.error("Failed to get products:",err);
        return null;
    }
}

export async function getProductsBySubCategoryId(subCategoryId: string) {
    
    try {
        if (subCategoryId && subCategoryId === 'all') {
            const products = await prismaClient.products.findMany({
                include: {
                    brand: true,
                }
            });
            return {
                ok: true,
                data: products as ProductwithBrand[],
                error: null
            }
        } else if (subCategoryId && subCategoryId !== 'all') {
            const products = await prismaClient.products.findMany({
                where: {
                    subCategoryId: Number(subCategoryId)
                },
                include: {
                    brand: true,
                }
            });
            return {
                ok: true,
                data: products as ProductwithBrand[],
                error: null
            }
        }
        
    } catch (err) {
        console.error("Failed to get products:",err);
        return null;
    }
}

export async function getProductById(id: string) {

    if (id) {

        try {
            const product = await prismaClient.products.findUnique({
                where: {
                    id: Number(id)
                }
            });
            return product
        } catch (err) {
            console.error("Failed to find product by ID:",err);
            return null;
        }
    }
}

export async function getProductsByCategoryId(id: string) {

    try {
        if (id === "all") {
            const products = await prismaClient.products.findMany({
                include: {
                    brand: true,
                    
                }
            });
            return {
                ok: true,
                data: products,
                error: null
            }
        } else {
            const products = await prismaClient.products.findMany({
                where: {
                    subCategory: {
                        categoryId: Number(id),
                    }
                },
                include: {
                    brand: true,
                    
                }
            });
            return {
                ok: true,
                data: products,
                error: null
            }
        }
        
    } catch (err) {
        console.error("Failed to find product by ID:",err);
        return {
            ok: false,
            data: null,
            error: "Failed to find all products"
        }
    }
}

export async function getProductsByBrandId(brandId: string) {

    if (brandId) {

        try {
            const products = await prismaClient.products.findMany({
                where: {
                    brandId: Number(brandId)
                },
                orderBy: {
                    createdAt: "desc"
                },
                include: {
                    subCategory: true,
                    brand: true,
                }
            });
            return products
        } catch (err) {
            console.error("Failed to find product by ID:",err);
            return null;
        }
    }
}

export async function getGroupedProductsByBrandId(brandId: string) {

    if (brandId) {

        try {
            const products = await prismaClient.products.findMany({
                where: {
                    brandId: Number(brandId)
                },
                orderBy: {
                    subCategoryId: "asc"
                },
                include: {
                    subCategory: true,
                    brand: true,
                }
            });

            const groupProducts = products.reduce<Record<string, GroupProducts>>((acc, product) => { 
                const subCategory = product.subCategory;
                const brand = product.brand;
                if (!acc[subCategory.id]) {
                    acc[subCategory.id] = {
                        subCategory,
                        brand,
                        products: [],
                    }
                }
                acc[subCategory.id].products.push(product);
                return acc
            }, {})
        
            return Object.values(groupProducts)
        } catch (err) {
            console.error("Failed to find product by ID:",err);
            return null;
        }
    }
}


export async function getProductBySlug(slug: string) {

    if (!slug) return null;
        try {
            const product = await prismaClient.products.findUnique({
                where: {
                    slug,
                },
                include: {
                    brand: true,
                    subCategory: {
                        include: {
                            category: {
                                include: {
                                    mainCategory: true,
                                },
                            }
                        }
                    }
                }
            });
            return product as IProductCarts;
        } catch (err) {
            console.error("Failed to find product by ID:",err);
            return null;
        }
}

export async function getSimilarProducts(subCategoryId: number, productId: number) {

    if (!subCategoryId || !productId) return null;
        try {
            const product = await prismaClient.products.findMany({
                where: {
                    subCategoryId,
                    id: {
                        not: productId
                    }
                },
                take: 5,
                include: {
                    subCategory: true,
                    brand: true,
                }
            });
            return product
        } catch (err) {
            console.error("Failed to find product by ID:",err);
            return null;
        }
}

export async function updateProductById(id: string, data: ProductProps) {

    if (id && data) {

        try {
            const updateProduct = await prismaClient.products.update({
                where: {
                    id: Number(id),
                },
                data
            });
            revalidatePath("/dashboard/inventory/products")
            return updateProduct
        } catch (err) {
            console.error("Failed to update product by ID:",err);
            return null;
        }
    }
}

export async function deleteProductById(id: number) {
    console.log("Category ID to be deleted:", id);

    try {
        const deletedProduct = await prismaClient.products.delete({
            where: {
                id 
            }
        });
        revalidatePath("/dashboard/inventory/products")
        return {
            ok: true,
            data: deletedProduct
        }
    } catch (err) {
        console.error("Failed to delete product:",err);
    }
}

export async function createBulkProducts(products: ProductProps[]) {
    try {
    
        for (const product of products) {
            await createProduct(product)
        }
    } catch (err) {
        console.error("Failed to create bulk products:",err);
    }
}

type BriefCategory = {
    title: string;
    slug: string;
    type: string;
}
// export async function getProductsByCategorySlug(
//     slug: string, 
//     type: string,
//     page: string, 
//     sort?: "asc" | "desc",
//     min?: string,
//     max?: string,
// ) {
//     const minPrice = Number(min);
//     const maxPrice = Number(max);
//     const pageNumber = Number(page);
//     const pageSize = 5;
//     let totalCount = 0;
    
//     let products = [] as Products[];
//     let categories = [] as BriefCategory[];
//     try {
//         if ( type === "main") {
//             const productsInMainCategory  = await prismaClient.mainCategory.findUnique({
//                 where: {
//                     slug,
//                 },
//                 include: {
//                     categories: {
//                         include: {
//                             subCategories: {
//                                 include: {
//                                     products: sort ? {
//                                         include: {
//                                             brand: true,
//                                         },
//                                         orderBy: {
//                                             productPrice: sort,
//                                         },
//                                         where: {
//                                             productPrice: {
//                                                 gte: minPrice || 0,
//                                                 lte: maxPrice || Number.MAX_SAFE_INTEGER,
//                                             }
//                                         },
//                                         skip: (pageNumber - 1) * pageSize,
//                                         take: pageSize,   
//                                     } : {
//                                         include: {
//                                             brand: true,
//                                         },
//                                         where: {
//                                             productPrice: {
//                                                 gte: minPrice || 0,
//                                                 lte: maxPrice || Number.MAX_SAFE_INTEGER,
//                                             }
//                                         },
//                                         skip: (pageNumber - 1) * pageSize,
//                                         take: pageSize,     
//                                     },
//                                 },
//                             }
//                         }
//                     }
//                 }
//             });
//             if (productsInMainCategory) {
//                 products = productsInMainCategory.categories.flatMap(
//                     (category) => category.subCategories.flatMap(
//                         (subCategory) => subCategory.products)
//                     );

//                 totalCount = await prismaClient.products.count({
//                     where: {
//                         subCategory: {
//                             category: {
//                                 mainCategoryId: productsInMainCategory.id,
//                             },
//                         },
//                         productPrice: {
//                             gte: minPrice || 0,
//                             lte: maxPrice || Number.MAX_SAFE_INTEGER,
//                         }
//                     }
//                 });

//                 categories = productsInMainCategory.categories.map((c) => ({
//                     title: c.title,
//                     slug: c.slug,
//                     type: "cate"
//                 }));
//             };
            
//         } else if ( type === "cate") {
//             const productsInCategory  = await prismaClient.category.findUnique({
//                 where: {
//                     slug,
//                 },
//                 include: {
//                     subCategories: {
//                         include: {
//                             products: sort ? {
//                                 include: {
//                                     brand: true,
//                                 },
//                                 orderBy: {
//                                     productPrice: sort,
//                                 },
//                                 where: {
//                                     productPrice: {
//                                         gte: minPrice || 0,
//                                         lte: maxPrice || Number.MAX_SAFE_INTEGER,
//                                     }
//                                 }   
//                             } : {
//                                 include: {
//                                     brand: true,
//                                 },
//                                 where: {
//                                     productPrice: {
//                                         gte: minPrice || 0,
//                                         lte: maxPrice || Number.MAX_SAFE_INTEGER,
//                                     }
//                                 }   
//                             },
//                         }
//                     }
//                 }
//             });
//             if (productsInCategory) {
//                 products = productsInCategory.subCategories.flatMap(
//                     (sub) => sub.products)
//                 categories = productsInCategory.subCategories.map((c) => ({
//                     title: c.title,
//                     slug: c.slug,
//                     type: "sub"
//                 }));
//             }
//         } else if ( type === "sub" ) {
//             const productsInSubCategory  = await prismaClient.subCategory.findUnique({
//                 where: {
//                     slug,
//                 },
//                 include: {
//                     products: sort ? {
//                         include: {
//                             brand: true,
//                         },
//                         orderBy: {
//                             productPrice: sort,
//                         },
//                         where: {
//                             productPrice: {
//                                 gte: minPrice || 0,
//                                 lte: maxPrice || Number.MAX_SAFE_INTEGER,
//                             }
//                         }   
//                     } : {
//                         include: {
//                             brand: true,
//                         },
//                         where: {
//                             productPrice: {
//                                 gte: minPrice || 0,
//                                 lte: maxPrice || Number.MAX_SAFE_INTEGER,
//                             }
//                         }   
//                     },
//                 }
//             });
//             if (productsInSubCategory) {
//                 products = productsInSubCategory.products;
//                 categories = [];
//             }
//         }
//         return {
//             products,
//             categories,
//             totalPages: Math.ceil(totalCount / pageSize),
//         }
//     } catch (err) {
//         console.error("Failed to get products or categories:",err);
//         return null;
//     }
// }

export async function getProductsByCategorySlug(
    slug: string, 
    type: string,
    page: string,
    pageSize: number, 
    sort?: "asc" | "desc",
    min?: string,
    max?: string,
) {
    const minPrice = Number(min);
    const maxPrice = Number(max);
    const pageNumber = Number(page);
    
    
    let products = [] as Products[];
    let categories = [] as BriefCategory[];
    let totalCount = 0;

    const priceFilter = {
        gte: minPrice || 0,
        lte: maxPrice || Number.MAX_SAFE_INTEGER,
    }

    try {
        if ( type === "main") {
            const mainCategory  = await prismaClient.mainCategory.findUnique({
                where: {
                    slug,
                },
                include: {
                    categories: true,
                }
            });
            if (mainCategory) {
                totalCount = await prismaClient.products.count({
                    where: {
                        subCategory: {
                            category: {
                                mainCategoryId: mainCategory.id,
                            },
                        },
                        productPrice: priceFilter,
                    },
                });

                products = await prismaClient.products.findMany({
                    where: {
                        subCategory: {
                            category: {
                                mainCategoryId: mainCategory.id,
                            },
                        },
                        productPrice: priceFilter,
                    },
                    include: {
                        brand: true,
                    },
                    orderBy: sort ? {
                        productPrice: sort } : undefined,
                    skip: (pageNumber - 1) * pageSize,
                    take: pageSize,
                })

                categories = mainCategory.categories.map((c) => ({
                    title: c.title,
                    slug: c.slug,
                    type: "cate"
                }));
            };
            
        } else if ( type === "cate") {
            const category  = await prismaClient.category.findUnique({
                where: {
                    slug,
                },
                include: {
                    subCategories: true,
                },
            });
            if (category) {
                totalCount = await prismaClient.products.count({
                    where: {
                        subCategory: {
                            categoryId: category.id,
                        },
                        productPrice: priceFilter,
                    },
                })

                products = await prismaClient.products.findMany({
                    where: {
                        subCategory: {
                            categoryId: category.id,
                        },
                        productPrice: priceFilter,
                    },
                    include: {
                        brand: true,
                    },
                    orderBy: sort ? {
                        productPrice: sort } : undefined,
                    skip: (pageNumber - 1) * pageSize,
                    take: pageSize,
                })

                categories = category.subCategories.map((s) => ({
                    title: s.title,
                    slug: s.slug,
                    type: "sub"
                }));
            }
        } else if ( type === "sub" ) {
            const subCategory  = await prismaClient.subCategory.findUnique({
                where: {
                    slug,
                },
                
            });
            if (subCategory) {
                totalCount = await prismaClient.products.count({
                    where: {
                        subCategoryId: subCategory.id,
                        productPrice: priceFilter,
                    },
                });

                products = await prismaClient.products.findMany({
                    where: {
                        subCategoryId: subCategory.id,
                        productPrice: priceFilter,
                    },
                    include: {
                        brand: true,
                    },
                    orderBy: sort ? {
                        productPrice: sort } : undefined,
                    skip: (pageNumber - 1) * pageSize,
                    take: pageSize,
                });

                categories = [];
            }
        }
        return {
            products,
            categories,
            totalCount,
            totalPages: Math.ceil(totalCount / pageSize),
        };
    } catch (err) {
        console.error("Failed to get products or categories:",err);
        return null;
    }
}

export async function getBestSellingProducts(item: number) {
    
    try {
        const bestSellingProducts = await prismaClient.products.findMany({
            orderBy: {
                sale: {
                    _count: "desc"
                }
            },
            include: {
                sale: true,
                brand: true,
            },
            take: item,
        });

        return {
            status: 200,
            data: bestSellingProducts,
            error: null
        }

    } catch (err) {
        console.error("Failed to get best selling products:", err);
        return {
            status: 500,
            data: null,
            error: "Failed to get best selling products"
        }
    }
}

export async function getSearchProducts() {
  try {
    const allProducts = await prismaClient.products.findMany({
      select: {
        name: true,
        slug: true,
        productThumbnail: true,
      },
    });
    const products = allProducts.map((item) => {
      return {
        name: item.name,
        slug: item.slug,
        productThumbnail: item.productThumbnail,
        type: "prod",
      };
    });
    const allCategories = await prismaClient.category.findMany({
      select: {
        title: true,
        slug: true,
        imageUrl: true,
      },
    });
    const allBrands = await prismaClient.brand.findMany({
      select: {
        title: true,
        slug: true,
        imageUrl: true,
        id: true,
      },
    });
    const categories = allCategories.map((item) => {
      return {
        name: item.title,
        slug: item.slug,
        productThumbnail: item.imageUrl,
        type: "cate",
      };
    });
    const brands = allBrands.map((item) => {
      return {
        name: item.title,
        slug: item.slug,
        productThumbnail: item.imageUrl,
        type: "brand",
        id: item.id,
      };
    });
    const results = [...products, ...categories, ...brands];
    return results as SearchProduct[];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductsBySearchQuery(
  query: string,
  sort?: "asc" | "desc",
  min?: number,
  max?: number
) {
  const categories = await prismaClient.category.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
  });
  const brands = await prismaClient.brand.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { slug: { contains: query, mode: "insensitive" } },
      ],
    },
  });

  const products = await prismaClient.products.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { productDetails: { contains: query, mode: "insensitive" } },
      ],
      AND: [
        min ? { productPrice: { gte: min } } : {},
        max ? { productPrice: { lte: max } } : {},
      ],
    },
    select: {
      id: true,
      name: true,
      slug: true,
      stockQty: true,
      productCost: true,
      productPrice: true,
      productThumbnail: true,
      subCategoryId: true,
      brandId: true,
    },
    orderBy: {
      productPrice: sort,
    },
  });

  const allProducts = await prismaClient.products.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      stockQty: true,
      productCost: true,
      productPrice: true,
      productThumbnail: true,
      subCategoryId: true,
      brandId: true,
    },
  });

  // Filter products based on the found categories and brands
  const categoryIds = categories.map((category) => category.id);
  const brandIds = brands.map((brand) => brand.id);

  let filteredProducts = allProducts.filter((product) => {
    return (
      categoryIds.includes(product.subCategoryId) ||
      brandIds.includes(product.brandId)
    );
  });
  // Apply min and max price filters to the filtered products
  filteredProducts = filteredProducts.filter((product) => {
    const meetsMinCondition = min ? product.productPrice >= min : true;
    const meetsMaxCondition = max ? product.productPrice <= max : true;
    return meetsMinCondition && meetsMaxCondition;
  });

  // Sort the filtered products if sort is provided
  if (sort) {
    filteredProducts.sort((a, b) => {
      if (sort === "asc") {
        return a.productPrice - b.productPrice;
      } else {
        return b.productPrice - a.productPrice;
      }
    });
  }

  const resultingProducts = [...products, ...filteredProducts];
  // Transform the filtered products to match the ProductResult type
  const result = resultingProducts.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    stockQty: product.stockQty,
    productCost: product.productCost,
    productPrice: product.productPrice,
    productThumbnail: product.productThumbnail,
  }));
  // Remove duplicate products
  const uniqueProductIds = new Set();
  const uniqueProducts = resultingProducts.filter((product) => {
    if (!uniqueProductIds.has(product.id)) {
      uniqueProductIds.add(product.id);
      return true;
    }
    return false;
  });

  return uniqueProducts as IProducts[];
}

export async function getProductDetails(id: number) {
  try {
    const product = await prismaClient.products.findUnique({
      where: {
        id,
      },
      include: {
        subCategory: {
          include: {
            category: {
              include: {
                mainCategory: true,
              },
            },
          },
        },
        brand: true,
        reviews: true,
      },
    });
    return product;
  } catch (error) {
    console.log(error);
  }
}