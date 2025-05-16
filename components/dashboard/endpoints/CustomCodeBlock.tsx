import { CodeBlock, atomOneLight, atomOneDark } from "react-code-blocks";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function CustomizeCodeBlock({
  codeString,
  language,
  showLineNumbers,
}: {
  codeString: string;
  language: string;
  showLineNumbers: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Detect if <html class="dark"> exists
    const htmlEl = document.querySelector("html");
    const observer = new MutationObserver(() => {
      setIsDark(htmlEl?.classList.contains("dark") ?? false);
    });

    // Initial check
    setIsDark(htmlEl?.classList.contains("dark") ?? false);

    observer.observe(htmlEl!, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative border max-w-4xl mx-auto dark:bg-gray-800 font-jet max-h-[400px] overflow-y-auto">
      <div className="absolute top-2 right-2">
        <Button size="sm" variant="outline" onClick={handleCopy}>
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
      <CodeBlock
        text={codeString}
        language={language}
        showLineNumbers={showLineNumbers}
        theme={isDark ? atomOneDark : atomOneLight}
      />
    </div>
  );
}
