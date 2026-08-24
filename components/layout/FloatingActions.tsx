"use client";

import { useEffect, useState } from "react";
import styles from "./FloatingActions.module.css";

function ShareIcon(){
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/></svg>;
}

function TopIcon(){
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 14 6-6 6 6"/><path d="M12 8v10"/></svg>;
}

export default function FloatingActions(){
  const [showTop,setShowTop]=useState(false);
  const [copied,setCopied]=useState(false);

  useEffect(()=>{
    const onScroll=()=>setShowTop(window.scrollY>320);
    onScroll();
    window.addEventListener("scroll",onScroll,{passive:true});
    return ()=>window.removeEventListener("scroll",onScroll);
  },[]);

  const share=async()=>{
    const data={title:document.title,text:document.title,url:window.location.href};
    try{
      if(navigator.share){
        await navigator.share(data);
        return;
      }
    }catch(error){
      if((error as DOMException)?.name==="AbortError") return;
    }
    try{
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(()=>setCopied(false),1800);
    }catch{
      window.prompt("아래 주소를 복사해 공유하세요.",window.location.href);
    }
  };

  return <div className={styles.wrap} aria-label="페이지 빠른 기능">
    {copied&&<div className={styles.toast} role="status">링크를 복사했습니다.</div>}
    <button className={styles.action} type="button" onClick={share} aria-label="SNS 공유">
      <ShareIcon/><span>SNS 공유</span>
    </button>
    <button className={[styles.action,styles.topButton,showTop?styles.visible:""].filter(Boolean).join(" ")} type="button" onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} aria-label="맨 위로">
      <TopIcon/><span>맨 위로</span>
    </button>
  </div>;
}
