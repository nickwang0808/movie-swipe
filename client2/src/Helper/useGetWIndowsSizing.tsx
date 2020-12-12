import { useLayoutEffect } from "react";
import { setWindowSizing } from "../redux/WindowSize/WindowSizingReducer";
import { store } from "../store";

export interface ISize {
  height: number;
  XCenter: number;
  width: number;
}

export default function useGetWIndowsSizing() {
  useLayoutEffect(() => {
    function updateSize() {
      document.documentElement.style.setProperty(
        "--global-window-inner-height",
        String(window.innerHeight) + "px"
      );

      store.dispatch(
        setWindowSizing({
          height: window.innerHeight,
          XCenter: window.innerWidth / 2,
          width: window.innerWidth,
        })
      );
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
}
