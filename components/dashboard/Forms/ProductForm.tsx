"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import FormHeader from './FormHeader'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form';
import { ProductProps } from '@/type/types'
import { generateSlug } from '@/lib/generateSlug'
import toast from 'react-hot-toast'
import SubmitButton from '@/components/global/FormInputs/SubmitButton'
import { Brand, Category, Products, SubCategory, Supplier, Unit, Warehouse } from '@prisma/client'
import TextInput from '@/components/global/FormInputs/TextInputForm'
import FormSelectInput from '@/components/global/FormInputs/FormSelectInput'
import { createProduct, updateProductById } from '@/actions/products'
import TextArea from '@/components/global/FormInputs/TextAreaInput'
import JsBarcode from 'jsbarcode'
import { Barcode, Binary, ChevronLeft } from 'lucide-react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import BarcodeImageInput from '@/components/global/FormInputs/BarcodeImageInput'
import { base64ToFile } from '@/lib/base64ToFile'
import MultipleImageInput from '@/components/global/FormInputs/MultipleImageInput'
import Image from 'next/image'
import { convertDateToIso } from '@/lib/convertDatetoISO'
import { convertIsoToDateString } from '@/lib/convertISOtoDate'
import CloseBtn from '@/components/global/FormInputs/CloseBtn'
import dynamic from 'next/dynamic'
const QuillEditor = dynamic(
  () => import("@/components/global/FormInputs/QuillEditor"),
  {
    ssr: false,
  }
);


type ProductFormProps = {
  initialData?: Products | null;
  editingId?: string;
  productSubCategories: SubCategory[];
  productBrands: Brand[];
  productSuppliers: Supplier[];
  productUnits: Unit[];
}

