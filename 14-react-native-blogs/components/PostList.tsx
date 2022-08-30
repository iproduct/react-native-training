import { forwardRef, useMemo, useRef, useEffect } from "react";
import { FlatList, View, Animated } from "react-native";
import { FilterType, PostListener } from "../model/shared-types";
import { Post } from "../model/posts.model";
import PostItem, { ITEM_HEIGHT, PostItemListener } from "./PostItem";
import { DEFAULT_PAGE_SIZE } from "../App";

interface Props {
    posts: Post[];
    page: number;
    filter: FilterType;
    scrollIndex?: number;
    onDelete: PostListener;
    onEdit: PostListener;
}

const PostList = forwardRef<FlatList<Post>, Props>((props, fRef) => {
    const postsAnimatedValues = useRef<Animated.Value[]>([]).current;
    const { posts, page, filter, scrollIndex, ...rest }: Props = props;
    const visiblePosts = (posts: Post[], filter: FilterType) => posts.filter(post => !filter ? true : post.status === filter);
    const memoizedVisiblePosts = useMemo(() => visiblePosts(posts, filter), [posts, filter]);

    useEffect(() => {
        addAnimatedValues(posts.slice((page - 1) * DEFAULT_PAGE_SIZE, page * DEFAULT_PAGE_SIZE))
    }, [page]);

    const addAnimatedValues = (newItems: Post[]) => {
        newItems.forEach(item => postsAnimatedValues.push(new Animated.Value(0)));
        const newAnimations = newItems.map((val, index) =>
            Animated.timing(postsAnimatedValues[index + (page-1) * DEFAULT_PAGE_SIZE], {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }));
        Animated.stagger(100, newAnimations).start();
    }

    return (
        <FlatList<Post> ref={fRef} style={{ flex: 1, width: '100%' }} data={memoizedVisiblePosts}
            renderItem={({ item: post }) => <PostItem post={post} key={post.id} {...rest} />}
            // initialScrollIndex={scrollIndex}
            removeClippedSubviews={false}
            getItemLayout={(data: Post[] | null | undefined, index: number) => (
                { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
            )}
            ItemSeparatorComponent={() => <View style={{ width: "100%", height: .7, backgroundColor: 'rgba( 52,52,52,1)' }} />}
        />);
});

export default PostList;