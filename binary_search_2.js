function binarySearch(array, value) {
  let high = array.length - 1;
  let low = 0;

  while (low <= high) {
    let mid = Math.floor((high - low) / 2) + low;
    if (array[mid] === value) {
      return mid;
    } else if (array[mid] < value) {
      low = mid + 1;
    } else if (array[mid] > value) {
      high = mid - 1;
    }
  }

  return -1;
}

console.log(binarySearch([1, 2, 3], 3));
console.log(binarySearch([1, 2, 3], 1));
console.log(binarySearch([1, 3, 4, 5, 22, 45, 65, 66, 89, 99, 102], 89));
console.log(binarySearch([1, 3, 4, 5, 22, 45, 65, 66, 89, 99, 102], 23));
  