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
import { createProduct, createWarehouseProduct, updateProductById } from '@/actions/products'
import TextArea from '@/components/global/FormInputs/TextAreaInput'
import JsBarcode from 'jsbarcode'
import { Barcode, Binary } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import BarcodeImageInput from '@/components/global/FormInputs/BarcodeImageInput'
import { base64ToFile } from '@/lib/base64ToFile'
import MultipleImageInput from '@/components/global/FormInputs/MultipleImageInput'


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
      name: initialData?.name || "Hello World",
      productCode: initialData?.productCode || 0,
      status: initialData?.status || false,
      stockQty: initialData?.stockQty || 100,
      saleUnit: initialData?.saleUnit || 0,
      productCost: initialData?.productCost || 50,
      productPrice: initialData?.productPrice || 100,
      alertQuantity: initialData?.alertQuantity || 20,
      productDetails: initialData?.productDetails || "Product details"
    }
    
  });

  const router = useRouter()
  const initialStatus = {
    value: initialData?.status ? true : false,
    label: initialData?.status ? "Active" : "Disabled"
  }
  const [status, setStatus] = useState<any>(initialStatus);

  const initialSymbology = initialData && initialData?.codeSymbology || "CODE128";
  const [selectedSymbology, setSelectedSymbology] = useState<string>(initialSymbology);

  const initialProductTax = initialData?.productTax || ""
  const [selectedProductTax, setSelectedProductTax] = useState<any>({
    value: initialProductTax,
  });

  const initialTaxMethod = initialData?.taxMethod || ""
  const [selectedTaxMethod, setSelectedTaxMethod] = useState<any>(initialTaxMethod);

  const [files, setFiles] = useState<File[]>([]);
  const initialImageUrls = initialData?.productImages || []
  const [fileUrls, setFileUrls] = useState<string[]>(initialImageUrls);

  const initialProductCategoryId = initialData?.categoryId || "";
  const initialCategory = productCategories?.find(
    (item) => item.title === initialProductCategoryId
  );
  const [selectedMainCategory, setSelectedMainCategory] =
  useState<any>(initialCategory?.id);

  const initialProductBrandId = initialData?.brandId || "";
  const initialBrand = productBrands?.find(
    (item) => item.title === initialProductBrandId
    );
  const [selectedBrand, setSelectedBrand] =
  useState<any>(initialBrand?.id);

  const initialProductWarehouseId = initialData?.id || "";
  const initialWarehouse = productWarehouses?.find(
    (item) => item.warehouseId === initialProductWarehouseId
    );
  const [selectedWarehouse, setSelectedWarehouse] =
  useState<any>(initialWarehouse?.warehouseId);

  const initialProductSupplierId = initialData?.supplierId || "";
  const initialSupplier = productSuppliers?.find(
    (item) => item.name === initialProductSupplierId
    );
  const [selectedSupplier, setSelectedSupplier] =useState<any>(initialSupplier?.id);

  const initialProductUnitId = initialData?.unitId || "";
  const initialUnit = productUnits?.find(
    (item) => item.title === initialProductUnitId
    );
  const [selectedUnit, setSelectedUnit] =
  useState<any>(initialUnit?.id);

  const [productCode, setProductCode] = useState<string>(String(initialData?.productCode || 0));
  const [barcodeImage, setBarcodeImage] = useState<string>("");
  const [barcodeUrl, setBarcodeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const options: any[] = [
    { value: true, label: "Active" },
    { value: false, label: "Disabled" },
  ];
  const productTaxOptions: any[] = [
    { value: 7, label: "VAT 7%" },
    { value: 10, label: "VAT 10%" },
  ];
  const taxMethodOptions: any[] = [
    { value: "exclusive", label: "Exclusive" },
    { value: "inclusive", label: "Inclusive" },
  ];

  const categoryOptions = productCategories?.map((item) => {
    return {
      value: item.title,
      label: item.title,
    }
  });
  const brandOptions = productBrands?.map((item) => {
    return {
      value: item.title,
      label: item.title,
    }
  });
  const warehouseOptions = warehouses?.map((item) => {
    return {
      value: item.name,
      label: item.name,
    }
  });
  const supplierOptions = productSuppliers?.map((item) => {
    return {
      value: item.name,
      label: item.name,
    }
  });
  const unitOptions = productUnits?.map((item) => {
    return {
      value: item.title,
      label: `${item.title} (${item.abbreviation})`,
    }
  });

  const [step, setStep] = useState(1)

  const nextStep= () => {
      if (step < 3) {
          setStep((prev) => prev + 1)
      }
  }
  const prevStep = () => {
      if (step > 1) {
          setStep((prev) => prev - 1)
      }
  }

  const saveProduct = async(data: ProductProps) => {

    setIsLoading(true);
    try {
      data.productImages = fileUrls;
      data.status = status?.value as boolean;
      data.slug = generateSlug(data.name);
      data.codeSymbology = selectedSymbology;
      data.taxMethod = selectedTaxMethod?.value as string;
      data.productTax = selectedProductTax?.value as number;
      data.productCode = Number(productCode);
      data.barCodeImageUrl = barcodeUrl;
      data.productCost = Number(data.productCost);
      data.productPrice = Number(data.productPrice);
      data.stockQty = Number(data.stockQty);
      data.alertQuantity = Number(data.alertQuantity);
      data.saleUnit = Number(data.saleUnit);

      const warehouseProductData = {
        warehouseId: Number(selectedWarehouse?.value || 0),
        productId: initialData?.id || 0,
      };

      console.log("Product Data:", data);
      setIsLoading(false);
      if (editingId) {
        const updateProduct = await updateProductById(editingId, data)
        console.log("Updated supplier:", updateProduct);
        
        if (updateProduct) {
          toast.success("Successfully updated");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/products`);
        }
      } else {
        const newProduct = await createProduct(data);
        const newWarehouseProduct = await createWarehouseProduct(warehouseProductData)
        if (newProduct) {
          toast.success("Successfully created");
          reset();
          setIsLoading(false);
          router.push(`/dashboard/inventory/products`);
        }
      }
      
    } catch (error) {
        console.error("Failed to save or update product:", error);
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
      <div className={cn(step === 1 ? 'grid grid-cols-1 sm:grid-cols-12 py-4 w-full' : "")}>
        {step === 2 ? "" : (
          <div className='grid md:hidden px-4 col-span-full py-4 gap-4'>
            <MultipleImageInput 
              title="Product Image"
              description="Update the Product image"
              fileUrls={fileUrls}
              setFileUrls={setFileUrls}
              files={files}
              setFiles={setFiles}
            />
          </div>  
        )}
        <form 
          onSubmit={handleSubmit(saveProduct)} 
          className={cn(step === 1 ? 'grid md:col-span-8 col-span-full gap-4' : 'grid grid-cols-1 md:grid-cols-12 py-4 w-full' )}>
          {step === 1 && (
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
                  <Button
                    type='button'
                    onClick={nextStep} 
                    variant={"default"} 
                    size="lg"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
              <div className='grid md:col-span-8 gap-4 col-span-full'>
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
                          <div className="grid md:grid-cols-2 gap-3">
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
                                      <BarcodeImageInput
                                        fileUrl={barcodeImage}
                                        setFileUrl={setBarcodeUrl}
                                        file={base64ToFile(barcodeImage, "barcode.png")}
                                        isLoading={isLoading}
                                        initialBarcode={initialData?.barcodeImageUrl || ""}
                                      />
                                      <p>Product Code: <strong>{productCode}</strong></p>
                                    </div>
                                    <DialogFooter>
                                      <DialogClose>
                                          <Badge className='py-2'>Close</Badge>
                                      </DialogClose>
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
                                unit="$"
                              />
                              <TextInput
                                register={register}
                                errors={errors}
                                label="Product Price"
                                name="productPrice"
                                type="number"
                                unit="$"
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
                <div className='hidden md:flex justify-between gap-4 py-4'>
                  <Button
                    type='button'
                    onClick={prevStep} 
                    variant={"outline"} 
                    size="lg"
                  >
                    Previous
                  </Button>
                  <SubmitButton
                    size={"sm"}
                    title={editingId ? "Update Product" : "Save Product"}
                    loading={isLoading}
                  />
                </div>
              </div>
            )}
          {step === 2 && (
            <div className='grid pt-4 md:pt-0 px-0 md:px-4 col-span-full md:col-span-4 gap-4 h-fit'>
              <Card>
                <CardHeader>
                    <CardTitle>Product Stock</CardTitle>
                    <CardDescription>Update the product stocks</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="grid gap-3">
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
                              label="Sale Unit"
                              name="saleUnit"
                              type="text"
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
                    </div>
                </CardContent>
              </Card>
              <div className='md:hidden flex justify-between gap-4 py-4'>
                  <Button
                    type='button'
                    onClick={prevStep} 
                    variant={"outline"} 
                    size="lg"
                  >
                    Previous
                  </Button>
                  <SubmitButton
                    size={"sm"}
                    title={editingId ? "Update Product" : "Save Product"}
                    loading={isLoading}
                  />
                </div>
            </div>
          )}
        </form>
        {step === 1 && (
          <div className='hidden md:grid px-4 col-span-4'>
            {/* <ImageInput 
              title="Product Image"
              description="Update the Product image"
              fileUrl={fileUrl}
              setFileUrl={setFileUrl}
              file={file}
              setFile={setFile}
              isLoading={isLoading}
            /> */}
            <MultipleImageInput 
              title="Product Image"
              description="Update the Product image"
              fileUrls={fileUrls}
              setFileUrls={setFileUrls}
              files={files}
              setFiles={setFiles}
            />
          </div>
          )}   
      </div>
    </div>
    
  )
}

export default ProductForm