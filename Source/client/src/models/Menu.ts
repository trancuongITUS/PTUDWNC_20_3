import { ReactNode } from "react";

interface Menu {
    id: string;
    label: string;
    icon: ReactNode;
    route: string;
}

export default Menu