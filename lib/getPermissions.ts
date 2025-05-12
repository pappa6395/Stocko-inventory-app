import { Role } from "@prisma/client";

type RolePermissions = {
  [key: string]: boolean;
};

export const getRolePermissions = (role: Role): RolePermissions => {
  return {
    canViewBrands: role.canViewBrands,
    canAddBrands: role.canAddBrands,
    canEditBrands: role.canEditBrands,
    canDeleteBrands: role.canDeleteBrands,

    canViewCategories: role.canViewCategories,
    canAddCategories: role.canAddCategories,
    canEditCategories: role.canEditCategories,
    canDeleteCategories: role.canDeleteCategories,

    canViewProducts: role.canViewProducts,
    canAddProducts: role.canAddProducts,
    canEditProducts: role.canEditProducts,
    canDeleteProducts: role.canDeleteProducts,

    canAccessDashboard: role.canAccessDashboard,
    canManageRoles: role.canManageRoles,
    canManageUnits: role.canManageUnits,

    canViewUsers: role.canViewUsers,
    canAddUsers: role.canAddUsers,
    canEditUsers: role.canEditUsers,
    canDeleteUsers: role.canDeleteUsers,

    canViewWarehouses: role.canViewWarehouses,
    canAddWarehouses: role.canAddWarehouses,
    canEditWarehouses: role.canEditWarehouses,
    canDeleteWarehouses: role.canDeleteWarehouses,

    canViewSuppliers: role.canViewSuppliers,
    canAddSuppliers: role.canAddSuppliers,
    canEditSuppliers: role.canEditSuppliers,
    canDeleteSuppliers: role.canDeleteSuppliers,

    // Add as many permissions
  };
};
