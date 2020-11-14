import React from "react";

interface IDeleteConfirmation {
  action: () => void;
}

export default function DeleteConfirmation({ action }: IDeleteConfirmation) {
  return (
    <>
      <h1>Are You Sure?</h1>
      <button onClick={action}>Delete Permanently</button>
    </>
  );
}
