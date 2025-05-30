
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader, Plus } from "lucide-react";
import React from "react";
type SubmitButtonProps = {
  title: string;
  loadingTitle?: string;
  className?: string;
  loaderIcon?: any;
  buttonIcon?: any;
  loading: boolean;
  showIcon?: boolean;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  variant?: "default" | "ghost" | "outline" | "feedback" | "destructive" | "shop" | "cart" | "receipt" | "link" | "secondary";
};
export default function SubmitButton({
  title,
  loadingTitle = "Saving Please wait...",
  loading,
  className,
  variant="default",
  loaderIcon = Loader,
  buttonIcon = Plus,
  showIcon = true,
  size
}: SubmitButtonProps) {
  const LoaderIcon = loaderIcon;
  const ButtonIcon = buttonIcon;
  return (
    <>
      {loading ? (
        <Button
          type="button"
          size={size}
          variant={variant}
          disabled
          className={cn(
            "items-center flex justify-center rounded-md px-2 py-1 text-xs font-normal leading-6 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 cursor-not-allowed",
            className
          )}
        >
          <LoaderIcon className="w-3 h-3 animate-spin mr-2" />
          {loadingTitle}
        </Button>
      ) : (
        <Button
          type="submit"
          size={size}
          variant={variant}
          className={cn(
            "flex items-center justify-center rounded-md px-2 py-1 text-xs font-normal leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
            className
          )}
        >
          {showIcon && <ButtonIcon className="w-3 h-3 mr-2" />}
          {title}
        </Button>
      )}
    </>
  );
}