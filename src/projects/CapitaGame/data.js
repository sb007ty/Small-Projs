export const DATA = {
  India: "Delhi",
  China: "Beijing",
  Russia: "Moscow",
  Afghanistan: "Kabul",
  France: "Paris",
  Germany: "Berlin",
  England: "London",
};

export const countries = Object.keys(DATA);
export const capitals = Object.values(DATA);

// export default DATA;

const flatDataArr = Object.entries(DATA).flat(1);
// console.log(flatDataArr);
export const getFinalDataWithColor = (data) => {
  return data.map((item, index) => {
    if (index === 0) return { ...item, borderColor: "blue" };
    return { ...item, borderColor: "black" };
  });
};
const finalData = getFinalDataWithColor(shuffleArrAndGetData(flatDataArr));
function shuffleArrAndGetData(dataArr) {
  let len = dataArr.length;
  for (let i = len - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * i);
    [dataArr[i], dataArr[j]] = [dataArr[j], dataArr[i]];
  }
  return dataArr.map((item) => {
    return {
      id: crypto.randomUUID(),
      value: item,
    };
  });
}

export default finalData;
