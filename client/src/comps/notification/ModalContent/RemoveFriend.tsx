import React from "react";
import style from "../notification.module.css";
import sharedstyle from "../../ButtonComps/ButtonComps.module.css";
import { userInfo } from "../../../db-operations/useGetUser";

interface IRemoveFriend {
  deleteAction: (userId: string, friendId: string) => Promise<void>;
  friendInfo: userInfo;
  closeAction: () => void;
  userId: string;
}

export default function RemoveFriend({
  friendInfo,
  deleteAction,
  closeAction,
  userId,
}: IRemoveFriend) {
  return (
    <>
      <h1>Remove friend?</h1>
      <div className={style.modal_body}>
        <p>Are you sure you want to remove {friendInfo.name} from your friends list?
        </p>
          <div className={style.container_actions}>
            {/* <div
              onClick={closeAction}
              className={`${sharedstyle.btn} ${sharedstyle.secondary}`}
            >
              Cancel
            </div> */}
            <div
              onClick={() => {
                deleteAction(userId, friendInfo.id);
                closeAction();
              }}
              className={`${sharedstyle.btn} ${style.primary}`}
            >
              Yes, do it!
            </div>
          </div>
        </div>
    </>
  );
}
