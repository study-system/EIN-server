export default {
  convertPageToLimit: (page, size) => [(parseInt(page, 10) - 1) * size, parseInt(size, 10)],
  genericAndfilter: (fields) => {
    const keys = Object.keys(fields);
    const condition = [];
    keys.forEach((o) => {
      if (fields[o] !== undefined) {
        condition.push(`${o}=${fields[o]}`);
      }
    });
    if (condition.length === 0) return '';
    return ' WHERE '.concat(condition.join(' AND '));
  },
};
