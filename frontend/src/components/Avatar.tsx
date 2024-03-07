type AvatarProps = {
  authorName: string;
};

export default function Avatar({ authorName }: AvatarProps) {
  return (
    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-light text-sm text-gray-600 dark:text-gray-300">
        {authorName.slice(0, 1).toUpperCase()}
      </span>
    </div>
  );
}
