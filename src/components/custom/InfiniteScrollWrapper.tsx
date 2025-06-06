"use client";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface InfiniteScrollWrapperProps<T> {
  items: T[];
  isLoading: boolean;
  isFetching: boolean;
  hasMore: boolean;
  renderItem: (item: T, index: number) => React.ReactNode;
  renderLoading: () => React.ReactNode;
  renderNoData?: () => React.ReactNode;
  onFetchMore: () => void;
  onRefresh?: () => void;
  gridCols?: string;
  keyExtractor?: (item: T) => string;
  // New props for data management
  onItemRemove?: (itemId: string) => void;
  removedItemIds?: string[];
}

const InfiniteScrollWrapper = <T,>({
  items,
  isLoading,
  isFetching,
  hasMore,
  renderItem,
  renderLoading,
  renderNoData,
  onFetchMore,
  onRefresh,
  gridCols = "grid-cols-1",
  keyExtractor,
  // onItemRemove,
  removedItemIds = [],
}: InfiniteScrollWrapperProps<T>) => {
  const [displayItems, setDisplayItems] = useState<T[]>([]);

  // Reset display items when fresh data comes (like after refresh or initial load)
  useEffect(() => {
    if (items && !isLoading && !isFetching) {
      setDisplayItems((prev) => {
        // If it's the first page load or refresh, replace all data
        if (items.length > 0 && prev.length === 0) {
          return items;
        }

        if (!keyExtractor) return [...prev, ...items];

        const existingKeys = new Set(prev.map(keyExtractor));
        const newItems = items.filter(
          (item) => !existingKeys.has(keyExtractor(item))
        );
        return [...prev, ...newItems];
      });
    }
  }, [items, isLoading, isFetching, keyExtractor]);

  // Remove items from display when they are deleted
  useEffect(() => {
    if (removedItemIds.length > 0 && keyExtractor) {
      setDisplayItems((prev) =>
        prev.filter((item) => !removedItemIds.includes(keyExtractor(item)))
      );
    }
  }, [removedItemIds, keyExtractor]);

  useEffect(() => {
    if (!isLoading && !isFetching && items.length === 0) {
      setDisplayItems([]);
    }
  }, [items, isLoading, isFetching]);

  // Function to remove item from display
  // const handleItemRemove = (itemId: string) => {
  //   setDisplayItems((prev) =>
  //     prev.filter((item) =>
  //       keyExtractor ? keyExtractor(item) !== itemId : true
  //     )
  //   );
  //   onItemRemove?.(itemId);
  // };

  if (isLoading) {
    return (
      <section className="w-full space-y-3 rounded-2xl">
        {renderLoading()}
      </section>
    );
  }

  if (!isLoading && displayItems.length === 0) {
    return (
      <section className="w-full space-y-3 rounded-2xl">
        {renderNoData ? (
          renderNoData()
        ) : (
          <h1 className="text-center text-gray-500 py-8">No items available</h1>
        )}
      </section>
    );
  }

  return (
    <InfiniteScroll
      className="w-full z-10 !overflow-visible"
      dataLength={displayItems.length}
      next={onFetchMore}
      hasMore={hasMore}
      loader={<div className="mt-3">{renderLoading()}</div>}
      refreshFunction={onRefresh}
      pullDownToRefresh={!!onRefresh}
      pullDownToRefreshThreshold={50}
    >
      <div className={`w-full grid ${gridCols} gap-3`}>
        {displayItems.map((item, index) => renderItem(item, index))}
        {/* {displayItems.map((item, index) => 
        renderItem(item, index, handleItemRemove) // Pass handleItemRemove here
      )} */}
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteScrollWrapper;
