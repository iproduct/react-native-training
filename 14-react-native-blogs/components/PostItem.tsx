import React from "react";
import { PostListener } from "../model/shared-types";
import { Post, PostStatus } from "../model/posts.model"
import { Button, StyleSheet, Text, View, } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface PostItemProps {
    post: Post;
    onUpdate: PostListener;
    onDelete: PostListener;
    onEdit: PostListener;
}

const PostItem = ({ post, onUpdate, onDelete, onEdit }: PostItemProps) => {
    function handleCompletion() {
        onUpdate({ ...post, status: PostStatus.Published })
    }
    return (
        <View style={styles.postItem}>
            <Text style={styles.postText}>
                <>
                {post.id} {post.title} - {post.content}
                </>
            </Text>

            <View style={styles.postItemRight}>
                <Text style={styles.postItemStatus}>{PostStatus[post.status].substring(0, 1)}</Text>
                {post.status === PostStatus.Published ?
                    <FontAwesome.Button style={styles.button} name="check-circle" size={40} color="green" backgroundColor='transparent'
                        onPress={handleCompletion} /> :
                    // <Button color="green" onPress={handleCompletion} title='Complete'/> :
                    <FontAwesome.Button style={styles.button} name="times-circle" size={40} color="red" backgroundColor='transparent'
                        onPress={() => onDelete(post)} />
                }
                <FontAwesome.Button style={styles.button} name="pencil-square" size={40} color="gray" backgroundColor='transparent'
                    onPress={() => onEdit(post)} />
            </View>
        </View >
    )
}

export default PostItem

const styles = StyleSheet.create({
    postItem: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        gap: 15,
        padding: 5,
        backgroundImage: 'gray',
        border: 1,
    },
    postText: {
        width: '65%',
        fontSize: 24,
    },
    postItemId: {
        paddingRight: 10,
        fontSize: 24,
    },
    postItemRight: {
        width: '35%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 15,
        padding: 0,
        backgroundImage: 'gray',
        border: 1
    },
    postItemStatus: {
        fontSize: 24,
    },
    button: {
        padding: 0,
        width: 50,
        height: 40,
    }
});