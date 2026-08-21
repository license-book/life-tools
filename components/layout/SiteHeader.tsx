import Link from "next/link";

const nav = [
  ["MONEY", "/money"],
  ["HOME", "/home"],
  ["CAR", "/car"],
  ["BUY", "/buy"],
  ["WORK", "/work"],
  ["LIFE", "/life"],
] as const;

export default function SiteHeader() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link className="logo" href="/">생활도구</Link>
        <nav className="nav" aria-label="주요 카테고리">
          {nav.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
        </nav>
      </div>
    </header>
  );
}
