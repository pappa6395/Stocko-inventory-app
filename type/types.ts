
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface ISidebarLink {
    label: string;
    href?: string;
    icon: React.FC<LucideProps>;
    dropdown: boolean;
    dropdownMenu?: DropdownMenuProps[]
}

export interface DropdownMenuProps {
    label: string;
    href: string;
}

export type CategoryProps = {
    title: string;
    slug: string;
    description: string;
    imageUrl: string | null;
    status: boolean;
}

export type SelectOptionProps = {
    label: string;
    value: number | string | boolean
}

export type ExcelCategoryProps = {
    Image: string;
    Title: string;
}

export type BrandProps = {
    title: string;
    slug: string;
    status: boolean;
    imageUrl: string | null;
}

export type UnitProps = {
    title: string;
    abbreviation: string;
}

export type WarehouseProps = {
    name: string;
    slug: string;
    imageUrl: string | null;
    phone: string;
    email: string;
    country: string;
    city: string;
    zipCode: string;
    contactPerson: string;
    status: boolean;
}

export type SupplierProps = {
    name: string;
    slug: string;
    imageUrl: string | null;
    companyName: string;
    vatNumber: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    status: boolean;

}

export type ProductProps = {
    name: string;
    slug: string;
    productCode: number;
    status: boolean;
    stockQty: number;

    codeSymbology: string;
    saleUnit?: number;

    brandId: number;
    categoryId: number;
    supplierId: number;
    unitId: number;

    batchNumber: string;
    expiryDate: string;
    isFeatured: boolean;

    productCost: number;
    productPrice: number;
    alertQuantity: number;
    productTax: number;
    taxMethod: string;

    barcodeImageUrl: string;
    productImages: string[];
    productThumbnail: string | null;
    
    productDetails: string;
}

export type BannerProps = {
    imageUrl: string;
    bannerLink: string;
    position: string;
    status: boolean;
}

export type WarehouseProductProps = {
    warehouseId: number;
    productId: number;
}

// Realationships
/**
 *  Category => One to Many => a category has many products
 *  Warehouse => many to many => Many warehouses have many products / Products have many warehouses
 *  Brands => one to many => a brand has many products
 *  Unit => one to many => a unit has many products
 *  Supplier => one to many => a supplier has many products
 */

export type SelectOptionsProps = {
    label: string;
    value: string;
};

export interface RoleProps {
    displayTitle: string;
    roleTitle: string;
    description: string;
  
    canViewBrands: boolean;
    canAddBrands: boolean;
    canEditBrands: boolean;
    canDeleteBrands: boolean;
  
    canViewCategories: boolean;
    canAddCategories: boolean;
    canEditCategories: boolean;
    canDeleteCategories: boolean;
  
    canViewProducts: boolean;
    canAddProducts: boolean;
    canEditProducts: boolean;
    canDeleteProducts: boolean;
  
    canAccessDashboard: boolean;
    canManageRoles: boolean;
    canManageUnits: boolean;
  
    canViewUsers: boolean;
    canAddUsers: boolean;
    canEditUsers: boolean;
    canDeleteUsers: boolean;
  
    canViewWarehouses: boolean;
    canAddWarehouses: boolean;
    canEditWarehouses: boolean;
    canDeleteWarehouses: boolean;
  
    canViewSuppliers: boolean;
    canAddSuppliers: boolean;
    canEditSuppliers: boolean;
    canDeleteSuppliers: boolean;
}

export interface UserProps {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    name: string;
    phone: string;
    profileImage: string | null;
    inviteSent: boolean;
    // Foreign key to Role
    roleId: number;
  
    status: boolean;
}

export type LoginProps = {
    email: string;
    password: string;
}

export type ChangePasswordProps = {
    password: string;
    confirmPassword: string;
    roleId: number;
    email: string;
    userId: number;
}