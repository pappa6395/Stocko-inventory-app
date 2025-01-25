import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import { uploadFile } from '@/utils/uploadFile'
import toast from 'react-hot-toast'


export type ImageInputProps = {
    title: string;
    description: string;
    fileUrl: string | null;
    setFileUrl: (url: string) => void;
    file: File | null;
    setFile: (file: File | null) => void;
    
}

const ImageInput = ({
    title,
    description,
    fileUrl,
    setFileUrl,
    file,
    setFile,
    
}: ImageInputProps) => {

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        setFile(e.target.files[0]);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
          if (!file) {
            toast.error("No file selected");
            return;
          }
          const result = await uploadFile(file, "/api/sign");
          if (result) toast.success("Uploaded Image Successful!");
          setFileUrl(result.secure_url);
        } catch (error) {
          console.error(error);
        }
    }


  return (
    
    <form onSubmit={handleSubmit}>
        <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-3">
                <div className="grid gap-2">
                    <Image
                        alt="Category image"
                        className="aspect-square w-full rounded-md object-contain"
                        height={400}
                        src={fileUrl ||"/placeholder.svg"}
                        width={400}
                    />
                </div>
                <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    className="block w-full text-xs file:mr-4 truncate
                    file:rounded-md file:border-0 file:bg-neutral-900 dark:file:bg-slate-50
                    file:py-2 file:px-2 file:text-xs file:font-normal
                    file:text-white dark:file:text-black hover:file:bg-neutral-800 
                    file:cursor-pointer focus:outline-none
                    disabled:pointer-events-none disabled:opacity-60"
                    />
            </div>
        </CardContent>
        <CardFooter className="justify-end">
            <Button type={"submit"} variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
            </Button>
        </CardFooter>
        </Card>
    </form>
    

  )
}

export default ImageInput