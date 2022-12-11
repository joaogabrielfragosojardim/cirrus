export const foundOccurences = (arr: any[] | undefined, key: string) => {
  let arr2: any[] = [];
  arr?.forEach((x) => {
    if (
      arr2.some((val) => {
        return val[key] === x[key];
      })
    ) {
      arr2.forEach((k) => {
        if (k[key] === x[key]) {
          k["occurrence"]++;
        }
      });
    } else {
      let a: any = {};
      a[key] = x[key];
      a["occurrence"] = 1;
      arr2.push(a);
    }
  });
  return arr2;
};
