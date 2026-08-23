type CategoryCode = "MONEY" | "HOME" | "CAR" | "BUY" | "WORK" | "LIFE";

export default function CategoryHeroIcon({ category }: { category: CategoryCode }) {
  const common = { viewBox:"0 0 160 160", fill:"none", stroke:"currentColor", strokeWidth:3, strokeLinecap:"round" as const, strokeLinejoin:"round" as const };
  const icons: Record<CategoryCode, React.ReactNode> = {
    MONEY:<svg {...common}><rect x="31" y="45" width="98" height="70" rx="16"/><path d="M31 62h98M101 79h28"/><circle cx="104" cy="80" r="5"/><path d="M57 91c7 8 21 8 27 0 6-9-3-14-14-16-11-2-20-7-14-16 6-8 20-8 27 0M70 49v52"/></svg>,
    HOME:<svg {...common}><path d="M25 76 80 31l55 45"/><path d="M38 67v61h84V67M65 128V91h30v37"/><path d="M52 79h16M104 79h16"/></svg>,
    CAR:<svg {...common}><path d="M31 92l9-28c3-9 10-14 20-14h42c10 0 17 5 20 14l8 28"/><path d="M25 91h110v26H25z"/><circle cx="48" cy="117" r="10"/><circle cx="112" cy="117" r="10"/><path d="M43 75h74M25 91l-8-8M135 91l8-8"/></svg>,
    BUY:<svg {...common}><path d="M43 58h74l-7 72H50z"/><path d="M61 62V48c0-12 8-21 19-21s19 9 19 21v14"/><path d="M64 83h32M80 70v27"/></svg>,
    WORK:<svg {...common}><rect x="27" y="54" width="106" height="73" rx="12"/><path d="M61 54V43c0-7 5-12 12-12h14c7 0 12 5 12 12v11M27 77c31 18 75 18 106 0"/><path d="M72 83h16v13H72z"/></svg>,
    LIFE:<svg {...common}><rect x="34" y="39" width="92" height="91" rx="15"/><path d="M34 65h92M57 29v20M103 29v20"/><path d="m61 93 13 13 27-30"/></svg>,
  };
  return <div className={`category-hero-icon category-hero-icon-${category.toLowerCase()}`} aria-hidden="true"><span className="category-hero-icon-glow"/>{icons[category]}</div>;
}
