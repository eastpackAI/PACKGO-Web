import type { AssetPlaceholder as AssetPlaceholderData } from "@/lib/types";

interface AssetPlaceholderProps {
  asset: AssetPlaceholderData;
  compact?: boolean;
}

export function AssetPlaceholder({ asset, compact = false }: AssetPlaceholderProps) {
  return (
    <div className={`asset-placeholder${compact ? " is-compact" : ""}`}>
      <span className="asset-placeholder__badge">素材占位</span>
      <strong>{asset.type}</strong>
      <span>{asset.subject}</span>
      {!compact && (
        <>
          <small>{asset.pageLocation}</small>
          <ul>
            {asset.suggestedContent.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </>
      )}
      <em>{asset.status === "To Be Produced" ? "待制作" : asset.status}</em>
    </div>
  );
}
