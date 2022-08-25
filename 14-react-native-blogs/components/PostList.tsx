import { Component, ForwardedRef, forwardRef, useMemo } from "react";
import { FlatList } from "react-native";
import { FilterType, PostListener } from "../model/shared-types";
import { Post } from "../model/posts.model";
import PostItem, { ITEM_HEIGHT, PostItemListener } from "./PostItem";

interface Props {
    posts: Post[];
    filter: FilterType;
    scrollIndex: number;
    onDelete: PostListener;
    onEdit: PostListener;
}

const PostList = forwardRef<FlatList<Post>, Props>((props, fRef) => {
    const { posts, filter, scrollIndex, ...rest }: Props = props;
    const visiblePosts = (posts: Post[], filter: FilterType) => posts.filter(post => !filter ? true : post.status === filter);
    const memoizedVisiblePosts = useMemo(() => visiblePosts(posts, filter), [posts, filter]);
    return (
        <FlatList<Post> ref={fRef} style={{ width: '100%' }} data={memoizedVisiblePosts}
            renderItem={({ item: post }) => <PostItem post={post} key={post.id} {...rest} />}
            initialScrollIndex={scrollIndex}
            getItemLayout={(data: Post[] | null | undefined, index: number) => (
                { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
            )}
        />);
});

export default PostList;