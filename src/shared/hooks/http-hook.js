import { useCallback, useRef, useState, useEffect } from "react";

export const useHttp = () => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState();

  const activeRequest = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      const abortController = new AbortController();
      activeRequest.current.push(abortController);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: activeRequest.signal,
        });
        const responseData = await response.json();

        activeRequest.current = activeRequest.current.filter(
          (reqController) => reqController !== activeRequest
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoading(false);
        return responseData;
      } catch (e) {
        setError(e.message || "Server error.");
        setLoading(false);
        throw e;
      }
    },
    []
  );
  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeRequest.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, isError, sendRequest, clearError };
};
