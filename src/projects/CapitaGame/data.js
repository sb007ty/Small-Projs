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

// console.log(flatDataArr);

export default function getFinalData(data) {
  const flatDataArr = Object.entries(data).flat(1);
  const finalData = shuffleArrAndGetData(flatDataArr);
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
  return finalData;
}
