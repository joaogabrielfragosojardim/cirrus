export const sortByDate = (data: { data: Date }[]) => {
  return data?.sort((a, b) => {
    var dateA = new Date(a.data).getTime();
    var dateB = new Date(b.data).getTime();
    return dateA - dateB;
  });
};
