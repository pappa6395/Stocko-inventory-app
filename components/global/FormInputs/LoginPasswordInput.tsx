import { cn } from "@/lib/utils";
import React, { useState } from "react";
import {
Tooltip,
TooltipContent,
TooltipProvider,
TooltipTrigger,
} from "@/components/ui/tooltip";
 
import { CircleHelp, Eye, EyeOff, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
type LoginPasswordInputProps = {
register: any,
errors: any,
label: string,
type?: string | number,
name: string,
toolTipText?: string,
unit?: string,
placeholder?: string,
icon?: any,
};
export default function LoginPasswordInput({
register,
errors,
label,
type = "text",
name,
toolTipText,
unit,
icon,
placeholder,
}: LoginPasswordInputProps) {
const Icon = icon;

const [isPassword, setIsPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const handleTogglePasswordVisibility = () => {
  setShowPassword(!showPassword);
}

return (
 <div>
   <div className="flex space-x-2 items-center">
     <label
       htmlFor={name}
       className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50"
     >
       {label}
     </label>
     {toolTipText && (
       <TooltipProvider>
         <Tooltip>
           <TooltipTrigger asChild>
             <button>
               <CircleHelp className="w-4 h-4 text-slate-500" />
             </button>
           </TooltipTrigger>
           <TooltipContent>
             <p>{toolTipText}</p>
           </TooltipContent>
         </Tooltip>
       </TooltipProvider>
     )}
   </div>
   <div className="mt-2">
     <div className="relative rounded-md ">
       {icon && (
         <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
           <Icon className="text-slate-300 w-4 h-4" />
         </div>
       )}
       <input
         id={name}
         type={showPassword ? 'text' : 'password'}
         {...register(`${name}`, { 
          required: true,
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
            message:
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
          }, 
        })}
         value={isPassword}
         onChange={(e) => setIsPassword(e.target.value)}
         className={cn(
           "block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-sm",
           (errors[`${name}`] && "focus:ring-red-500 pl-8") ||
             (icon && "pl-8")
         )}
         placeholder={placeholder || label}
       />
       {unit && (
         <p className="bg-white py-2 px-3 rounded-tr-md rounded-br-md absolute inset-y-0 right-1 my-[2px] flex items-center">
           {unit}
         </p>
       )}
       {name === "password" || "confirmPassword" ? (
        <Button
          type="button" 
          variant={"ghost"}
          onClick={handleTogglePasswordVisibility} 
          className='absolute flex items-center 
          inset-y-0 right-0 pr-3'>
          {showPassword 
          ? <EyeOff className='text-slate-300 size-4' /> 
          : <Eye className='text-slate-300 size-4' />}
        </Button>
       ) : ""}
       
     </div>
     {errors[`${name}`] && (
       <span className="text-xs text-red-600">{label} must be at least 8 charactors and contain at least one uppercase letter, one lowercase letter, one number, and one special character</span>
     )}
   </div>
 </div>
);
}