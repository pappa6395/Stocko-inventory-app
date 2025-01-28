"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import FormHeader from './FormHeader'
import { useRouter } from 'next/navigation'
import Select from "react-tailwindcss-select";
import { useForm } from 'react-hook-form';
import { ProductProps } from '@/type/types'
import { generateSlug } from '@/lib/generateSlug'
import toast from 'react-hot-toast'
import SubmitButton from '@/components/global/FormInputs/SubmitButton'
import ImageInput from '@/components/global/FormInputs/ImageInput'
import { Brand, Category, Products, Supplier, Unit, Warehouse, WarehouseProduct } from '@prisma/client'
import TextInput from '@/components/global/FormInputs/TextInputForm'
import FormSelectInput from '@/components/global/FormInputs/FormSelectInput'
import { createProduct, updateProductById } from '@/actions/products'
import TextArea from '@/components/global/FormInputs/TextAreaInput'
import JsBarcode from 'jsbarcode'
import { Barcode, Binary } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'


type ProductFormProps = {
  initialData?: Products | null;
  editingId?: string;
  productCategories: Category[];
  productBrands: Brand[];
  productWarehouses: WarehouseProduct[];
  warehouses: Warehouse[];
  productSuppliers: Supplier[];
  productUnits: Unit[];
}

const ProductForm = ({
  initialData,
  editingId,
  productCategories,
  productBrands,
  productWarehouses,
  warehouses,
  productSuppliers,
  productUnits
}: ProductFormProps) => {
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductProps>({
    defaultValues: {
      
    }
    
  });

  const router = useRouter()
  const initialStatus = {
    value: initialData?.status ? true : false,
    label: initialData?.status ? "Active" : "Disabled"
  }
  const [status, setStatus] = useState<any>(initialStatus);

  const initialSymbology = initialData?.codeSymbology
  const [selectedSymbology, setSelectedSymbology] = useState<string>("CODE128");

  const initialProductTax = {
    value: initialData?.productTax || "",
    label: initialData?.productTax || "Product Tax",
  }
  const [selectedProductTax, setSelectedProductTax] = useState<any>(initialProductTax);

  const initialTaxMethod = {
    value: initialData?.taxMethod || "taxMethod",
    label: initialData?.taxMethod || "Tax Method",
  }
  const [selectedTaxMethod, setSelectedTaxMethod] = useState<any>(initialTaxMethod);

  const [file, setFile] = useState<File | null>(null);
  const initialImageUrl = initialData?.productThumbnail || null
  const [fileUrl, setFileUrl] = useState<string | null>(initialImageUrl);

  const initialProductCategoryId = initialData?.categoryId || "";
  const initialCategory = productCategories?.find(
    (item) => item.title === initialProductCategoryId
    );
  const [selectedMainCategory, setSelectedMainCategory] =
  useState<any>(initialCategory);

  const initialProductBrandId = initialData?.brandId || "";
  const initialBrand = productBrands?.find(
    (item) => item.title === initialProductBrandId
    );
  const [selectedBrand, setSelectedBrand] =
  useState<any>(initialBrand);

  const initialProductWarehouseId = initialData?.id || "";
  const initialWarehouse = productWarehouses?.find(
    (item) => item.warehouseId === initialProductWarehouseId
    );
  const [selectedWarehouse, setSelectedWarehouse] =
  useState<any>(initialWarehouse);

  const initialProductSupplierId = initialData?.supplierId || "";
  const initialSupplier = productSuppliers?.find(
    (item) => item.name === initialProductSupplierId
    );
  const [selectedSupplier, setSelectedSupplier] =
  useState<any>(initialSupplier);

  const initialProductUnitId = initialData?.unitId || "";
  const initialUnit = productUnits?.find(
    (item) => item.title === initialProductUnitId
    );
  const [selectedUnit, setSelectedUnit] =
  useState<any>(initialUnit);

  const [productCode, setProductCode] = useState<string>(String(initialData?.productCode || 987654321));
  const [barcodeImage, setBarcodeImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const options: any[] = [
    { value: true, label: "Active" },
    { value: false, label: "Disabled" },
  ];
  const symbologyOptions: any[] = [
    { value: "CODE128", label: "CODE128" },
    { value: "CODE39", label: "CODE39" },
    { value: "EAN13", label: "EAN13" },
    { value: "UPC", label: "UPC" },
  ];
  const productTaxOptions: any[] = [
    { value: 7, label: "VAT 7%" },
    { value: 10, label: "VAT 10%" },
  ];
  const taxMethodOptions: any[] = [
    { value: "monthly", label: "Monthly" },
    { value: "Annual", label: "Annually" },
  ];

  const categoryOptions = productCategories?.map((item) => {
    return {
      value: item.id.toString(),
      label: item.title,
    }
  });
  const brandOptions = productBrands?.map((item) => {
    return {
      value: item.id.toString(),
      label: item.title,
    }
  });
  const warehouseOptions = warehouses?.map((item) => {
    return {
      value: item.id.toString(),
      label: item.name,
    }
  });
  const supplierOptions = productSuppliers?.map((item) => {
    return {
      value: item.id.toString(),
      label: item.name,
    }
  });
  const unitOptions = productUnits?.map((item) => {
    return {
      value: item.id.toString(),
      label: `${item.title} (${item.abbreviation})`,
    }
  });

  // const [step, setStep] = useState(1)

  // const nextStep= () => {
  //     if (step < 3) {
  //         setStep((prev) => prev + 1)
  //     }
  // }
  // const prevStep = () => {
  //     if (step > 1) {
  //         setStep((prev) => prev - 1)
  //     }
  // }

  const saveProduct = async(data: ProductProps) => {
    
    try {
      setIsLoading(true);
      
      data.productThumbnail = fileUrl;
      data.status = status?.value as boolean;
      data.slug = generateSlug(data.name);
      if (editingId) {
        const updateSupplier = await updateProductById(editingId, data)
        console.log("Updated supplier:", updateSupplier);
        
        if (updateSupplier) {
          toast.success("Successfully updated");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/suppliers`);
        }
      } else {
        const newSupplier = await createProduct(data);
        
        if (newSupplier) {
          toast.success("Successfully created");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/suppliers`);
        }
      }
      
    } catch (error) {
        console.error("Failed to save or update supplier:", error);
    }
  }

  const handleBack = () => {
    router.back()
  };

  const generateProductCode = (): string => {
    const randomCode = Math.floor(100000000 + Math.random() * 900000000).toString(); // Ensure 9 digits
    return randomCode;
  };
  const generateEAN13Code = (): string => {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  };
  const generateUPCCode = (): string => {
    return Math.floor(10000000000 + Math.random() * 90000000000).toString();
  };

  const validateInput = (code: string, format: string): boolean => {
    if (format === "EAN13" && code.length !== 12) {
      console.error("EAN13 requires a 12-digit input.");
      return false;
    }
    if (format === "UPC" && code.length !== 11) {
      console.error("UPC requires an 11-digit input.");
      return false;
    }
    return true;
  };

  const generateBarcode = (code: string, symbology: string) => {

    try {
      const canvas = document.createElement("canvas");
        JsBarcode(canvas, code, {
          format: symbology,
          width: 2,
          height: 50,
          displayValue: true,
        }); 
      setBarcodeImage(canvas.toDataURL("image/png"));
    } catch (err) {
      console.error("Failed to generate code", err)
    }
    
  };

  const handleClick = () => {
    const newCode = selectedSymbology === "EAN13" 
    ? generateEAN13Code() 
    : selectedSymbology === "UPC" 
    ? generateUPCCode() 
    : generateProductCode();

    if (validateInput(newCode, selectedSymbology)) {
      setProductCode(newCode);
      generateBarcode(newCode, selectedSymbology);
    } else {
      alert("Invalid input for the selected format. Please try again.");
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductCode(e.target.value);
  }

  return (

    <div>
      <FormHeader title={"Product"} onClick={handleBack} editingId={editingId} />
      <div className='grid grid-cols-1 sm:grid-cols-12 py-4 w-full'>
        <div className='grid md:hidden px-4 col-span-full py-4 gap-4'>
          <ImageInput 
            title="Product Image"
            description="Update the Product image"
            fileUrl={fileUrl}
            setFileUrl={setFileUrl}
            file={file}
            setFile={setFile}
            isLoading={isLoading}
          /> 
        </div>  
        <form 
          onSubmit={handleSubmit(saveProduct)} 
          className='grid md:col-span-8 col-span-full gap-4'>
          <div className='space-y-4 px-4'>
            <Card>
                <CardHeader>
                    <CardTitle>Product Context</CardTitle>
                    <CardDescription>Update the product segments</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                          <div className="flex space-x-2 items-end">
                            <FormSelectInput
                            label="Categories"
                            options={categoryOptions}
                            option={selectedMainCategory}
                            setOption={setSelectedMainCategory}
                            toolTipText='Add new category'
                            href={"/dashboard/inventory/categories/new"}
                            />
                          </div>
                          <div className="flex space-x-2 items-end">
                            <FormSelectInput
                            label="Brands"
                            options={brandOptions}
                            option={selectedBrand}
                            setOption={setSelectedBrand}
                            toolTipText='Add new brand'
                            href={"/dashboard/inventory/brands/new"}
                            />
                          </div>
                          <div className="flex space-x-2 items-end">
                            <FormSelectInput
                            label="Warehouse"
                            options={warehouseOptions}
                            option={selectedWarehouse}
                            setOption={setSelectedWarehouse}
                            toolTipText='Add new warehouse'
                            href={"/dashboard/inventory/warehouses/new"}
                            />
                            
                          </div>
                          <div className="flex space-x-2 items-end">
                            <FormSelectInput
                            label="Supplier"
                            options={supplierOptions}
                            option={selectedSupplier}
                            setOption={setSelectedSupplier}
                            toolTipText='Add new supplier'
                            href={"/dashboard/inventory/suppliers/new"}
                            />
                          </div>
                          <div className="flex space-x-2 items-end">
                            <FormSelectInput
                            label="Unit"
                            options={unitOptions}
                            option={selectedUnit}
                            setOption={setSelectedUnit}
                            toolTipText='Add new unit'
                            href={"/dashboard/inventory/units/new"}
                            />
                          </div>
                          <div className="flex space-x-2 items-end">
                            <FormSelectInput
                            label="Status"
                            options={options}
                            option={status}
                            setOption={setStatus}
                            />
                          </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Product</CardTitle>
                    <CardDescription>Update the product details</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
                            <TextInput
                              register={register}
                              errors={errors}
                              label="Product Name"
                              name="name" 
                              toolTipText='Product name'
                            />
                        </div>
                        <div className="grid gap-3">
                          <TextArea
                            register={register}
                            errors={errors}
                            label="Description"
                            name="productDetails"
                          />
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                             <TextInput
                              register={register}
                              errors={errors}
                              label="Stock Quantity"
                              name="stockQty"
                              type="number"
                            />
                            <TextInput
                              register={register}
                              errors={errors}
                              label="Alert Quantity"
                              name="alertQuantity"
                              type="number"
                              toolTipText='To alert when stock is low quantity for refillment'
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                            {/* <FormSelectInput
                              label="Code Symbology"
                              options={symbologyOptions}
                              option={selectedSymbology}
                              setOption={setSelectedSymbology}
                            /> */}
                            <div className='flex flex-col gap-2'>
                              <Label>Select Symbology</Label>
                              <select
                                value={selectedSymbology}
                                onChange={(e) => setSelectedSymbology(e.target.value)}
                                className="block w-full rounded-md border-0 py-2 text-gray-900 
                                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                                focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm 
                                sm:leading-6 text-sm"
                              >
                                <option value="CODE128">CODE128</option>
                                <option value="CODE39">CODE39</option>
                                <option value="EAN13">EAN13</option>
                                <option value="UPC">UPC</option>
                              </select>
                            </div>
                            <div className='flex items-end gap-2'>
                              <div className='flex flex-col gap-2'>
                                <Label>Product Code</Label>
                                <input
                                  id="product-code"
                                  name="productCode"
                                  type="number"
                                  disabled={!productCode}
                                  value={productCode}
                                  onChange={handleChange}
                                  className='block w-full rounded-md border-0 py-2 
                                  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                                  placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                  focus:ring-indigo-600 sm:text-sm sm:leading-6 text-sm'
                                />
                              </div>
                              <div className='pb-1'>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size={"sm"}
                                  onClick={handleClick}
                                >
                                  <Binary className='' />
                                </Button>
                              </div>
                              {barcodeImage && (
                                <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline">
                                    <Barcode />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>Barcode</DialogTitle>
                                    <DialogDescription>
                                      Make changes to your profile here. Click save when you're done.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4 bg-slate-200 rounded-md justify-center">
                                    <img src={barcodeImage} alt="Barcode" className="mt-2 border rounded" />
                                    <p>Product Code: <strong>{productCode}</strong></p>
                                  </div>
                                  <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              )}
                            </div>
                            
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                            <TextInput
                              register={register}
                              errors={errors}
                              label="Product Cost"
                              name="productCost"
                              type="number"
                            />
                            <TextInput
                              register={register}
                              errors={errors}
                              label="Product Price"
                              name="productPrice"
                              type="number"
                            />  
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                            <FormSelectInput
                              label="Product Tax"
                              options={productTaxOptions}
                              option={selectedProductTax}
                              setOption={setSelectedProductTax}
                            />
                            <FormSelectInput
                              label="Tax Method"
                              options={taxMethodOptions}
                              option={selectedTaxMethod}
                              setOption={setSelectedTaxMethod}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className='grid py-6 translate-y-10'>
              <div className='flex justify-between gap-4'>
                <Button
                  type='button'
                  onClick={handleBack} 
                  variant={"outline"} 
                  size="lg"
                >
                  Discard
                </Button>
                <SubmitButton
                  size={"sm"}
                  title={editingId ? "Update Supplier" : "Save Supplier"}
                  loading={isLoading}
                />
              </div>
            </div>
          </div>
        </form>
        <div className='hidden md:grid sm:col-span-4 col-span-full space-y-6'>
          <ImageInput 
            title="Product Image"
            description="Update the product image"
            fileUrl={fileUrl}
            setFileUrl={setFileUrl}
            file={file}
            setFile={setFile}
            isLoading={isLoading}
          /> 
        </div>  
      </div>
    </div>
    
  )
}

export default ProductForm