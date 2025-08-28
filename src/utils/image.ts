export const DEFAULT_IMG =
  "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

export const API_BASE =
  (import.meta as any)?.env?.VITE_API_BASE_URL ||
  import.meta.env.REACT_APP_API_BASE ||
  "http://localhost:5002";

export const toAbs = (p?: string) => {
  if (!p) return "";
  if (/^https?:\/\//i.test(p)) return p;
  return `${API_BASE}${p.startsWith("/") ? "" : "/"}${p}`;
};

export const getPrimaryUrl = (images?: string[], idx?: number) => {
  if (!Array.isArray(images) || images.length === 0) return DEFAULT_IMG;
  const safeIdx =
    Number.isInteger(idx) && (idx as number) >= 0 && (idx as number) < images.length
      ? (idx as number)
      : 0;
  return toAbs(images[safeIdx]) || DEFAULT_IMG;
};