"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./FloatingActions.module.css";

function ShareIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.5-4.5M8.2 13.2l7.5 4.5"/></svg>;
}

function LinkIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/></svg>;
}

function UpIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 15 6-6 6 6"/></svg>;
}

export default function FloatingActions(){
  const [open,setOpen]=useState(false);
  const [copied,setCopied]=useState(false);
  const rootRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const onPointerDown=(event:MouseEvent|TouchEvent)=>{
      if(!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown",onPointerDown);
    document.addEventListener("touchstart",onPointerDown);
    return ()=>{
      document.removeEventListener("mousedown",onPointerDown);
      document.removeEventListener("touchstart",onPointerDown);
    };
  },[]);

  const getShareData=()=>{
    const url=window.location.href;
    const title=document.querySelector("h1")?.textContent?.trim() || document.title.replace(/\s*\|\s*생활도구.*$/i,"").trim() || "생활도구";
    return {url,title,text:`${title} | 생활도구`};
  };

  const openPopup=(url:string)=>{
    window.open(url,"_blank","noopener,noreferrer,width=720,height=640");
    setOpen(false);
  };

  const copyLink=async()=>{
    const {url}=getShareData();
    try{ await navigator.clipboard.writeText(url); }
    catch{
      const textarea=document.createElement("textarea");
      textarea.value=url;
      textarea.style.position="fixed";
      textarea.style.opacity="0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(true);
    window.setTimeout(()=>setCopied(false),1600);
  };

  const nativeShare=async()=>{
    const data=getShareData();
    if(navigator.share){
      try{ await navigator.share(data); setOpen(false); }catch{}
      return;
    }
    await copyLink();
  };

  const shareNaver=()=>{
    const {url,title}=getShareData();
    openPopup(`https://share.naver.com/web/shareView?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`);
  };
  const shareX=()=>{
    const {url,text}=getShareData();
    openPopup(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
  };
  const shareFacebook=()=>{
    const {url}=getShareData();
    openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
  };

  return <div ref={rootRef} className={styles.wrap} aria-label="페이지 빠른 기능">
    {open&&<div className={styles.sharePanel} role="dialog" aria-label="공유하기">
      <p className={styles.panelTitle}>공유하기</p>
      <button type="button" className={styles.shareItem} onClick={nativeShare}><span className={`${styles.socialIcon} ${styles.kakao}`}>K</span><span>카카오톡</span></button>
      <button type="button" className={styles.shareItem} onClick={shareNaver}><span className={`${styles.socialIcon} ${styles.naver}`}>N</span><span>네이버 블로그</span></button>
      <button type="button" className={styles.shareItem} onClick={shareX}><span className={`${styles.socialIcon} ${styles.x}`}>X</span><span>X</span></button>
      <button type="button" className={styles.shareItem} onClick={shareFacebook}><span className={`${styles.socialIcon} ${styles.facebook}`}>f</span><span>페이스북</span></button>
      <div className={styles.divider}/>
      <button type="button" className={styles.shareItem} onClick={copyLink}><span className={`${styles.socialIcon} ${styles.link}`}><LinkIcon/></span><span>{copied?"링크 복사됨":"링크 복사"}</span></button>
    </div>}

    <button type="button" className={styles.shareButton} onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-label="이 페이지 공유하기"><ShareIcon/><span>공유</span></button>
    <button type="button" className={styles.topButton} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} aria-label="페이지 맨 위로 이동"><UpIcon/></button>
  </div>;
}
