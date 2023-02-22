import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import notify from "devextreme/ui/notify";

const firebaseConfig = {
  apiKey: "AIzaSyDfgllt4KkEfDLODibbLexcSETXYX4AtMQ",
  authDomain: "inventory-distribution-7ccf6.firebaseapp.com",
  projectId: "inventory-distribution-7ccf6",
  storageBucket: "inventory-distribution-7ccf6.appspot.com",
  messagingSenderId: "383639719994",
  appId: "1:383639719994:web:f65118d4f06f1bcd376503",
  measurementId: "G-EKR6VNK866",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    //alert(err.message);
    notify(
      {
        message: "Invalid Google Account...",
        width: 300,
        shading: true,
        position: "center",
      },
      "error",
      1500
    );
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    notify(
      {
        message: "Invalid Email or Password...",
        width: 300,
        shading: true,
        position: "center",
      },
      "error",
      1500
    );

    //alert(err.message);
  }
};

const registerWithEmailAndPassword = async (
  name,
  email,
  password,
  empcode,
  role,
  phone
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const docRef = await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      empcode,
      role,
      phone,
      authProvider: "local",
      email,
    });
    //set the documentid for future refrence
    const documentId = docRef.id;
    const addRefToDoc = doc(db, "users", documentId);
    await setDoc(
      addRefToDoc,
      {
        docId: documentId,
      },
      {
        merge: true,
      }
    ).then(() => console.log("success"));
    // alert("Document written with ID: ", docRef.id);
  } catch (err) {
    console.error(err);
    //alert(err.message);
    notify(
      {
        message: "Please fill all the Fields....",
        width: 300,
        shading: true,
        position: "center",
      },
      "error",
      1500
    );
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    notify(
      {
        message: "We have sent Password reset link to your Email!",
        width: 430,
        shading: true,
        position: "center",
      },
      "success",
      2000
    );
    //alert("We have sent Password reset link to your Email!");
  } catch (err) {
    //console.error(err);
    //alert(err.message);
    notify(
      {
        message: "Please Enter Registered Email...",
        width: 310,
        shading: true,
        position: "center",
      },
      "error",
      1500
    );
  }
};

const logout = () => {
  signOut(auth);
  notify(
    {
      message: "You are Loggedout....",
      width: 270,
      shading: true,
      position: "center",
    },
    "success",
    1500
  );
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  storage,
};
