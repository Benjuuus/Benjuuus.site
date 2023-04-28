import styles from '../styles/commentSection.module.css'
import Image from 'next/image'
import { Component } from 'react'
import { parse } from 'node-html-parser'
//Author, TimeStamp, Content, Image, Link

class CustomInfoBox extends Component{
    constructor({title, content, children}){
        super()
        this.title = title
        this.content = content.split('\\n').map(el=> <>{el}<br/></>)
        this.children = children
    }
    render(){
        return(
            <>
                <div className={styles.customInfoBox}>
                <p className={styles.infoBoxTitle}>{this.title}</p>
                <div name='textareaInfoBox' onkeypress="textareaInfoBox.blur()" className={styles.infoBoxContent}>
                    <>
                    {this.content}
                    {this.children}
                    </>
                </div>
                </div>
            </>
        )
    }

}

export default function Overview({arr}){

    return (
        <>

        <CustomInfoBox className={styles.catInfoBox} title="" content=" 
                  ╱ı\n
                （ﾟ､ ｡７\n
            ⠀   ı、~ヽ\n⠀⠀⠀じしf_,)ノ\n">
                <>
                    <p className={styles.discord}><span className={styles.discord}>DISCORD: 𝗕𝗲𝗻𝗷𝗮#2693</span></p>
                </>
            </CustomInfoBox>
        
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
        
        </>
    )
}