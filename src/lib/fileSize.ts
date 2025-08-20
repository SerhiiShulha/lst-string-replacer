export const getFileSize = (bytes: number, separator = " "): string => {
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  if (!bytes) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  if (i === 0) return `${bytes}${separator}${sizes[i]}`;
  return `${(bytes / (1024 ** i)).toFixed(1)}${separator}${sizes[i]}`;
};
