"use client";

interface AdSlotProps {
  slot: string;
}

export default function AdSlot({ slot }: AdSlotProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  if (!publisherId) {
    return (
      <div
        className="w-full h-24 bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-xs text-gray-400 select-none"
        aria-hidden="true"
        data-ad-slot={slot}
      >
        Advertisement
      </div>
    );
  }

  return (
    <ins
      className="adsbygoogle block"
      style={{ display: "block" }}
      data-ad-client={publisherId}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
