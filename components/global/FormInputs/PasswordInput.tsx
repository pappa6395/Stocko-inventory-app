import { cn } from "@/lib/utils";
import React, { useState } from "react";
import {
Tooltip,
TooltipContent,
TooltipProvider,
TooltipTrigger,
} from "@/components/ui/tooltip";
 
import { Binary, CircleHelp, CircleX, Eye, EyeOff, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generatePassword } from "@/lib/generatePassword";
type PasswordInputProps = {
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
export default function PasswordInput({
register,
errors,
label,
type,
name,
toolTipText,
unit,
icon,
placeholder,
}: PasswordInputProps) {
const Icon = icon;

  const [showPassword, setShowPassword] = useState(false);
  const [isPassword, setIsPassword] = useState("");
  const [isGeneratedPassword, setGeneratedPassword] = useState("");
      
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
  const handleGeneratePassword = () => {
    const newPassword = generatePassword()
    setGeneratedPassword(newPassword);
  }
  const handleResetPassword = () => {
    setIsPassword("");
    setGeneratedPassword("");
  }

return (
 <div className="">
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
    {name === "password" ? (
      <Button 
        onClick={handleResetPassword} 
        variant={"ghost"}
        type="button" 
        size={"icon"} 
        className="rounded-full pr-4 hover:bg-transparent"
      >
        <CircleX className="text-slate-400" />
      </Button>
    ) : ( 
    <Button 
      disabled 
      type="button" 
      variant={"ghost"} 
      className="hover:bg-transparent"></Button>
    )}  
    
   </div>
   <div className="">
     <div className="relative rounded-md">
       {icon && (
         <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
           <Icon className="text-slate-300 w-4 h-4" />
         </div>
       )}
       <input
        id={name}
        {...register(name, {
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
          setValueAs: (value: string) =>
          value === "" ? isGeneratedPassword : value,
        })}
        type={showPassword ? 'text' : 'password'}
        onChange={(e) => setIsPassword(e.target.value)}
        value={isGeneratedPassword || isPassword}
        className={cn(
        "block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-sm",
          (errors[`${name}`] && "focus:ring-red-500 pl-8") ||
            (icon && "pl-8")
        )}
         placeholder={placeholder || label}
       />
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
     </div>
    {name === "password" ? (
      <Button variant={"outline"} type="button" size={'icon'} onClick={handleGeneratePassword}>
        <Binary className="text-slate-500" />
      </Button>
    ) : ""} 
    
   </div>
   {errors[`${name}`] && (
       <span className="text-xs text-red-600">{label} must contain at least one uppercase letter, one lowercase letter, one number, and one special character</span>
     )}
 </div>
);
}