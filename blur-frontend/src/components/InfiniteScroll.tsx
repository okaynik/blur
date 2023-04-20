import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';
import { ApiResponse } from "../models/api-response";
import { PageLoader } from "../components/PageLoader";

interface InfiniteScrollProps<T> {
  fetchData: (page: number) => Promise<ApiResponse<T[]>>;
  renderItem: (props: { item: T }) => JSX.Element;
}

function InfiniteScroll<T>({
  fetchData,
  renderItem,
}: InfiniteScrollProps<T>): React.ReactElement {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const response: ApiResponse<T[]> = await fetchData(page);
      if (response.error) {
        console.error('Error fetching data:', response.error);
      } else {
        if (response.data && response.data.length > 0) {
          setItems((prevItems) => [...prevItems, ...(response.data || [])]);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchData, page]);

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, [fetchData]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const isBottom = scrollTop + clientHeight >= scrollHeight;

    if (isBottom && !isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading, hasMore]);

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 50);

    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [handleScroll]);

  const MemoizedRenderItem = useMemo(() => React.memo(renderItem), [renderItem]);

  if (items.length === 0 && !isLoading) {
    return <div>no posts data...🚀 Why not try asking a question?</div>;
  }

  return (
    <div>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <MemoizedRenderItem item={item} />
        </React.Fragment>
      ))}
      {isLoading && <PageLoader />}
    </div>
  );
}

export default InfiniteScroll;
