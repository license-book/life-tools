"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./FloatingActions.module.css";

function ToolsIcon(){
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="6" height="6" rx="1.4"/><rect x="14" y="4" width="6" height="6" rx="1.4"/><rect x="4" y="14" width="6" height="6" rx="1.4"/><rect x="14" y="14" width="6" height="6" rx="1.4"/></svg>;
}

function ShareIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.5-4.5M8.2 13.2l7.5 4.5"/></svg>;
}

function LinkIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.1.1l2-2A5 5 0 0 0 12 4l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/></svg>;
}

function UpIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="m6 10 6-6 6 6"/><path d="M12 4v16"/></svg>;
}

function CloseIcon() {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 5l10 10M15 5 5 15"/></svg>;
}

export default function FloatingActions(){
  const [open,setOpen]=useState(false);
  const [copied,setCopied]=useState(false);
  const rootRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const onPointerDown=(event:MouseEvent|TouchEvent)=>{
      if(open && rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown",onPointerDown);
    document.addEventListener("touchstart",onPointerDown);
    return ()=>{
      document.removeEventListener("mousedown",onPointerDown);
      document.removeEventListener("touchstart",onPointerDown);
    };
  },[open]);

  const getShareData=()=>{
    const url=window.location.href;
    const rawTitle=document.querySelector("h1")?.textContent?.trim() || document.title.replace(/\s*\|\s*생활도구.*$/i,"").trim() || "생활도구";
    const title=rawTitle.includes("생활도구")?rawTitle:`${rawTitle} | 생활도구`;
    return {url,title,text:title};
  };

  const openPopup=(url:string)=>{
    window.open(url,"_blank","noopener,noreferrer,width=720,height=640");
    setOpen(false);
  };

  const copyLink=async(closeAfter=false)=>{
    const {url}=getShareData();
    try{await navigator.clipboard.writeText(url);}catch{
      const textarea=document.createElement("textarea");
      textarea.value=url;
      textarea.style.position="fixed";
      textarea.style.left="-9999px";
      textarea.style.opacity="0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(true);
    if(closeAfter) window.setTimeout(()=>setOpen(false),900);
    window.setTimeout(()=>setCopied(false),1800);
  };

  const nativeShare=async()=>{
    const data=getShareData();
    if(navigator.share){
      try{await navigator.share(data);setOpen(false);return;}catch(error){if(error instanceof DOMException&&error.name==="AbortError")return;}
    }
    await copyLink();
  };

  const shareNaver=()=>{const {url,title}=getShareData();openPopup(`https://share.naver.com/web/shareView?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`);};
  const shareX=()=>{const {url,text}=getShareData();openPopup(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);};
  const shareFacebook=()=>{const {url}=getShareData();openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);};

  return <div ref={rootRef} className={styles.wrap} aria-label="페이지 빠른 기능">
    <Link href="/tools" className={styles.toolsButton} aria-label="전체 계산기 보기" onClick={()=>setOpen(false)}>
      <ToolsIcon/><span>전체 도구</span><span className={styles.tooltip}>전체 계산기 보기</span>
    </Link>
    <div className={styles.shareWrap}>
      {open&&<div className={styles.sharePanel} role="dialog" aria-label="현재 페이지 공유하기">
        <div className={styles.panelHead}><p className={styles.panelTitle}>공유하기</p><button type="button" className={styles.closeButton} onClick={()=>setOpen(false)} aria-label="공유 메뉴 닫기"><CloseIcon/></button></div>
        <button type="button" className={styles.shareItem} onClick={nativeShare}><span className={`${styles.socialIcon} ${styles.kakao}`}>K</span><span>카카오톡</span></button>
        <button type="button" className={styles.shareItem} onClick={shareNaver}><span className={`${styles.socialIcon} ${styles.naver}`}>N</span><span>네이버 블로그</span></button>
        <button type="button" className={styles.shareItem} onClick={shareX}><span className={`${styles.socialIcon} ${styles.x}`}>X</span><span>X</span></button>
        <button type="button" className={styles.shareItem} onClick={shareFacebook}><span className={`${styles.socialIcon} ${styles.facebook}`}>f</span><span>페이스북</span></button>
        <div className={styles.divider}/>
        <button type="button" className={styles.shareItem} onClick={()=>copyLink(true)}><span className={`${styles.socialIcon} ${styles.link}`}><LinkIcon/></span><span>{copied?"링크 복사됨":"링크 복사"}</span></button>
      </div>}
      <button type="button" className={styles.shareButton} onClick={()=>setOpen(v=>!v)} aria-haspopup="dialog" aria-expanded={open} aria-label="현재 페이지 공유하기"><ShareIcon/><span>공유하기</span></button>
    </div>
    <button type="button" className={styles.topButton} onClick={()=>{setOpen(false);window.scrollTo({top:0,behavior:"smooth"});}} aria-label="페이지 상단으로 이동"><UpIcon/></button>
  </div>;
}
