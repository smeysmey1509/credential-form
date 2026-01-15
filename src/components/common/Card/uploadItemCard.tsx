import React from "react";

type UploadFile = {
  id: string;
  name: string;
  sizeLabel: string; // e.g. "1.3 MB"
};

type UploadListProps = {
  files: UploadFile[];
  onRemove?: (id: string) => void;
  className?: string;
};

function UploadRow({
  name,
  sizeLabel,
  onRemove,
}: {
  name: string;
  sizeLabel: string;
  onRemove?: () => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-[#5C67F7] p-2">
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove file"
        className="grid h-7 w-7 place-items-center rounded-full bg-[#2E3486] text-white/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/60"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="M6 6l12 12" />
        </svg>
      </button>

      <div className="min-w-0 leading-tight">
        <div className="truncate text-[13px] font-semibold text-white">
          {name}
        </div>
        <div className="mt-0.5 text-[11px] font-medium text-white/80">
          {sizeLabel}
        </div>
      </div>

      <div className="ml-auto" />
    </div>
  );
}

export function UploadList({ files, onRemove, className }: UploadListProps) {
  return (
    <div className={["w-full space-y-3", className].filter(Boolean).join(" ")}>
      {files.map((f) => (
        <UploadRow
          key={f.id}
          name={f.name}
          sizeLabel={f.sizeLabel}
          onRemove={onRemove ? () => onRemove(f.id) : undefined}
        />
      ))}
    </div>
  );
}