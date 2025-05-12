"use server";

import { prismaClient } from "@/lib/db";
import { createBulkUsers } from "./users";

async function seedDatabase() {
  // Seed MainCategory
  const mainCategory1 = await prismaClient.mainCategory.create({
    data: {
      title: "Electronics",
      slug: "electronics",
      categories: {
        create: [
          {
            title: "Phones",
            slug: "phones",
            description: "Various kinds of phones",
            imageUrl: "/placeholder.svg",
            status: true,
            subCategories: {
              create: [
                {
                  title: "Smartphones",
                  slug: "smartphones",
                  products: {
                    create: [
                      {
                        name: "iPhone 12",
                        slug: "iphone-12",
                        productCode: 10001,
                        stockQty: 50,
                        productCost: 699.99,
                        productPrice: 999.99,
                        alertQuantity: 5,
                        productTax: 7.5,
                        taxMethod: "inclusive",
                        productImages: ["/placeholder.svg"],
                        status: true,
                        productThumbnail: "/placeholder.svg",
                        productDetails: "Latest iPhone model",
                        batchNumber: "12345",
                        expiryDate: new Date("2025-01-01"),
                        brandId: 1,
                        unitId: 1,
                        supplierId: 1,
                        codeSymbology: "ISO-8859-1",
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  const mainCategory2 = await prismaClient.mainCategory.create({
    data: {
      title: "Fashion",
      slug: "fashion",
      categories: {
        create: [
          {
            title: "Men",
            slug: "men",
            description: "Men's clothing and accessories",
            imageUrl: "/placeholder.svg",
            status: true,
            subCategories: {
              create: [
                {
                  title: "Shirts",
                  slug: "shirts",
                  products: {
                    create: [
                      {
                        name: "Formal Shirt",
                        slug: "formal-shirt",
                        productCode: 1001,
                        stockQty: 100,
                        productCost: 20.0,
                        productPrice: 40.0,
                        alertQuantity: 10,
                        productTax: 5.0,
                        taxMethod: "exclusive",
                        productImages: ["/placeholder.svg"],
                        status: true,
                        productThumbnail: "/placeholder.svg",
                        productDetails: "Men's formal shirt",
                        batchNumber: "54321",
                        expiryDate: new Date("2026-01-01"),
                        brandId: 2,
                        unitId: 2,
                        supplierId: 2,
                        codeSymbology: "Standard"
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });

  await prismaClient.brand.createMany({
    data: [
        {
            title: "Apple",
            slug: "apple",
            status: true,
            imageUrl: "/placeholder.svg",
        },
        {
            title: "Brand X",
            slug: "brand-x",
            status: true,
            imageUrl: "/placeholder.svg",
        },
    ]
  })

  await prismaClient.unit.createMany({
    data: [
        {
            title: "Piece",
            abbreviation: "pc",
        },
        {
            title: "Piece",
            abbreviation: "pc",
        },
    ]
  })

  await prismaClient.supplier.createMany({
    data: [
        {
            name: "Apple Supplier",
            imageUrl: "/placeholder.svg",
            companyName: "Apple Inc",
            vatNumber: "123456789",
            email: "apple@supplier.com",
            phone: "1234567890",
            address: "1 Apple Park Way",
            city: "Cupertino",
            state: "CA",
            postalCode: "95014",
            country: "USA",
            status: true,
            slug: "apple-supplier"
        },
        {
            name: "Fashion Supplier",
            imageUrl: "/placeholder.svg",
            companyName: "Fashion Inc",
            vatNumber: "987654321",
            email: "fashion@supplier.com",
            phone: "0987654321",
            address: "123 Fashion St",
            city: "New York",
            state: "NY",
            postalCode: "10001",
            country: "USA",
            status: true,
            slug: "fashion-supplier"
        },
    ]
  })

  // Seed Banner
  await prismaClient.banner.createMany({
    data: [
      {
        title: "Big Sale",
        imageUrl: "/placeholder.svg",
        bannerLink: "https://example.com/big-sale",
        status: true,
        position: "hero-left",
      },
      {
        title: "New Arrivals",
        imageUrl: "/placeholder.svg",
        bannerLink: "https://example.com/new-arrivals",
        status: true,
        position: "hero-right",
      },
    ],
  });

  // Seed Advert
  await prismaClient.advert.createMany({
    data: [
      {
        title: "Ad 1",
        imageUrl: "/placeholder.svg",
        status: true,
        advertLink: "https://example.com/ad-1",
        size: "MEDIUM",
        position: "hero-center"
      },
      {
        title: "Ad 2",
        imageUrl: "/placeholder.svg",
        status: true,
        advertLink: "https://example.com/ad-2",
        size: "LARGE",
        position: "sidebar-left"
      },
    ],
  });

  // Seed Brand
  await prismaClient.brand.createMany({
    data: [
      {
        title: "Nike",
        slug: "nike",
        status: true,
        imageUrl: "/placeholder.svg",
      },
      {
        title: "Adidas",
        slug: "adidas",
        status: true,
        imageUrl: "/placeholder.svg",
      },
    ],
  });

  // Seed Unit
  await prismaClient.unit.createMany({
    data: [
      {
        title: "Kilogram",
        abbreviation: "kg",
      },
      {
        title: "Liter",
        abbreviation: "l",
      },
    ],
  });
  // Seed Warehouse
  await prismaClient.warehouse.createMany({
    data: [
      {
        name: "Main Warehouse",
        slug: "main-warehouse",
        country: "USA",
        city: "New York",
        phone: "1234567890",
        imageUrl: "/placeholder.svg",
        contactPerson: "John Doe",
        email: "john.doe@example.com",
        status: true,
        zipCode: "10001",
      },
      {
        name: "Secondary Warehouse",
        slug: "secondary-warehouse",
        country: "USA",
        city: "Los Angeles",
        phone: "0987654321",
        imageUrl: "/placeholder.svg",
        contactPerson: "Jane Doe",
        email: "jane.doe@example.com",
        status: true,
        zipCode: "90001",
      },
    ],
  });
  // Seed Supplier
  await prismaClient.supplier.createMany({
    data: [
      {
        name: "Tech Supplies",
        imageUrl: "/placeholder.svg",
        companyName: "Tech Supplies Inc",
        vatNumber: "123456789",
        email: "techsupplies@example.com",
        phone: "1234567890",
        address: "123 Tech St",
        city: "San Francisco",
        state: "CA",
        postalCode: "94103",
        country: "USA",
        status: true,
        slug: "tech-supplies"
      },
      {
        name: "Fashion Supplies",
        imageUrl: "/placeholder.svg",
        companyName: "Fashion Supplies Inc",
        vatNumber: "987654321",
        email: "fashionsupplies@example.com",
        phone: "0987654321",
        address: "456 Fashion Ave",
        city: "New York",
        state: "NY",
        postalCode: "10018",
        country: "USA",
        status: true,
        slug: "fashion-supplies",
      },
    ],
  });
  // Seed Role
  await prismaClient.role.createMany({
    data: [
      {
        displayTitle: "Admin",
        roleTitle: "admin",
        description: "Administrator with full access",
        canViewBrands: true,
        canAddBrands: true,
        canEditBrands: true,
        canDeleteBrands: true,
        canViewCategories: true,
        canAddCategories: true,
        canEditCategories: true,
        canDeleteCategories: true,
        canViewProducts: true,
        canAddProducts: true,
        canEditProducts: true,
        canDeleteProducts: true,
        canAccessDashboard: true,
        canManageRoles: true,
        canManageUnits: true,
        canViewUsers: true,
        canAddUsers: true,
        canEditUsers: true,
        canDeleteUsers: true,
        canViewWarehouses: true,
        canAddWarehouses: true,
        canEditWarehouses: true,
        canDeleteWarehouses: true,
        canViewSuppliers: true,
        canAddSuppliers: true,
        canEditSuppliers: true,
        canDeleteSuppliers: true,
      },
      {
        displayTitle: "User",
        roleTitle: "user",
        description: "Regular user with limited access",
        canViewBrands: true,
        canAddBrands: false,
        canEditBrands: false,
        canDeleteBrands: false,
        canViewCategories: true,
        canAddCategories: false,
        canEditCategories: false,
        canDeleteCategories: false,
        canViewProducts: true,
        canAddProducts: false,
        canEditProducts: false,
        canDeleteProducts: false,
        canAccessDashboard: false,
        canManageRoles: false,
        canManageUnits: false,
        canViewUsers: false,
        canAddUsers: false,
        canEditUsers: false,
        canDeleteUsers: false,
        canViewWarehouses: false,
        canAddWarehouses: false,
        canEditWarehouses: false,
        canDeleteWarehouses: false,
        canViewSuppliers: false,
        canAddSuppliers: false,
        canEditSuppliers: false,
        canDeleteSuppliers: false,
      },
    ],
  });
  // Seed User
  const adminRole = await prismaClient.role.findUnique({
    where: {
        roleTitle: 'admin',
    }
  });
  const userRole = await prismaClient.role.findUnique({
    where: { 
        roleTitle: "user", 
    },
  });

  const users = await createBulkUsers([
    {
      email: "admin@example.com",
      password: "AdminPassword@123",
      firstName: "Admin",
      lastName: "User",
      name: "Admin User",
      phone: "1234567890",
      profileImage: "/placeholder.svg",
      roleId: adminRole!.id,
      status: true,
      confirmPassword: "AdminPassword@123",
      inviteSent: false
    },
    {
      email: "user@example.com",
      password: "UserPassword@123",
      firstName: "Regular",
      lastName: "User",
      name: "Regular User",
      phone: "0987654321",
      roleId: userRole!.id,
      profileImage: "/placeholder.svg",
      status: true,
      confirmPassword: "UserPassword@123",
      inviteSent: false
    },
  ]);
  // console.log(users);

  // Seed LineOrderItem
  // Note: We'll need to create a LineOrder and Product first to associate with LineOrderItem.
  const product = await prismaClient.products.findFirst();
  const lineOrder = await prismaClient.lineOrder.create({
    data: {
      customerName: "John Doe",
      orderNumber: "ORDER001",
      customerId: 103,
      status: "DELIVERED",
    },
  });

  await prismaClient.lineOrderItem.createMany({
    data: [
      {
        productId: product!.id,
        orderId: lineOrder.id,
        name: product!.name,
        price: product!.productPrice,
        qty: 1,
        productThumbnail: product!.productThumbnail ?? "",
      },
    ],
  });

  // Seed LineOrder
  await prismaClient.lineOrder.createMany({
    data: [
      {
        customerId: 101,
        customerName: "John Doe",
        orderNumber: "ORDER002",
        status: "PENDING",
      },
      {
        customerId: 102,
        customerName: "Jane Doe",
        orderNumber: "ORDER003",
        status: "PROCESSING",
      },
    ],
  });

  // Seed Sale
  await prismaClient.sale.createMany({
    data: [
      {
        orderId: lineOrder.id,
        productId: product!.id,
        qty: 1,
        salePrice: product!.productPrice,
        productName: product!.name,
        productImage: product!.productThumbnail ?? "",
        customerName: "John Doe",
      },
    ],
  });
  // Seed Customer
  const user = await prismaClient.user.findFirst();
  await prismaClient.customers.createMany({
    data: [
      {
        userId: user!.id,
        additionalInfo: "Preferred customer",
        billingAddress: "Billing address",
        shippingAddress: "Shipping address",
      },
    ],
  });
  await prismaClient.feedback.createMany({
    data: [
      {
        title: "Great product",
        message: "I really liked the product!",
        orderItemIds: [1001, 1002],
        userId: user!.id,
      },
      {
        title: "Not satisfied",
        message: "The product did not meet my expectations.",
        orderItemIds: [1003, 1004],
        userId: user!.id,
      },
    ],
  });
}
export async function seedData() {
  try {
    await seedDatabase();
  } catch (error) {
    console.log(error);
    return null;
  }
}
