export default (contents, pageNumber, totalItem, pageSize) => ({
  contents,
  pageNumber: parseInt(pageNumber, 10),
  totalPages: Math.ceil(totalItem / pageSize),
  pageSize: parseInt(pageSize, 10),
});
