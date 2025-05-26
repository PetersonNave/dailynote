import React from "react";
import styles from './containerWithTitle.module.scss'

const ContainerWithTitle = ({title, children, isLarge = false}:{isLarge?: boolean, title: string, children: any | any[]}) =>{

    return(
        <div style={{
            ...(isLarge && {maxWidth: '900px'}),
            ...(isLarge && {width: '100%'})
        }} className={styles.container}>
            <span className={styles.title}>
                {title}
            </span>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}

export default ContainerWithTitle