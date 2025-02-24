"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, Pencil, Trash, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { deleteCategoryById } from "@/actions/category";
import { deleteBrandById } from "@/actions/brand";
import { deleteWarehouseById } from "@/actions/warehouses";
import { deleteSupplierById } from "@/actions/suppliers";
import { deleteUnitById } from "@/actions/units";
import { deleteProductById } from "@/actions/products";
import { deleteRoleById } from "@/actions/roles";
import { deleteUserById } from "@/actions/users";
import { deleteMainCategoryById } from "@/actions/main-categories";
import { deleteSubCategoryById } from "@/actions/subCategories";
import { deleteBannerById } from "@/actions/banners";
import { deleteAdvertById } from "@/actions/adverts";
 
type ActionColumnProps = {
  row: any;
  model: any;
  editEndpoint: string;
  id: number | undefined;
  revPath?: string;
};
export default function ActionColumn({
  row,
  model,
  editEndpoint,
  id = 0,
}: ActionColumnProps) {

  const isActive = row.isActive;

  async function handleDelete() {
    try {
      if (model === "category") {
        const res = await deleteCategoryById(id);
        if (res?.ok) {
          window.location.reload();
        }
        toast.success(`${model} Deleted Successfully`);
      } else if (model === "mainCategory") {
        const res = await deleteMainCategoryById(id);
        if (res?.ok) {
          window.location.reload();
        }
        toast.success(`${model} Deleted Successfully`);
      } else if (model === "subCategory") {
        const res = await deleteSubCategoryById(id);
        if (res?.ok) {
          window.location.reload();
        }
        toast.success(`${model} Deleted Successfully`);
      } else if (model === "brand") {
        const res = await deleteBrandById(id);
        if (res?.ok) {
          window.location.reload();
        }
        toast.success(`${model} Deleted Successfully`);
      } else if (model === "banner") {
        const res = await deleteBannerById(id);
        if (res?.ok) {
          window.location.reload();
        }
        toast.success(`${model} Deleted Successfully`);
      } else if (model === "advert") {
        const res = await deleteAdvertById(id);
        if (res?.ok) {
          window.location.reload();
        }
        toast.success(`${model} Deleted Successfully`);
      } else if (model === "warehouse") {
        const res = await deleteWarehouseById(id);
        if (res?.ok) {
          window.location.reload();
        }
        toast.success(`${model} Deleted Successfully`);
      } else if (model === "supplier") {
        const res = await deleteSupplierById(id);
        if (res?.ok) {
          window.location.reload();
        }
        toast.success(`${model} Deleted Successfully`);
      } else if (model === "unit") {
        const res = await deleteUnitById(id);
        if (res?.ok) {
          window.location.reload();
        }
        toast.success(`${model} Deleted Successfully`);
      } else if (model === "product") {
        const res = await deleteProductById(id);
        if (res?.ok) {
          window.location.reload();
        }
        toast.success(`${model} Deleted Successfully`);
      } else if (model === "role") {
        const res = await deleteRoleById(id);
        if (res?.ok) {
          window.location.reload();
        }
        toast.success(`${model} Deleted Successfully`);
      } else if (model === "user") {
        const res = await deleteUserById(id);
        if (res?.ok) {
          window.location.reload();
        }
        toast.success(`${model} Deleted Successfully`);
      } 
    } catch (error) {
      console.log(error);
      toast.error("Category Couldn't be deleted");
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            {/* <DropdownMenuItem className="text-red-600 hover:text-red-700 transition-all duration-500 cursor-pointer">
              
            </DropdownMenuItem> */}
            <Button
              variant={"ghost"}
              size={"sm"}
              className="text-red-600 hover:text-red-700 transition-all duration-500 cursor-pointer "
            >
              <Trash2 className="w-4 h-4 flex-shrink-0" />
              <span>Delete</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this{" "}
                {model}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button variant={"destructive"} onClick={() => handleDelete()}>
                Permanently Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {/* <DropdownMenuItem
          className="text-red-600 hover:text-red-700 transition-all duration-500 cursor-pointer"
          onClick={() => handleDelete()}
        >
          <Trash className="w-4 h-4  mr-2 flex-shrink-0" />
          <span>Delete</span>
        </DropdownMenuItem> */}
        <DropdownMenuItem>
          <Link href={editEndpoint} className="flex items-center ml-1">
            <Pencil className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>Edit</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}