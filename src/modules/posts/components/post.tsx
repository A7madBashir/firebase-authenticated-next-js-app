import { PostResponse } from "~/src/models/response/postResponse";

export function Post({ post }: { post: PostResponse }) {
  return (
    <>
      <div className="p-3 bg-white w-[200px] text-black rounded shadow-white shadow-md">
        <h1 className="text-lg font-extrabold text-center pb-3">{post.title}</h1>
        <p className="text-sm">{post.body}</p>
      </div>
    </>
  );
}
