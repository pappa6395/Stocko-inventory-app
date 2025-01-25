
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

export type CategoryProps = {
    title: string;
    slug: string;
    description: string;
    imageUrl: string | null;
    status: boolean;
}

export type SelectOptionProps = {
    label: string;
    value: number | string | boolean
}

export type ExcelCategoryProps = {
    Image: string;
    Title: string;
}