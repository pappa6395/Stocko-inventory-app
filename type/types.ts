
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface ISidebarLink {
    label: string;
    href?: string;
    icon: React.FC<LucideProps>;
    dropdown: boolean;
    dropdownMenu?: DropdownMenuProps[]
}

export interface DropdownMenuProps {
    label: string;
    href: string;
}