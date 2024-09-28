import { useEffect, useState } from "react";
import { Indicator } from "~/src/components/indicator";
import { Post } from "./post";
import { PostResponse } from "~/src/models/response/postResponse";
import { fetchPosts } from "../logic/handler";

export function Posts() {
  // after fetching posts data
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Array<PostResponse>>([]);

  useEffect(() => {
    fetchPosts().then((res) => {
      if (res != undefined) setPosts(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <h1 className="text-white text-2xl">Discover our posts</h1>
      <div className="flex flex-row flex-wrap gap-5 items-start justify-center">
        {isLoading ? (
          <Indicator />
        ) : posts.length > 0 ? (
          posts.map((e, i) => <Post key={i} post={e} />)
        ) : (
          <h1>No posts exist yet</h1>
        )}
      </div>
    </>
  );
}
