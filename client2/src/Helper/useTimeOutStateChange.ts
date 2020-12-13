import { useEffect, useState } from "react";

export default function useTimeOutStateChange() {
  const [_, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  return _;
}
