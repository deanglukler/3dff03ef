import { useState, useEffect } from 'react';
import { fetcher } from './fetcher';

function useFetcher(url, options = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [reload, setReload] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setReload(false)
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetcher({ url, ...options });

        if (isMounted) {
          setData(response);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };

  }, [url, JSON.stringify(options), reload]);

  return { data, isLoading, error, setReload };
}

export default useFetcher;