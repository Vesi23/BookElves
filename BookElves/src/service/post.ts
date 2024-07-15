import { ref, push, get, query, orderByChild, update, equalTo } from 'firebase/database';
import { db } from '../config/firebase-config';
import { getAllUsers } from './user';


export const addPost = async (author: string, title: string, description: string, imagePost: string, image: string, category: string, pagesRead:number, totalPages:number) => {
    return push(ref(db, 'posts'), {
        author,
        title,
        description,
        image,
        imagePost,
        likes: 0,
        createdOn: Date.now(),
        category,
        pagesRead: Number(pagesRead),
        totalPages: Number(totalPages),

    });
};

export const getAllPosts = async (search: string) => {
    const snapshot = await get(query(ref(db, 'posts'), orderByChild('createdOn')));
    if (!snapshot.exists()) {
        return [];
    }

    const posts = Object.keys(snapshot.val()).map(key => ({
        id: key,
        ...snapshot.val()[key],
        createdOn: new Date(snapshot.val()[key].createdOn).toString(),
        likedBy: snapshot.val()[key].likedBy ? Object.keys(snapshot.val()[key].likedBy) : [],
        imageUrl: snapshot.val().imageUrl,
        pagesRead: snapshot.val()[key].pagesRead, // updated this line
    totalPages: snapshot.val()[key].totalPages, // updated this line
    }))
        .filter(p => p.title?.toLowerCase().includes(search.toLowerCase()));

    return posts;
};

export const getAllPostsByUser = async (username: string) => {
    const snapshot = await get(query(ref(db, 'posts'), orderByChild('createdOn')));
    if (!snapshot.exists()) {
        return [];
    }

    const posts = Object.keys(snapshot.val()).map(key => ({
        id: key,
        ...snapshot.val()[key],
        createdOn: new Date(snapshot.val()[key].createdOn).toString(),
        likedBy: snapshot.val()[key].likedBy ? Object.keys(snapshot.val()[key].likedBy) : [],
        imageUrl: snapshot.val().imageUrl,
        pagesRead:snapshot.val().pagesRead,
        totalPages: snapshot.val().totalPages,
    }))

    return posts.filter(p => p.author === username);
};

export const getPostById = async (id: string) => {

    const snapshot = await get(ref(db, `posts/${id}`));
    if (!snapshot.exists()) {
        return null;
    }

    const post = [{
        id,
        ...snapshot.val(),
        createdOn: new Date(snapshot.val().createdOn).toString(),
        likedBy: snapshot.val().likedBy ? Object.keys(snapshot.val().likedBy) : [],
        imageUrl: snapshot.val().imageUrl,
        pagesRead:snapshot.val().pagesRead,
        totalPages: snapshot.val().totalPages,
    }];

    return post;
};


export const addLike = (username: string, postId: string, likesCount: number) => {
    const updateLikes: { [key: string]: any } = {};
    updateLikes[`/posts/${postId}/likedBy/${username}`] = true;
    updateLikes[`/posts/${postId}/likes/`] = likesCount;
    updateLikes[`/users/${username}/likedPosts/${postId}`] = true;
    return update(ref(db), updateLikes);
};


export const removeLike = (username: string, postId: string, likes: number) => {
    const updateLikes: { [key: string]: any } = {};
    updateLikes[`/posts/${postId}/likedBy/${username}`] = null;
    updateLikes[`/posts/${postId}/likes/`] = likes;
    updateLikes[`/users/${username}/likedPosts/${postId}`] = null;

    return update(ref(db), updateLikes);
};

export const deletePost = async (postId: string) => {
    const user = await getAllUsers();
    user.forEach(u => {
        if (u.likedPosts) {
            if (u.likedPosts.includes(postId)) {
                const updateLikes: { [key: string]: any } = {};
                updateLikes[`/users/${u.username}/likedPosts/${postId}`] = null;
                update(ref(db), updateLikes);
            }
        }

    })
    const deletePost: { [key: string]: any } = {};
    deletePost[`posts/${postId}`] = null;
    update(ref(db), deletePost)
}


export const getPostsByCategory = async (category: string) => {
    const snapshot = await get(query(ref(db, 'posts'), orderByChild('category'), equalTo(category)));
    if (!snapshot.exists()) {
        return [];
    }
    return Object.keys(snapshot.val()).map(key => ({
        id: key,
        ...snapshot.val()[key],
        createdOn: new Date(snapshot.val()[key].createdOn).toString(),
        likedBy: snapshot.val()[key].likedBy ? Object.keys(snapshot.val()[key].likedBy) : [],
        imageUrl: snapshot.val().imageUrl,
        pagesRead:snapshot.val().pagesRead,
        totalPages: snapshot.val().totalPages,
    }))
}

