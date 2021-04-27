import { firebase, FieldValue } from '../libs/firebase';

export const doesUsernameExist = async (username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data());
};

export const getByUserId = async (userId, cb) => {
  await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .onSnapshot((snapshot) => {
      const user = snapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }))[0];
      // console.log(user);
      cb(user);
    });
};

export const getByUserIdNotShapshot = async (userId) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();
  const user = result.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }))[0];
  return user;
};

export const getSuggestedProfiles = async (userId, following) => {
  const notIncluded = [...following, userId];
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', 'not-in', notIncluded)
    .limit(10)
    .get();

  return result.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
};

export const followUser = async (
  loggedInUserDocId,
  loggedInUserId,
  profileDocId,
  profileUserId
) => {
  await firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({ following: FieldValue.arrayUnion(profileUserId) });

  await firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: FieldValue.arrayUnion(loggedInUserId),
    });
};

export const unFollowUser = async (
  loggedInUserDocId,
  loggedInUserId,
  profileDocId,
  profileUserId
) => {
  await firebase
    .firestore()
    .collection('users')
    .doc(loggedInUserDocId)
    .update({ following: FieldValue.arrayRemove(profileUserId) });

  await firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: FieldValue.arrayRemove(loggedInUserId),
    });
};

export const getPhotos = async (userId, following, cb) => {
  firebase
    .firestore()
    .collection('photos')
    .where('userId', 'in', following)
    .onSnapshot(async (res) => {
      const photos = res.docs.map((item) => ({
        ...item.data(),
        docId: item.id,
      }));
      const newPhotos = await Promise.all(
        photos.map(async (photo) => {
          const userLikedPhoto = photo.likes.includes(userId);

          const { username, photoURL } = await getByUserIdNotShapshot(
            photo.userId
          );

          return { ...photo, username, photoURL, userLikedPhoto };
        })
      );
      newPhotos.sort((a, b) => {
        return b.dateCreated - a.dateCreated;
      });

      cb(newPhotos);
    });
};

export const getUserByUsername = async (username) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  if (result.docs.length === 0) return null;

  return result.docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }))[0];
};

export const getPhotosByUserId = async (user, cb) => {
  if (user) {
    // console.log(user);
    await firebase
      .firestore()
      .collection('photos')
      .where('userId', '==', user.userId)
      .onSnapshot((snapshot) => {
        const photos = snapshot.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));

        cb(user, photos);
      });
  }
};

export const isUserFollowingProfile = async (userId, profileId) => {
  const result = await firebase
    .firestore()
    .collection('usera')
    .where('userId', '==', userId)
    .where('following', 'array-contains', profileId)
    .get();
};
