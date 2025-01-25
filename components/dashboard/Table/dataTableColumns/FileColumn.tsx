import Image from "next/image";
import React from "react";
 
export default function ImageColumn({
  row,
  accessorKey,
}: {
  row: any;
  accessorKey: any;
}) {
  const imageUrl = row.getValue(`${accessorKey}`);
  // const thum = row.getValue(`${accessorKey}`);
  // console.log(imageUrl);
  return (
    <div className="shrink-0">
      <Image
        alt={`${accessorKey}`}
        className="w-10 h-12 ml-2 aspect-square rounded-md object-fit"
        height="50"
        src={"/pdfImage.png"}
        width="50"
      />
    </div>
  );
}