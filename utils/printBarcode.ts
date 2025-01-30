const handlePrintBarcode = (barcodeUrl: string) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
        <html>
        <head>
            <title>Print Barcode</title>
            <style>
                body { display: flex; justify-content: center; align-items: center; height: 100vh; }
                img { max-width: 100%; }
            </style>
        </head>
        <body>
            <img src="${barcodeUrl}" alt="Generated Barcode" />
            <script>
                window.onload = function() {
                    window.print();
                    window.onafterprint = function() { window.close(); };
                };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
};
