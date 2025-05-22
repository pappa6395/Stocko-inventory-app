
import { 
    AdvertSize, 
    Brand, 
    Category, 
    Customers, 
    LineOrder, 
    LineOrderItem, 
    MainCategory, 
    Products, 
    PurchaseOrderItem, 
    PurchaseOrderStatus, 
    Role,
    Sale, 
    SubCategory, 
    Supplier, 
    User,
    PurchaseOrder as PrismaPurchaseOrder
} from "@prisma/client";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface ISidebarLink {
    label: string;
    href?: string;
    icon: React.FC<LucideProps>;
    dropdown: boolean;
    access: string;
    dropdownMenu?: DropdownMenuProps[]
}

export interface DropdownMenuProps {
    label: string;
    href: string;
    access: string;
}

export type CategoryProps = {
    title: string;
    slug: string;
    description: string;
    imageUrl: string | null;
    status: boolean;
    mainCategoryId: number
}

export type MainCategoryProps = {
    title: string;
    slug: string;
}

export type SubCategoryProps = {
    title: string;
    slug: string;
    categoryId: number;
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
    subCategoryId: number;
    supplierId: number;
    unitId: number;

    batchNumber: string;
    expiryDate: string;
    isFeatured: boolean;

    productCost: number;
    productPrice: number;
    supplierPrice: number;
    alertQuantity: number;
    productTax: number;
    taxMethod: string;

    barcodeImageUrl: string;
    productImages: string[];
    productThumbnail: string | null;
    
    productDetails: string;
    content?: string;
}

export type BannerProps = {
    title: string;
    imageUrl: string | null;
    bannerLink: string;
    position: string;
    status: boolean;
}

export type AdvertProps = {
    title: string;
    imageUrl: string | null;
    advertLink: string;
    position: string;
    status: boolean;
    size: AdvertSize;
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
    value: string | number | boolean;
};

export interface RoleProps {
    displayTitle: string;
    roleTitle: string;
    description: string;
  
    canViewDashboard: boolean;
    canViewUsers: boolean;
    canAddUsers: boolean;
    canEditUsers: boolean;
    canDeleteUsers: boolean;
    canViewRoles: boolean;
    canAddRoles: boolean;
    canEditRoles: boolean;
    canDeleteRoles: boolean;
    canViewSales: boolean;
    canAddSales: boolean;
    canEditSales: boolean;
    canDeleteSales: boolean;
    canViewCustomers: boolean;
    canAddCustomers: boolean;
    canEditCustomers: boolean;
    canDeleteCustomers: boolean;
    canViewOrders: boolean;
    canAddOrders: boolean;
    canEditOrders: boolean;
    canDeleteOrders: boolean;
    canViewPos: boolean;
    canViewStockPurchase: boolean;
    canAddStockTransfer: boolean;
    canEditStockTransfer: boolean;
    canDeleteStockTransfer: boolean;
    canViewStockAdjustment: boolean;
    canAddStockAdjustment: boolean;
    canEditStockAdjustment: boolean;
    canDeleteStockAdjustment: boolean;
    canViewApi: boolean;
    canViewReports: boolean;
    canViewSettings: boolean;
    canViewMainCategories: boolean;
    canAddMainCategories: boolean;
    canEditMainCategories: boolean;
    canDeleteMainCategories: boolean;
    canViewCategories: boolean;
    canAddCategories: boolean;
    canEditCategories: boolean;
    canDeleteCategories: boolean;
    canViewSubCategories: boolean;
    canAddSubCategories: boolean;
    canEditSubCategories: boolean;
    canDeleteSubCategories: boolean;
    canViewBrands: boolean;
    canAddBrands: boolean;
    canEditBrands: boolean;
    canDeleteBrands: boolean;
    canViewAdverts: boolean;
    canAddAdverts: boolean;
    canEditAdverts: boolean;
    canDeleteAdverts: boolean;
    canViewBanners: boolean;
    canAddBanners: boolean;
    canEditBanners: boolean;
    canDeleteBanners: boolean;
    canViewUnits: boolean;
    canAddUnits: boolean;
    canEditUnits: boolean;
    canDeleteUnits: boolean;
    canViewProducts: boolean;
    canAddProducts: boolean;
    canEditProducts: boolean;
    canDeleteProducts: boolean;
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

export interface IUser extends User {
  role: Role;
}

export interface ICustomer extends Customers {
    user: IUser
}

export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profileImage: string | null;
    createdAt: Date;
}

export interface IPurchaseOrder extends PrismaPurchaseOrder {
  supplier: Supplier;
  items: PurchaseOrderItem[];
}

export interface ICategory extends Category {
    mainCategory: MainCategory,
}

export interface ISubCategory extends SubCategory {
    category: Category
}

export interface IProducts extends Products {
    id: number;
    name: string;
    subCategory: SubCategory;
    brand: Brand;
}

export interface SBProducts extends Products {
    brand: Brand;
    sale: Sale[];
}

export type ReceiptProps = {
    imageUrl: string;
    email: string;
}

// export type BannerProps = {
//     title: string;
//     link: string;
//     imageUrl: string;
// }

export type GroupProducts = {
    subCategory: SubCategory;
    brand?: Brand;
    products: Products[];
}

export interface FeedbackProps {
    title: string;
    message: string;
    orderItemIds: number[];
    userId: number;
}

export interface ILineOrder extends LineOrder {
    lineOrderItems: LineOrderItem[];
}

export type AdjustmentProps = {
  reason: string;
};

export interface OrderCustomer {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  profileImage: string | null;
  createdAt: Date;
  id: number;
}

export interface PurchaseItem {
  productId: number;
  quantity: number;
  currentStock: number;
  productName: string;
  productCost: number;
  subTotal: number;
}

export type PurchaseOrderProps = {
  status: PurchaseOrderStatus;
  discount: number;
  tax: number;
  shippingCost: number;
  totalAmount: number;
  balanceAmount: number;
  notes: string; // You can update this as needed
  items: PurchaseItem[];
  supplierId: number;
};

export type SearchProduct = {
  name: string;
  slug: string;
  productThumbnail: string;
  type: string;
  id?: string;
};

export type ProductResult = {
  id: string;
  name: string;
  slug: string;
  stockQty: number;
  productCost: number;
  productPrice: number;
  productThumbnail: string;
};