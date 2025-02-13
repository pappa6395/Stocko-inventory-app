import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CircleX, FileImage, LoaderIcon, Upload, X } from 'lucide-react'
import { uploadFile } from '@/utils/uploadFile'
import toast from 'react-hot-toast'
import { formatBytes } from '@/lib/formatBytes'


export type MultipleImageInputProps = {
    title: string;
    description: string;
    fileUrls: string[]
    setFileUrls: React.Dispatch<React.SetStateAction<string[]>>
    files: File[]
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
    
}

const MultipleImageInput = ({
    title,
    description,
    fileUrls,
    setFileUrls,
    files,
    setFiles,
    
}: MultipleImageInputProps) => {

    const [isLoading, setIsLoading] = React.useState(false)

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;

        const filesArray = Array.from(e.target.files);
        setFiles((prevFiles) => {
            if (prevFiles.length + filesArray.length > 4) {
                alert("You can select up to 4 images only.");
                return prevFiles; 
            }
            return [...prevFiles, ...filesArray];
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (files.length === 0) {
            toast.error("Please select at least one image.");
            return;
          }
          setIsLoading(true);
          let uploadedImages = [] as string[];
        try {
          for (const file of files) {
            const result = await uploadFile(file, "/api/sign");
            
            if (result && result.secure_url) { // ✅ Ensure secure_url exists
                uploadedImages.push(result.secure_url);
            } else {
                console.error("Invalid Cloudinary response:", result);
            }
          }

          setFileUrls(uploadedImages);
          console.log("FileUrls:", uploadedImages);
          
        } catch (error) {
          console.error(error);
        } finally {
            toast.success("Uploaded Images Successfully!");
            setFiles([]);
            setIsLoading(false);
        }
    }

    const handleRemoveFile = (indexToRemove: number) => {
        setFiles((prevFiles) => prevFiles.filter((_,index) => index !== indexToRemove) )
        setFileUrls((prevUrls) => prevUrls.filter((_, index) => index!== indexToRemove) )
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
                <div className="grid">
                    {fileUrls.length <= 0 ? (
                        <div className='space-y-2'>
                            <Image
                                alt={'product'}
                                className="w-full px-2 aspect-square rounded-lg object-contain"
                                height={50}
                                src={"/placeholder.svg"}
                                width={50}
                            />
                            <div className='grid grid-cols-3 ml-1 px-2 justify-center w-full'>
                                <Image
                                    alt={'product'}
                                    className="w-20 md:max-w-24 aspect-square rounded-md object-contain"
                                    height={50}
                                    src={"/placeholder.svg"}
                                    width={50}
                                />
                                <Image
                                    alt={'product'}
                                    className="w-20 md:max-w-24 aspect-square rounded-md object-contain"
                                    height={50}
                                    src={"/placeholder.svg"}
                                    width={50}
                                />
                                <Image
                                    alt={'product'}
                                    className="w-20 md:max-w-24 aspect-square rounded-md object-contain"
                                    height={50}
                                    src={"/placeholder.svg"}
                                    width={50}
                                />
                            </div> 
                        </div>
                        
                    ) : (
                        <div>
                            {fileUrls.slice(0,1).map((file, index) => {
                            return (
                                <div key={index} className='-translate-y-4 space-y-2 relative'>
                                        <button 
                                            onClick={() => handleRemoveFile(index)} 
                                            className='absolute z-10 right-0 top-0'>
                                            <CircleX className="text-slate-600 w-5 h-5" />
                                        </button>
                                        <Image
                                        alt={`Image ${index + 1}`}
                                        className="px-2 aspect-square w-full rounded-md object-contain"
                                        height={200}
                                        src={file || "/placeholder.svg"}
                                        width={200}
                                        />
                                        
                                    <div className='grid grid-cols-3 ml-1 px-2 justify-center w-full'>
                                        {fileUrls.slice(1,4).map((file, index) => {
                                        return (
                                            <div key={index} className='col-span-1 relative'>
                                                <button 
                                                    onClick={() => handleRemoveFile(index)} 
                                                    className='absolute z-10 top-0 right-0 -translate-y-2'>
                                                    <CircleX className="text-slate-600 w-5 h-5" />
                                                </button>
                                                <Image
                                                alt={`Image ${index + 1}`}
                                                className="w-20 md:max-w-24 aspect-square rounded-md object-contain"
                                                height={50}
                                                src={file || "/placeholder.svg"}
                                                width={50} 
                                                />  
                                            </div>
                                        )
                                        })}
                                    </div>
                                    
                                </div>
                                )
                            })}
                        </div> 
                    )}
                </div>
                <input
                    type="file"
                    multiple
                    accept='image/*'
                    name="file"
                    onChange={handleFileChange}
                    className="block w-full text-xs file:mr-4 truncate
                    file:rounded-md file:border-0 file:bg-neutral-900 dark:file:bg-slate-50
                    file:py-2 file:px-2 file:text-xs file:font-normal
                    file:text-white dark:file:text-black hover:file:bg-neutral-800 
                    file:cursor-pointer focus:outline-none
                    disabled:pointer-events-none disabled:opacity-60"
                />
                {files ? (
                    <div className='flex flex-col space-y-3'>
                        {files.map((file, i) => {
                            return (
                                <div key={i} className="flex px-6 py-2 items-start shadow-md rounded-md 
                                bg-slate-100 dark:bg-slate-800 justify-between">
                                    <FileImage className="h-6 w-6" />
                                    <div className="">
                                        <p className="text-sm font-semibold">
                                            {file.name}
                                        </p>
                                        <span className="text-xs">
                                            {formatBytes(file.size)}
                                        </span>
                                    </div>
                                    <div className=''>
                                        <button type="button" disabled={isLoading} onClick={() => handleRemoveFile(i)}>
                                            <X className="text-slate-600 w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div> 
                ) : ("")}
            </div>
        </CardContent>
        <CardFooter className="justify-end">
            {isLoading ? (
                <Button type={"submit"} variant="outline" className="w-full" disabled>
                    <LoaderIcon className="h-4 w-4 animate-spin mr-2" />
                    Upload Image
                </Button>
            ) : (
                <Button type={"submit"} variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                </Button>
            )}
            
        </CardFooter>
        </Card>
    </form>
    

  )
}

export default MultipleImageInput