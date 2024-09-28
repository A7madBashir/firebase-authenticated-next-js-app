import { PostResponse } from "~/src/models/response/postResponse";

export async function fetchPosts(): Promise<Array<PostResponse> | undefined> {
  // fetch posts if paging if possible
  try {
    let res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "GET",
    });

    let data: Array<PostResponse> = await res.json();

    return data;
  } catch (error: any) {
    return error;
  }
}
