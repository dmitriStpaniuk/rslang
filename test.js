function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const pivot = arr[Math.floor(Math.random() * arr.length)]; //?

  let left = [];
  let right = [];
  let equal = [];

  for (let val of arr) {
    if (val < pivot) {
      left.push(val);
    } else if (val > pivot) {
      right.push(val);
    } else {
      equal.push(val);
    }
  }

  return [...quickSort(left), ...equal, ...quickSort(right)];
}

quickSort([1, 3, 5, 4, 2, 6, 98, 4]); //?
const x = 6;
switch (x) {
  case 4:
  case 5:
    console.log("rr");
    break;
  default:
    console.log("by");
}

const qq = [{a:10},{a:5}]

