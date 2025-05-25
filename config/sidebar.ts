//import { ISidebarLink } from "@/type/types";
//import { BarChart2, BarChart4, Boxes, Cable, CircleDollarSign, Home, Layers, Presentation, Settings, Users } from "lucide-react";

// export const sidebarLinks: ISidebarLink[] = [
//     {
//       label: 'Dashboard',
//       href: '/dashboard',
//       icon: Home,
//       dropdown: false,
//     },
//     {
//       label: 'User Management',
//       href: '/dashboard/users',
//       icon: Users,
//       dropdown: true,
//       dropdownMenu: [
//         {
//           label: 'Users',
//           href: '/dashboard/users',
//         },
//         {
//           label: 'Roles',
//           href: '/dashboard/users/roles',
//         },
//       ]
//     },
//     {
//       label: 'Inventory',
//       href: '/dashboard/inventory/products',
//       icon: Layers,
//       dropdown: true,
//       dropdownMenu: [
//         {
//           label: 'Main Categories',
//           href: '/dashboard/inventory/main-categories',
//         },
//         {
//           label: 'Categories',
//           href: '/dashboard/inventory/categories',
//         },
//         {
//           label: 'SubCategories',
//           href: '/dashboard/inventory/subcategories',
//         },
//         {
//           label: 'Brands',
//           href: '/dashboard/inventory/brands',
//         },
//         {
//           label: 'Banners',
//           href: '/dashboard/inventory/banners',
//         },
//         {
//           label: 'Adverts',
//           href: '/dashboard/inventory/adverts',
//         },
//         {
//           label: 'Units',
//           href: '/dashboard/inventory/units',
//         },
//         {
//           label: 'Products',
//           href: '/dashboard/inventory/products',
//         },
//         {
//           label: 'Warehouses',
//           href: '/dashboard/inventory/warehouses',
//         },
//         {
//           label: 'Suppliers',
//           href: '/dashboard/inventory/suppliers',
//         },
//       ]
//     },
//     {
//       label: 'Sales',
//       href: '/dashboard/sales',
//       icon: CircleDollarSign,
//       dropdown: true,
//       dropdownMenu: [
//         {
//           label: 'Sales',
//           href: '/dashboard/sales',
//         },
//         // {
//         //   label: 'Payments',
//         //   href: '/dashboard/sales/payments',
//         // },
//         // {
//         //   label: 'Quotations',
//         //   href: '/dashboard/sales/quotations',
//         // },
//         {
//           label: 'Customers',
//           href: '/dashboard/sales/customers',
//         },
//       ]
//     },
//     {
//       label: 'Orders',
//       href: '/dashboard/orders',
//       icon: BarChart2,
//       dropdown: false,
//     },
//     {
//       label: 'POS',
//       href: '/pos',
//       icon: Presentation,
//       dropdown: false,
//     },
//     {
//       label: 'Stocks',
//       href: '/dashboard/stocks',
//       icon: Boxes,
//       dropdown: true,
//       dropdownMenu: [
//         {
//           label: 'Stock Transfer',
//           href: '/dashboard/stocks/transfer',
//         },
//         {
//           label: 'Stock Adjustments',
//           href: '/dashboard/stocks/adjustments',
//         },
//       ]
//     },
//     {
//       label: 'API Integrations',
//       href: '/dashboard/api',
//       icon: Cable,
//       dropdown: false,
//     },
//     {
//       label: 'Settings',
//       href: '/dashboard/settings',
//       icon: Settings,
//       dropdown: false,
//     },
//     {
//       label: 'Report',
//       href: '/dashboard/report',
//       icon: BarChart4,
//       dropdown: false,
//     },
// ]

import { ISidebarLink } from "@/type/types";
import {
  BaggageClaim,
  BarChart2,
  BarChart4,
  Bell,
  Cable,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  FolderTree,
  Home,
  LineChart,
  Package,
  Package2,
  Plus,
  Power,
  Presentation,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";

export const sidebarLinks: ISidebarLink[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
    dropdown: false,
    access: "canViewDashboard",
  },
  {
    label: "Users",
    icon: Users,
    href: "/dashboard/users",
    dropdown: true,
    access: "canViewUsers",
    dropdownMenu: [
      {
        label: "Users",
        href: "/dashboard/users",
        access: "canViewUsers",
      },
      {
        label: "Roles",
        href: "/dashboard/users/roles",
        access: "canViewRoles",
      },
    ],
  },
  {
    label: "Inventory",
    icon: BaggageClaim,
    dropdown: true,
    href: "/dashboard/inventory/products",
    access: "canViewProducts",
    dropdownMenu: [
      {
        label: "Main Categories",
        href: "/dashboard/inventory/main-categories",
        access: "canViewMainCategories",
      },
      {
        label: "Categories",
        href: "/dashboard/inventory/categories",
        access: "canViewCategories",
      },
      {
        label: "Sub Categories",
        href: "/dashboard/inventory/sub-categories",
        access: "canViewSubCategories",
      },
      {
        label: "Brands",
        href: "/dashboard/inventory/brands",
        access: "canViewBrands",
      },
      {
        label: "Adverts",
        href: "/dashboard/inventory/adverts",
        access: "canViewAdverts",
      },
      {
        label: "Banners",
        href: "/dashboard/inventory/banners",
        access: "canViewBanners",
      },
      {
        label: "Units",
        href: "/dashboard/inventory/units",
        access: "canViewUnits",
      },
      {
        label: "Products",
        href: "/dashboard/inventory/products",
        access: "canViewProducts",
      },
      {
        label: "Warehouse",
        href: "/dashboard/inventory/warehouse",
        access: "canViewWarehouses",
      },
      {
        label: "Suppliers",
        href: "/dashboard/inventory/suppliers",
        access: "canViewSuppliers",
      },
    ],
  },
  {
    label: "Sales",
    icon: CircleDollarSign,
    dropdown: true,
    href: "/dashboard/sales",
    access: "canViewSales",
    dropdownMenu: [
      {
        label: "Sales",
        href: "/dashboard/sales",
        access: "canViewSales",
      },
      {
        label: "Customers",
        href: "/dashboard/sales/customers",
        access: "canViewCustomers",
      },
    ],
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
    icon: BarChart2,
    dropdown: false,
    access: "canViewOrders",
  },
  {
    label: "POS",
    href: "/pos",
    icon: Presentation,
    dropdown: false,
    access: "canViewPos",
  },
  {
    label: "Stock",
    icon: FolderTree,
    dropdown: true,
    href: "/dashboard/stock/purchase",
    access: "canViewStockPurchase",
    dropdownMenu: [
      {
        label: "Stock Purchase",
        href: "/dashboard/stock/purchase",
        access: "canViewStockPurchase",
      },
      {
        label: "Stock Adjustment",
        href: "/dashboard/stock/adjustment",
        access: "canViewStockAdjustment",
      },
    ],
  },
  {
    label: "API Integrations",
    href: "/dashboard/api",
    icon: Cable,
    dropdown: false,
    access: "canViewApi",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    dropdown: false,
    access: "canViewSettings",
  },
  {
    label: "Reports",
    icon: BarChart4,
    dropdown: true,
    href: "/dashboard/reports/products",
    access: "canViewReports",
    dropdownMenu: [
      {
        label: "Product Report",
        href: "/dashboard/reports/products",
        access: "canViewProducts",
      },
      {
        label: "Inventory Report",
        href: "/dashboard/reports/inventory",
        access: "canViewProducts",
      },
      {
        label: "Customers Report",
        href: "/dashboard/reports/customers",
        access: "canViewCustomers",
      },
    ],
  },
];