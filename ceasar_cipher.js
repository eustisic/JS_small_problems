function rotationCalculation(code, constant, rotation) {
  const CHARS = 26;
  if (code + rotation > constant) {
    return code + (rotation - CHARS);
  } else {
    return code + rotation;
  }
}

function rotateLetter(letter, rotation) {
  const LOWER_Z = 'z'.charCodeAt();
  const UPPER_Z = 'Z'.charCodeAt();
  
  if (/[A-Z]/.test(letter)) {
    return String.fromCharCode(rotationCalculation(letter.charCodeAt(), UPPER_Z, rotation));
  } else if (/[a-z]/.test(letter)) {
    return String.fromCharCode(rotationCalculation(letter.charCodeAt(), LOWER_Z, rotation));
  } else {
    return letter;
  }
}

function ceasarCipher(str, rotation) {
  rotation = rotation % 26;
	
  return str.split('').map(char => rotateLetter(char, rotation)).join('');
}

function vigenereEncode(str, key) {
  const NORMAL = 'a'.charCodeAt();

  let keyArray = key.toLowerCase().split('').map(code => {
    return (code.charCodeAt() - NORMAL);
  });

  let keyCount = -1;

  return str.split('').map(char => {
    keyCount += 1; 
    return rotateLetter(char, keyArray[keyCount % keyArray.length])
  }).join('');
}

