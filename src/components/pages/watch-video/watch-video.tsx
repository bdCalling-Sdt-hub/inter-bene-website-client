"use client";
import { useFeedPostsQuery } from "@/redux/features/post/postApi";
import { IPost } from "@/types/post.types";
import PostCard from "../home/posts/post-card";

const WatchVideo = () => {
  const { data: responseData } = useFeedPostsQuery([
    { key: "mediaType", value: "video" },
  ]);
  const videoPostsData = responseData?.data?.attributes?.results;
  // const totalResults = responseData?.data?.attributes?.totalResults;

  return (
    <section className="w-full">
      {videoPostsData?.map((post: IPost) => (
        <PostCard key={post._id} post={post} />
      ))}
    </section>
  );
};

export default WatchVideo;
