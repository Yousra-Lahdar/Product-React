import type {ReactNode} from "react";


type PagesProps = {
    children: ReactNode;
    title: string;
};

const Pages = ({children,title}: PagesProps) => {


    return (
        <>
         <title>{title}</title>
         {children}
        </>
    );
};

export default Pages;
