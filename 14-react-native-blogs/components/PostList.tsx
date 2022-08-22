import { useMemo } from "react";
import { FlatList } from "react-native";
import { FilterType, PostListener } from "../model/shared-types";
import { Post, PostStatus } from "../model/posts.model";
import PostItem from "./PostItem";

interface Props {
    posts: Post[];
    filter: FilterType;
    onUpdate: PostListener;
    onDelete: PostListener;
    onEdit: PostListener;
}

export default function PostList({ posts, filter, ...rest }: Props) {
    const visiblePosts = (posts: Post[], filter: FilterType) => posts.filter(post => !filter ? true : post.status === filter);
    const memoizedVisiblePosts = useMemo(() => visiblePosts(posts, filter), [posts, filter]);
    return (
        <FlatList<Post> style={{width: '100%'}} data={memoizedVisiblePosts}
            renderItem={({ item: post }) => <PostItem post={post} key={post.id} {...rest} />}
        />);
}