const ProductForm = ({
  initialData,
  editingId,
  productSubCategories,
  productBrands,
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
      name: initialData?.name || "",
      stockQty: initialData?.stockQty || 50,
      saleUnit: initialData?.saleUnit || 0,
      productCost: initialData?.productCost || 50,
      productPrice: initialData?.productPrice || 100,
      alertQuantity: initialData?.alertQuantity || 10,
      productDetails: initialData?.productDetails || "",
      productTax: initialData?.productTax,
      taxMethod: initialData?.taxMethod || "Tax Method",
      batchNumber: initialData?.batchNumber || "",
      isFeatured: initialData?.isFeatured || false,
      expiryDate: convertIsoToDateString(initialData?.expiryDate || new Date()),
    }
  });

  const router = useRouter()

  // Categories
  const subCategoryOptions = productSubCategories?.map((item) => {
    return {
      value: item.id.toString(),
      label: item.title,
    }
  });
  const initialProductSubCategoryId = initialData?.subCategoryId || 0;
  const initialSubCategory = subCategoryOptions?.find(
    (item) => Number(item.value) === initialProductSubCategoryId);
  const [selectedSubCategory, setSelectedSubCategory] =
  useState<any>(initialSubCategory);

  // Brands
  const brandOptions = productBrands?.map((item) => {
    return {
      value: item.id.toString(),
      label: item.title,
    }
  });
  const initialProductBrandId = initialData?.brandId || 0;
  const initialBrand = brandOptions?.find(
    (item) => Number(item.value) === initialProductBrandId
    );
  const [selectedBrand, setSelectedBrand] =
  useState<any>(initialBrand);

  // Suppliers
  const supplierOptions = productSuppliers?.map((item) => {
    return {
      value: item.id.toString(),
      label: item.name,
    }
  });
  const initialProductSupplierId = initialData?.supplierId || 0;
  const initialSupplier = supplierOptions?.find(
    (item) => Number(item.value) === initialProductSupplierId
  );
  const [selectedSupplier, setSelectedSupplier] = 
  useState<any>(initialSupplier);

  // Units
  const unitOptions = productUnits?.map((item) => {
    return {
      value: item.id.toString(),
      label: `${item.title} (${item.abbreviation})`,
    }
  });
  const initialProductUnitId = initialData?.unitId || 0;
  const initialUnit = unitOptions?.find(
    (item) => Number(item.value) === initialProductUnitId
  );
  const [selectedUnit, setSelectedUnit] = useState<any>(initialUnit);

  // Images
  const [files, setFiles] = useState<File[]>([]);
  const initialImageUrls = initialData?.productImages || []
  const [fileUrls, setFileUrls] = useState<string[]>(initialImageUrls);

  // Barcode
  const initialProductCode = initialData?.productCode || 0;
  const [productCode, setProductCode] = useState<number>(initialProductCode);
  const initialBarcodeImageUrl = initialData?.barcodeImageUrl || ""
  const [barcodeImage, setBarcodeImage] = useState<string>("");
  const [barcodeUrl, setBarcodeUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Code Symbology
  const initialSymbology = initialData && initialData?.codeSymbology || "CODE128";
  const [selectedSymbology, setSelectedSymbology] = useState<string>(initialSymbology);
  
  const [isLoading, setIsLoading] = useState(false);
  const [newErrors, setNewErrors] = useState<Partial<ProductProps>>({});

  // Status
  const options: any[] = [
    { value: true, label: "Active" },
    { value: false, label: "Disabled" },
  ];
  const initialStatus = {
    value: initialData?.status ? true : false,
    label: initialData?.status ? "Active" : "Disabled"
  }
  const [status, setStatus] = useState<any>(initialStatus);
  
  // IsFeatured
  const initialIsFeaturedValue = initialData?.isFeatured || false;
  const [isFeatured, setIsFeatured] = useState(initialIsFeaturedValue);


  // Tax Method
  const taxMethodOptions: any[] = [
    { value: "exclusive", label: "Exclusive" },
    { value: "inclusive", label: "Inclusive" },
  ];
  const initialTaxMethodValue = initialData?.taxMethod || "inclusive";
  const initialTaxMethod = taxMethodOptions?.find(
    (item) => item.value === initialTaxMethodValue
  );
  const [selectedTaxMethod, setSelectedTaxMethod] = useState<any>(initialTaxMethod);
  
  // Product Tax
  const productTaxOptions: any[] = [
    { value: 7, label: "VAT 7%" },
    { value: 10, label: "VAT 10%" },
  ];
  const initialProductTaxValue = initialData?.productTax || 7;
  const initialProductTax = productTaxOptions?.find(
    (item) => item.value === initialProductTaxValue
  );
  const [selectedProductTax, setSelectedProductTax] = useState<any>(initialProductTax);
  
  // Step
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

  // Novel Content Editor
  
  const initialContent = initialData?.content || undefined;
  const [content, setContent] = useState(initialContent)
  
  // Validate Data
  const validate = (data: ProductProps) => {
    let newErrors: Partial<ProductProps> = {}

    if (!data.subCategoryId) {
      newErrors.subCategoryId?.toString() ? "Category is required" : "";
      toast.error("Category is required")
    }
    if (!data.brandId) {
      newErrors.brandId?.toString() ? "Brand is required" : "";
      toast.error("Brand is required")
    }
    if (!data.supplierId) {
      newErrors.supplierId?.toString() ? "Supplier is required" : "";
      toast.error("Supplier is required")
    }
    if (!data.unitId) {
      newErrors.unitId?.toString() ? "Unit is required" : "";
      toast.error("Unit is required")
    }
    if (!data.productCode) {
      newErrors.productCode?.toString() ? "Product Code is required" : "";
      toast.error("Product Code is required")
    }

    setNewErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Submit Data
  const saveProduct = async(data: ProductProps) => {
    setIsLoading(true);

    data.productImages = fileUrls;
    data.status = status?.value as boolean;
    data.slug = generateSlug(data.name);
    data.codeSymbology = selectedSymbology;
    data.taxMethod = selectedTaxMethod?.value as string;
    data.productTax = selectedProductTax?.value as number;
    data.productCode = Number(productCode);
    data.barcodeImageUrl = barcodeUrl;
    data.brandId = Number(selectedBrand?.value);
    data.subCategoryId = Number(selectedSubCategory?.value);
    data.supplierId = Number(selectedSupplier?.value);
    data.productThumbnail = fileUrls[0]
    data.unitId = Number(selectedUnit?.value);
    data.productCost = Number(data.productCost);
    data.productPrice = Number(data.productPrice);
    data.stockQty = Number(data.stockQty);
    data.alertQuantity = Number(data.alertQuantity);
    data.saleUnit = Number(data.saleUnit);
    data.expiryDate = convertDateToIso(data?.expiryDate);
    data.content = content

    console.log("Product Data:", data);

    if (validate(data)) {
      try {
      
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
          
          if (newProduct.success) {
            toast.success("Successfully created");
            reset();
            setIsLoading(false);
            router.push(`/dashboard/inventory/products`);
          }
        }
        
      } catch (error) {
          console.error("Failed to save or update product:", error);
          setIsLoading(false);
      }
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
      setProductCode(+newCode);
      generateBarcode(newCode, selectedSymbology);
    } else {
      alert("Invalid input for the selected format. Please try again.");
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductCode(+e.target.value);
  }

  const handlePrintBarcode = (barcodeImage: string) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
        <html>
        <head>
            <title>Print Barcode</title>
            <style>
                @page { size: A4; margin: 10mm; }
                body { display: flex; justify-content: center; align-items: center; }
                .barcode-container {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 10px;
                    width: 100%;
                    padding: 10mm;
                }
                .barcode {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 10px;
                    border: 1px solid black;
                }
                img { width: 100%; height: auto; }
            </style>
        </head>
        <body>
            <div class="barcode-container">
                ${Array(36)
                  .fill(`<div class="barcode"><img src="${barcodeImage}" alt="Generated Barcode" /></div>`)
                  .join("")}
            </div>
            <script>
                window.onload = function() {
                    window.print();
                    window.onafterprint = function() { window.close(); };
                };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
 };

  return (

    <div>
      <div className="grid flex-1 auto-rows-max gap-4">
        <div className="flex items-center justify-between gap-4">
            <div className='flex gap-3'>
                <Button 
                    onClick={handleBack}
                    variant="outline" 
                    type="button"
                    size="icon" 
                    className="h-7 w-7"
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    {editingId ? "Update Product" : "Create Product"}
                </h1>
            </div>
        </div>
    </div>
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
                            label="Sub Categories"
                            options={subCategoryOptions}
                            option={selectedSubCategory}
                            setOption={setSelectedSubCategory}
                            toolTipText='Add new Subcategory'
                            href={"/dashboard/inventory/subcategories/new"}
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
                          <div className="flex w-full space-x-2 items-end">
                            <TextInput
                              register={register}
                              errors={errors}
                              label="Product Batch Number"
                              name="batchNumber"
                              type="number"
                              
                            />
                          </div>
                          <div className="flex w-full space-x-2 items-end">
                            <TextInput
                              register={register}
                              errors={errors}
                              label="Expire Date"
                              name="expiryDate"
                              type="Date"
                            />
                          </div>
                          <div className="flex py-2 gap-4 text-sm/6">
                              <div className="flex h-6 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                  {...register("isFeatured")}
                                    id="featured"
                                    name="isFeatured"
                                    type="checkbox"
                                    checked={isFeatured}
                                    onChange={(e) => setIsFeatured(e.target.checked)}
                                    className="col-start-1 row-start-1 appearance-none 
                                    rounded-sm border border-gray-300 bg-white 
                                    checked:border-indigo-600 checked:bg-indigo-600 
                                    indeterminate:border-indigo-600 indeterminate:bg-indigo-600 
                                    focus-visible:outline-2 focus-visible:outline-offset-2 
                                    focus-visible:outline-indigo-600 disabled:border-gray-300 
                                    disabled:bg-gray-100 disabled:checked:bg-gray-100 
                                    forced-colors:appearance-auto"
                                  />
                                </div>
                              </div> 
                              <div>
                                <label 
                                    htmlFor="comments" 
                                    className="font-medium text-primary">
                                    Featured
                                  </label>
                                  <p id="comments-description" className="text-gray-500">
                                    Featured Products will be used in POS
                                  </p>
                              </div>
                          </div>
                    </div>
                </CardContent>
              </Card>
              <div className='grid py-6 translate-y-10'>
                <div className='flex justify-between gap-4'>
                  <CloseBtn 
                    href='/products'
                  />
                  <Button
                    type='button'
                    onClick={nextStep} 
                    variant={"outline"} 
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
                                    disabled={initialStatus.value} 
                                  >
                                    <Binary className='' />
                                  </Button>
                                </div>
                                {barcodeImage && (
                                  <Dialog open={isOpen}>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" onClick={() => setIsOpen(true)}>
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
                                        setIsOpen={setIsOpen}
                                      />
                                      <p>Product Code: <strong>{productCode}</strong></p>
                                    </div>
                                    <DialogFooter>
                                    <button 
                                      onClick={() => handlePrintBarcode(barcodeImage)} 
                                      className="bg-blue-500 text-white text-sm px-3 py-2 rounded">
                                          Print Barcode
                                    </button>

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
                  <Button
                    type='button'
                    onClick={nextStep} 
                    variant={"outline"} 
                    size="lg"
                  >
                    Next
                  </Button>
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
              {initialBarcodeImageUrl ? (
                  <Card>
                    <CardHeader>
                        <CardTitle>Barcode Image</CardTitle>
                        <CardDescription>Type: {selectedSymbology}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className='w-full flex items-center'>
                        <Image 
                          src={`${initialBarcodeImageUrl}`}
                          alt={"barcode"}
                          width={200}
                          height={200}
                          className=''
                        />
                      </div>
                    </CardContent>
                  </Card>
              ) : ("")}
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
          {step === 3 && (
            <div className='grid md:col-span-12 gap-4 col-span-full'>
              <Card>
                <CardHeader>
                    <CardTitle>Product Stock</CardTitle>
                    <CardDescription>Update the product stocks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='col-span-full'>
                      <QuillEditor
                        label="Write the Content of product"
                        className=""
                        value={content}
                        onChange={setContent}
                      />
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