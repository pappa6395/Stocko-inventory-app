import React from "react";
import CloseBtn from "@/components/global/FormInputs/CloseBtn";
import SubmitButton from "@/components/global/FormInputs/SubmitButton";
 
export default function FormFooter({
href,
editingId,
loading,
title,
parent,
size
}: {
href: string,
editingId: string | undefined,
loading: boolean,
title: string,
parent?: string,
size?: "default" | "sm" | "lg" | "icon";
}) {
return (
<div className="flex items-center  gap-2 py-4 justify-between ">
  <CloseBtn href={href} parent={parent} size={size} />
  <SubmitButton
    title={editingId ? `Update ${title}` : `Save ${title}`}
    loading={loading}
  />
</div>
);
}
 