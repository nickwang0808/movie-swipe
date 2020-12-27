import { useEffect, useState } from "react";

export default function useTimeOutStateChange() {
  const [_, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, []);

  return _;
}
