import { auth, db } from "../firebase/config";

export default async function updateUserInfo(userId: string) {
  const userRef = db.collection("Users").doc(userId);

  const userInfo = auth.currentUser;
  const name = userInfo?.displayName;
  const email = userInfo?.email;
  await userRef.update({
    name: name ? name : email,
    email,
  });
}
