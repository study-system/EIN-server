export default (contents, pageNumber, totalPages) => ({
  contents,
  pageNumber: parseInt(pageNumber, 10),
  totalPages,
});
