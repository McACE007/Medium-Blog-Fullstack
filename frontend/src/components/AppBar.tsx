import Avatar from "./Avatar";

export default function AppBar() {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <div>Medium</div>
      <div>
        <Avatar authorName="M" />
      </div>
    </div>
  );
}
