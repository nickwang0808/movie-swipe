import { useLayoutEffect, useState } from "react";

export interface ISize {
  height: number;
  XCenter: number;
}

export default function useGetWIndowsSizing() {
  const [size, setSize] = useState<ISize>({ height: 0, XCenter: 0 });
  useLayoutEffect(() => {
    function updateSize() {
      document.documentElement.style.setProperty(
        "--global-window-inner-height" + "px",
        String(window.innerHeight)
      );
      setSize({ height: window.innerHeight, XCenter: window.innerWidth / 2 });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}
