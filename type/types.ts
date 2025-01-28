
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
    saleUnit?: string;

    warehouseId: string;
    brandId: number;
    categoryId: number;
    unitId: number;
    supplierId: number;

    productCost: number;
    productPrice: number;
    alertQuantity: number;
    productTax: number;
    taxMethod: string;
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