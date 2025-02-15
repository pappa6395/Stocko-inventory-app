"use server"


import { AddProductToCartProps, IProductCarts } from "@/components/frontend/listings/AddToCartButton";
import { prismaClient } from "@/lib/db";
import { GroupProducts, IProducts, ProductProps } from "@/type/types";
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
            const products = await prismaClient.products.findMany();
            return {
                ok: true,
                data: products,
                error: null
            }
        } else if (subCategoryId && subCategoryId !== 'all') {
            const products = await prismaClient.products.findMany({
                where: {
                    subCategoryId: Number(subCategoryId)
                },
            });
            return {
                ok: true,
                data: products,
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
                }
            });

            const groupProducts = products.reduce<Record<string, GroupProducts>>((acc, product) => { 
                const subCategory = product.subCategory;
                if (!acc[subCategory.id]) {
                    acc[subCategory.id] = {
                        subCategory,
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
export async function getProductsByCategorySlug(slug: string, type: string, sort?: "asc" | "desc") {
    
    let products = [] as Products[];
    let categories = [] as BriefCategory[];
    try {
        if ( type === "main") {
            const productsInMainCategory  = await prismaClient.mainCategory.findUnique({
                where: {
                    slug,
                },
                include: {
                    categories: {
                        include: {
                            subCategories: {
                                include: {
                                    products: sort ? {
                                        include: {
                                            brand: true,
                                        },
                                        orderBy: {
                                            productPrice: sort,
                                        },   
                                    } : {
                                        include: {
                                            brand: true,
                                        },
                                    },
                                },
                            }
                        }
                    }
                }
            });
            if (productsInMainCategory) {
                products = productsInMainCategory.categories.flatMap(
                    (category) => category.subCategories.flatMap(
                        (subCategory) => subCategory.products))

                categories = productsInMainCategory.categories.map((c) => ({
                    title: c.title,
                    slug: c.slug,
                    type: "cate"
                }));
            };
            
        } else if ( type === "cate") {
            const productsInCategory  = await prismaClient.category.findUnique({
                where: {
                    slug,
                },
                include: {
                    subCategories: {
                        include: {
                            products: sort ? {
                                include: {
                                    brand: true,
                                },
                                orderBy: {
                                    productPrice: sort,
                                },
                            } : {
                                include: {
                                    brand: true,
                                },
                            },
                        }
                    }
                }
            });
            if (productsInCategory) {
                products = productsInCategory.subCategories.flatMap(
                    (sub) => sub.products)
                categories = productsInCategory.subCategories.map((c) => ({
                    title: c.title,
                    slug: c.slug,
                    type: "sub"
                }));
            }
        } else if ( type === "sub" ) {
            const productsInSubCategory  = await prismaClient.subCategory.findUnique({
                where: {
                    slug,
                },
                include: {
                    products: sort ? {
                        include: {
                            brand: true,
                        },
                        orderBy: {
                            productPrice: sort,
                        },
                    } : {
                        include: {
                            brand: true,
                        },
                    },
                }
            });
            if (productsInSubCategory) {
                products = productsInSubCategory.products;
                categories = [];
            }
        }
        return {
            products,
            categories
        }
    } catch (err) {
        console.error("Failed to get products or categories:",err);
        return null;
    }
}