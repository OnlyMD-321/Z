import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { axiosInstance } from "../../lib/axios";

const Posts = ({ feedType, username, userId }) => {
	const getPostEndpoint = () => {
		switch (feedType) {
			case "forYou":
				return "/posts/all";
			case "following":
				return "/posts/following";
			case "posts":
				return `/posts/user/${username}`;
			case "likes":
				return `/posts/likes/${userId}`;
			default:
				return "/posts/all";
		}
	};

	const POST_ENDPOINT = getPostEndpoint();

	const {
    data: posts,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(POST_ENDPOINT);
        return data;
      } catch (error) {
        throw new Error(
          error.response?.data?.error || error.message || "Something went wrong"
        );
      }
    },
  });


	useEffect(() => {
		refetch();
	}, [feedType, refetch, username]);

	return (
		<>
			{(isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && (
				<p className='text-center my-4'>No posts in this tab. Switch 👻</p>
			)}
			{!isLoading && !isRefetching && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;
