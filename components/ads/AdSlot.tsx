type AdSlotProps = {
  placement: string;
  className?: string;
};

/**
 * AdSense placeholder module.
 * Keep layout space stable before AdSense approval. When publisher/slot IDs
 * are available, replace the inner placeholder with the AdSense <ins> unit
 * while keeping this component API so every page updates at once.
 */
export default function AdSlot({ placement, className = "" }: AdSlotProps) {
  return (
    <aside className={["ad-slot", className].filter(Boolean).join(" ")} aria-label="광고 영역" data-ad-placement={placement}>
      <span className="ad-slot-label">ADVERTISEMENT</span>
      <div className="ad-slot-placeholder" aria-hidden="true">광고 영역</div>
    </aside>
  );
}
