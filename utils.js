export const getImageUri = (uri) => `https://image.tmdb.org/t/p/w500${uri}`;

export const getNextPageParam = (lastPage) => {
  const nextPage = lastPage.page + 1;
  return nextPage > lastPage.total_pages ? null : nextPage;
};

export const getInfinityQueryData = (data) => {
  const dataList = data.pages.map((page) => page.results).flat();
  const uniqueDataList = dataList.filter(
    (outItem, index) =>
      index === dataList.findIndex((inItem) => inItem.id === outItem.id)
  );
  return uniqueDataList;
};

export const sliceText = (text, number) => {
  return text.length > number ? text.slice(0, number) + "..." : text;
};
