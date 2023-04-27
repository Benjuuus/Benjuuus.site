import styles from '../styles/commentSection.module.css'
import Image from 'next/image'
//Author, TimeStamp, Content, Image, Link
export default function Overview({arr}){

    return (
        <div className={styles.commentSection}>
                {arr?.map((el, index)=>{
                    return(
                    <>
                        <div key={index} className={styles.commentContainer}>
                            <a href={el.Link}><img src={el.Image} alt={`${el.Author} photo`} width={32} height={32}></img></a>
                            <div className={styles.AuthorContent}>
                                <p><a className={styles.Author} href={el.Link}>{el.Author}</a> <span className={styles.timeStamp}>{el.TimeStamp}</span></p>
                                <p className={styles.Content}>{el.Content}</p>
                            </div>
                        </div>
                    </>
                    )
                })}
        </div>
    )
}