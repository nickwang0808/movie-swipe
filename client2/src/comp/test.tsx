import React, { useEffect } from "react";
import { db } from "../firebase/config";

export default function Test() {
  useEffect(() => {
    db.collection("user").doc("hello").set({ whoareyou: "Nick" });
    // const cleanUp = db
    //   .collection("user")
    //   .doc("hello")
    //   .onSnapshot((snap) => {
    //     console.log(snap.data());
    //   });

    // return () => cleanUp();
  }, []);
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}
