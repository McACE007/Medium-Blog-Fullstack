import AppBar from "../components/AppBar";
import BlogCard from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks/useBlogs";

export default function Blogs() {
  const { loading, blogs } = useBlogs();

  return (
    <div className="flex justify-center">
      <div className="">
        {loading && <BlogSkeleton />}
        {!loading &&
          blogs.map((blog) => (
            <BlogCard
              authorName={blog.author.name || "McACE007"}
              title={blog.title}
              content={blog.content}
              publishedData="2024-03-07"
              key={blog.id}
              id={blog.id}
            />
          ))}
      </div>
    </div>
  );
}
