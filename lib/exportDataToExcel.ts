import * as XLSX from "xlsx";
 
export default function exportDataToExcel(data: any[], filename: string) {

  // Convert arrays to strings before exporting
  const processedData = data.map((item) => ({
    ...item,
    productImages: Array.isArray(item.productImages)
      ? item.productImages.join(", ") // Convert array to comma-separated string
      : item.productImages,
  }));

  // Create a new workbook
  const workbook = XLSX.utils.book_new();
 
  // Convert the array of objects to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(processedData);
 
  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
 
  // Write the workbook to a file
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}