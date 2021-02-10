function anagram(word, list) {
  sortedWord = word.split('').sort().join('');
  return list.filter(item => item.split('').sort().join('') === sortedWord);
}