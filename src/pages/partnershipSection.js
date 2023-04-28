import { sites } from '../pages/api/sites';
import styles from '../styles/partnershipSection.module.css'

export default function Partnership(){
    return(
        <>
            <div id={styles.partnershipContainer}>
                {sites?.map((el, index)=>{
                    return(<>
                        <div key={index} className={styles.PartnerContainer}>
                            <a href={el.link}></a>
                            <img src={el.image} alt={el.name}></img>
                            <p className={styles.PartnerCode}>{el.partnerCode}</p>
                        </div>
                    </>)
                })}
            </div>
        </>
    )
}