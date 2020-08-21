export default (contents, pageNumber, totalItem, pageSize) => ({
  contents,
  pageInfo: {
    pageNumber: parseInt(pageNumber, 10),
    totalPages: Math.ceil(totalItem / pageSize),
    pageSize: parseInt(pageSize, 10),
  },
});
