import { ISidebarLink } from "@/type/types";
import { BarChart4, Boxes, Cable, CircleDollarSign, Home, Layers, Presentation, Settings, Users } from "lucide-react";

export const sidebarLinks: ISidebarLink[] = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      dropdown: false,
    },
    {
      label: 'User Management',
      href: '#',
      icon: Users,
      dropdown: true,
      dropdownMenu: [
        {
          label: 'Users',
          href: '/dashboard/users',
        },
        {
          label: 'Roles',
          href: '/dashboard/users/roles',
        },
      ]
    },
    {
      label: 'Inventory',
      href: '#',
      icon: Layers,
      dropdown: true,
      dropdownMenu: [
        {
          label: 'Categories',
          href: '/dashboard/inventory/categories',
        },
        {
          label: 'Brands',
          href: '/dashboard/inventory/brands',
        },
        {
          label: 'Units',
          href: '/dashboard/inventory/units',
        },
        {
          label: 'Products',
          href: '/dashboard/inventory/products',
        },
        {
          label: 'Warehouses',
          href: '/dashboard/inventory/warehouses',
        },
        {
          label: 'Suppliers',
          href: '/dashboard/inventory/suppliers',
        },
      ]
    },
    {
      label: 'Sales',
      href: '#',
      icon: CircleDollarSign,
      dropdown: true,
      dropdownMenu: [
        {
          label: 'Sales',
          href: '/dashboard/sales',
        },
        {
          label: 'Payments',
          href: '/dashboard/sales/payments',
        },
        {
          label: 'Quotations',
          href: '/dashboard/sales/quotations',
        },
        {
          label: 'Customers',
          href: '/dashboard/sales/customers',
        },
      ]
    },
    {
      label: 'POS',
      href: '/dashboard/pos',
      icon: Presentation,
      dropdown: false,
    },
    {
      label: 'Stocks',
      href: '#',
      icon: Boxes,
      dropdown: true,
      dropdownMenu: [
        {
          label: 'Stock Transfer',
          href: '/dashboard/stocks/stock-transfer',
        },
        {
          label: 'Stock Adjustments',
          href: '/dashboard/stocks/stock-adjustments',
        },
      ]
    },
    {
      label: 'Integration',
      href: '/dashboard/integration',
      icon: Cable,
      dropdown: false,
    },
    {
      label: 'Settings',
      href: '/dashboard/settings',
      icon: Settings,
      dropdown: false,
    },
    {
      label: 'Report',
      href: '/dashboard/report',
      icon: BarChart4,
      dropdown: false,
    },
  ]