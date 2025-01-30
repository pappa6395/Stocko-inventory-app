import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
 
export default function CloseButton({
href,
parent = "inventory",
size
}: {
href: string;
parent?: string;
size?: "default" | "sm" | "lg" | "icon"
}) {
return (
  <Button type="button" variant="outline" size={size}  asChild>
    <Link
      href={
        parent === "" ? `/dashboard${href}` : `/dashboard/${parent}${href}`
      }
    >
      Close
    </Link>
  </Button>
);
}
 