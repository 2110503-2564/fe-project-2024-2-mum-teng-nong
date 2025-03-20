import styles from "./topmenu.module.css";
import Link from "next/link";

interface Props{
    title:string;
    pageRef:string;
}

export default function TopMenuItem (tmi:Props){
    return(
        <Link className={styles.itemContainer} href={tmi.pageRef}>
        {tmi.title}
        </Link>
    );
    
}