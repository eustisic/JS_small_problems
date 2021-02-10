function mergeSorted(ary1, ary2) {
  let newArray = [];
  
  if (ary1.length < ary2.length) {
    [ary1, ary2] = [ary2.slice(0), ary1.slice(0)];
  } else {
    [ary1, ary2] = [ary1.slice(0), ary2.slice(0)];
  } 
  
  while (ary1.length > 0) {
    if (ary2.length === 0) {
      return newArray.concat(ary1);
    }
    
    if (ary1[0] < ary2[0]) {
      newArray.push(ary1.shift());
    } else {
      newArray.push(ary2.shift())
    }
  }
  
  return newArray.concat(ary2);
}