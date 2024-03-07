import { Link } from "react-router-dom";
import Avatar from "./Avatar";

type BlogCardProps = {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedData: string;
};

export default function BlogCard({
  id,
  authorName,
  title,
  content,
  publishedData,
}: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b border-slate-200 p-2 w-screen max-w-screen-md">
        <div className="flex space-x-2">
          <div className="text-sm">
            <Avatar authorName={authorName} />
          </div>
          <div className="flex justify-center flex-col text-sm">
            <Circle />
          </div>
          <div className="font-normal">{authorName}</div>
          <div className="flex justify-center flex-col">
            <Circle />
          </div>
          <div className="font-thin text-slate-400">{publishedData}</div>
        </div>
        <div className="font-semibold text-xl pt-2">{title}</div>
        <div className="font-thin text-md">{content.slice(0, 100) + "..."}</div>
        <div className="text-slate-500 text-sm font-thin pt-4">{`${Math.ceil(content.length / 100)} min read`}</div>
      </div>
    </Link>
  );
}

function Circle() {
  return <div className="w-1 h-1 rounded-full bg-slate-500"></div>;
}
