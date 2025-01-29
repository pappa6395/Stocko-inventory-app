

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { LoaderIcon, Upload } from 'lucide-react'
import { uploadFile } from '@/utils/uploadFile'
import toast from 'react-hot-toast'


export type BarcodeImageInputProps = {
    fileUrl: string | null;
    setFileUrl: (url: string) => void;
    file: File | null;
    isLoading: boolean;
    initialBarcode: string;
}

const BarcodeImageInput = ({
    fileUrl,
    setFileUrl,
    file,
    initialBarcode,
    isLoading
    
}: BarcodeImageInputProps) => {


    async function saveBarcode() {

        try {
          if (initialBarcode) {
            toast.error("Already have the barcode");
            return;
          }
          const result = await uploadFile(file, "/api/sign");
          if (result && result.secure_url) {
            toast.success("Uploaded Image Successful!");
            console.log("Barcode ImageUrl,", result);
          } 
          setFileUrl(result.secure_url);
        } catch (error) {
          console.error(error);
        }
    }


  return (
    
    <div>
        <div className="grid">
            <Image
                alt="Category image"
                className="aspect-square w-full rounded-md object-contain"
                height={200}
                src={fileUrl ||"/placeholder.svg"}
                width={200}
            />
        </div>
        <div className="justify-end">
            {isLoading ? (
                <Button type={"button"} variant="outline" className="w-full" disabled>
                    <LoaderIcon className="h-4 w-4 animate-spin mr-2" />
                    Upload Image
                </Button>
            ) : (
                <Button type={"button"} onClick={saveBarcode} variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                </Button>
            )}
        </div>
    </div>
    

  )
}

export default BarcodeImageInput