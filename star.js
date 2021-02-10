function star(num) {
	let midPoint = Math.floor(num / 2) - 1;
  let starArray = [];
  
  for (let idx = midPoint; idx >= 0; idx -= 1) {
    starArray.push(idx);
	}
  
  starArray.forEach((ele, idx) => {
    console.log(' '.repeat(idx) + '*' + ' '.repeat(ele) + '*' + ' '.repeat(ele) + '*');
  });
	
  console.log('*'.repeat(num));
  
  starArray.forEach((ele, idx) => {
    console.log(' '.repeat(ele) + '*' + ' '.repeat(idx) + '*' + ' '.repeat(idx) + '*');
	});
}

console.log(star(21));