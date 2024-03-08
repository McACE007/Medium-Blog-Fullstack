type AvatarProps = {
  authorName: string;
  size?: "small" | "big";
};

export default function Avatar({ authorName, size = "small" }: AvatarProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}
    >
      <span
        className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}
      >
        {authorName[0]}
      </span>
    </div>
  );
}
