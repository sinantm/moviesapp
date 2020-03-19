import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyDS7t1WxXc_XPCkQ7GVGEQwHhhNm1gV8no',
  authDomain: 'todo-list-7f98a.firebaseapp.com',
  databaseURL: 'https://todo-list-7f98a.firebaseio.com',
  projectId: 'todo-list-7f98a',
  storageBucket: 'todo-list-7f98a.appspot.com',
  messagingSenderId: '175927838070',
  appId: '1:175927838070:web:7abe4a72ae2da4d9ff2657',
  measurementId: 'G-4HLJ5END56'
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  //sign in
  async signin(email, password) {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        console.log(err);
      });

    return user;
  }

  //log in
  async login(email, password) {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        console.log(err);
      });

    return user;
  }

  async logout() {
    const logout = await firebase
      .auth()
      .signOut()
      .catch(err => {
        console.log(err);
      });
    return logout;
  }

  async getUserState() {
    return new Promise(revolse => {
      this.auth.onAuthStateChanged(revolse);
    });
  }

  async getPosts() {
    let postsArray = [];
    const posts = await firebase
      .firestore()
      .collection('posts')
      .get();
    posts.forEach(doc => {
      postsArray.push({ id: doc.id, data: doc.data() });
    });

    return postsArray;
  }

  async getPost(postid) {
    const post = await firebase
      .firestore()
      .collection('posts')
      .doc(postid)
      .get(); // promise
    const postData = post.data();
    return postData;
  }

  async createPost(post) {
    const storageRef = firebase.storage().ref();
    const storageChild = storageRef.child(post.cover.name);
    const postCover = await storageChild.put(post.cover);
    const downloadURL = await storageChild.getDownloadURL(); //url
    const fileRef = postCover.ref.location.path; // actual path

    let newPost = {
      title: post.title,
      content: post.content,
      description: post.description,
      actors: post.actors,
      director: post.director,
      production: post.production,
      type: post.type,
      category: post.category,
      time: post.time,
      language: post.language,
      cover: downloadURL,
      fileref: fileRef
    };

    const firebasePost = await firebase
      .firestore()
      .collection('posts')
      .add(newPost)
      .catch(err => {
        console.log(err);
      });

    return firebasePost;
  }

  async updatePost(postid, postData) {
    if (postData['cover']) {
      const storageRef = firebase.storage().ref();
      const storageChild = storageRef.child(postData.cover.name);
      const postCover = await storageChild.put(postData.cover);
      const downloadURL = await storageChild.getDownloadURL(); //url
      const fileRef = postCover.ref.location.path; // actual path

      await storageRef
        .child(postData['oldcover'])
        .delete()
        .catch(err => {
          console.log('err', err);
        });

      console.log('Image deleted');

      let updatePost = {
        title: postData.title,
        content: postData.content,
        description: postData.description,
        actors: postData.actors,
        director: postData.director,
        production: postData.production,
        type: postData.type,
        category: postData.category,
        time: postData.time,
        language: postData.language,
        cover: downloadURL,
        fileref: fileRef
      };

      const post = await firebase
        .firestore()
        .collection('posts')
        .doc(postid)
        .set(updatePost, { merge: true })
        .catch(err => console.log(err));

      console.log('post updated');

      return post;
    } else {
      const post = await firebase
        .firestore()
        .collection('posts')
        .doc(postid)
        .set(postData, { merge: true });
      console.log('post updated');

      return post;
    }
  }

  async deletePost(postid, fileref) {
    const storageRef = firebase.storage().ref();
    await storageRef
      .child(fileref)
      .delete()
      .catch(err => console.log(err));
    console.log('Image Deleted');

    const post = await firebase
      .firestore()
      .collection('posts')
      .doc(postid)
      .delete()
      .catch(err => {
        console.log(err);
      });

    console.log('Post deleted successfully');
    return post;
  }
}

export default new Firebase();
