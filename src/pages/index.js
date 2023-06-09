import Head from 'next/head'
import Image from 'next/image'
import { Antic, Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import { load } from 'cheerio'
import { use, useEffect, useRef, useLayoutEffect, useState } from 'react'
import React from 'react';
import window from 'global'
import dynamic from 'next/dynamic'
import Overview from './overviewSection'
import Partnership from './partnershipSection'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });


const isServerReq = req => !req.url.startsWith('/_next');

var videos = [
  {id:1 , url:"https://www.youtube.com/watch?v=xknnD47tcMU"},
  {id:2 , url:"https://www.youtube.com/watch?v=Qd7QY_7jaOc"},
  {id:3 , url:"https://www.youtube.com/watch?v=dSPiDFZmAnQ"},
  {id:4 , url: 'https://www.youtube.com/watch?v=-LXbfZYiImU'},
  {id:5 , url: 'https://www.youtube.com/watch?v=KGMR-ik7F90'},
  {id:6 , url: 'https://www.youtube.com/watch?v=KGMR-ik7F90'},
  {id:7 , url:"https://www.youtube.com/watch?v=A3WOzzZo9TQ"},
  {id:8 , url: 'https://www.youtube.com/watch?v=L_ptSU5jNFc'},
  {id:9 , url: 'https://www.youtube.com/watch?v=0V3bE68Q06k'},
  {id:10 , url: 'https://www.youtube.com/watch?v=7pnzR6kD2Q4'},
  {id:11 , url: 'https://www.youtube.com/watch?v=Vsb6HV-ZNN4'},
  {id:12 , url: 'https://www.youtube.com/watch?v=q1tAnXBUpno'},
];

const randomVid = videos[Math.floor(Math.random()*videos.length)].url;


class ResponsivePlayer extends React.Component{
  constructor(){
    super();
    this.state = {
      isPlay: true,
      volume: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    }
    this.hostVideo = React.createRef();
    window.onresize = () => {
      this.state.width = window.innerWidth;
      this.state.height = window.innerHeight;
    }
  }

  getIsPlayStatus(){
    return(this.state.isPlay)
  }

  handlePlay(){
    this.setState({isPlay: true})
  }

  handlePause(){
    this.setState({isPlay: false})
  }

  handleVolumeChange(e){
    this.setState({volume: e.target.value/1000})
  }

  render(){
    return (
      <>
      <div id={styles.BackgroundVideo} width={this.state.width} height={this.state.height}>
        <ReactPlayer config={{
          youtube: {
            playerVars: { controls:0, showinfo: 1, autoplay: 1, rel: 0,}
          }}}
          className={styles.reactPlayer}
          url={randomVid}
          width={this.state.width}
          height={this.state.height+135}
          playing={this.state.isPlay}
          ref={this.hostVideo}
          volume={this.state.volume}
          loop={true}
          ></ReactPlayer>
      </div>

      <section className={styles.sections}>
        <div id={styles.player}>
          <button onClick={(e)=>{this.getIsPlayStatus() === false? this.handlePlay(e) : this.handlePause(e)}}>{this.getIsPlayStatus() === false? '▷': "||"}</button>
          <input type='range' onChange={(event)=>{this.handleVolumeChange(event)}} min={0} max={100} step={1}></input>
        </div>
      </section>

    </>
    )
  }
}

export default function Home(props) {

  

  const selectorDefaultState = {
    Overview: false,
    Partnership: false,
    Donations: false,
  }

  const [selectorStatus, setSelectorStatus] = useState({selectorDefaultState, Overview: true})

  const reactPlayerRef = useRef();

  useEffect(()=>{
    const dom = document.querySelector(`.${styles.container} img`)
    dom.classList.add(props.markState.indexOf(true) == 0? 'offline' : props.markState.indexOf(true) == 1? 'online' : 'in-game' )
  })

  useEffect(()=>{
    const sections = document.getElementsByClassName(`${styles.sections}`);
    const main = document.getElementById('mainIdentify')

    for(const section of sections){
      section.addEventListener('mouseleave', ()=>{
        main.classList.add('mouseLeaved')
      })
  
      section.addEventListener('mouseover', ()=>{
        main.classList.remove(`mouseLeaved`)
      })
    }

    const video = document.querySelectorAll(`#${styles.BackgroundVideo}`)[0].children;

    console.log(video)

  })

  return (
    <>
      <Head>
        <title>{props.username}</title>
        <meta name="description" content="A website about me and my steam profile" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8787384991646626" crossorigin="anonymous"></script>
      </Head>

      <main id='mainIdentify' className={styles.main}>
        <section className={`${styles.pfpSection} ${styles.sections}`}>
          <div className={styles.container}>
            <img src={props.pfp}></img>
            <div id={styles.ellypsis}>
              <p id={styles.name}><a href='https://steamcommunity.com/id/420c'>{props.username}</a></p>
              <div id={styles.location}>
                <img src={props.ubication[0]}></img>
                <p>{props.ubication[1]}</p>
              </div>
            </div>
            <div id={styles.level}>
              <p>Level <span>{props.level}</span></p>
            </div>
          </div>
        </section>

        <ResponsivePlayer></ResponsivePlayer>

        <section className={styles.sections} id={styles.mainSection}>

          <div id={styles.selector} className={styles.showcase}>
            <button onClick={(event) => { setSelectorStatus({selectorDefaultState, [event.target.innerText]: true}) }} id={styles.overviewBtn}>Overview</button>
            <button onClick={(event) => { setSelectorStatus({selectorDefaultState, [event.target.innerText]: true}) }} id={styles.partnershipBtn}>Partnership</button>
            <button onClick={(event) => { setSelectorStatus({selectorDefaultState, [event.target.innerText]: true}) }} id={styles.donationsBtn}>Donations</button>
          </div>

          {selectorStatus.Overview === true? <Overview arr={props.arr}></Overview> : null}

          {selectorStatus.Partnership === true? <Partnership></Partnership> : null}
        </section>
        <section>
        
        </section>
      </main>
    </>
  )
}

export async function getServerSideProps({req, res}){
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const { data } = isServerReq(req)? await axios.get('https://steamcommunity.com/id/420c/') : null
  const $ = load(data, null,false)
  const username = $('.actual_persona_name').text().trim()
  const level = $('.friendPlayerLevelNum').text()
  const pfp = $('.playerAvatarAutoSizeInner img').attr('src')
  const ubication = [$('.header_real_name img').attr('src'), $('.header_real_name').text().trim()]
  const state = $('.profile_in_game_header').text();
  const markState = [$('.profile_header_size').hasClass('offline'), $('.profile_header_size').hasClass('online'), $('.profile_header_size').hasClass('in-game')]

  ///

  const resp = isServerReq(req)? await fetch('https://steamcommunity.com/id/420c/allcomments') : null
  const html = await resp.text();
  const _ = load(html, null, false)
  const arr = [];

  const commentaries = _('.commentthread_comment').each((i, el)=>{
    const Author = _('.commentthread_comment_content .commentthread_comment_author a', el).text();
    const TimeStamp = _('.commentthread_comment_author .commentthread_comment_timestamp', el).text();
    const Content = _('.commentthread_comment_content .commentthread_comment_text', el).text();
    const Image = _('.commentthread_comment_avatar a img', el).attr('src')
    const Link = _('.commentthread_comment_avatar a', el).attr('href')
    arr.push({Author, TimeStamp, Content, Image, Link})
  })

  console.log(req)

  return{
    props: {
      username,
      level,
      pfp,
      ubication,
      state,
      markState,
      arr,
    }
  }
}
