const myColor = [
  '#e7f4f6',
  '#eeefe2',
  '#cddeff',
  '#f9f3ec',
  '#f2d7d9',
  '#d3cedf',
  '#9cb4cc',
  '#e7f4f6',
  '#eeefe2',
  '#cddeff',
  '#f9f3ec',
  '#f2d7d9',
  '#d3cedf',
  '#9cb4cc',
];

let some = 0;

const showFormattedDate = (date) => {
  some++;
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

function getRandomColor() {
  return myColor[Math.floor(Math.random() * myColor.length)];
}

function getLetter(sentence) {
  const splitted = sentence.split(' ');
  let letter = '';

  for (let index = 0; index < (splitted.length > 3 ? 3 : splitted.length); index++) {
    letter += splitted[index][0] === undefined ? '-' : splitted[index][0];
  }
  return letter.toUpperCase();
}

function searchNotes(keyword, notes) {
  return notes.filter((note) => note.title.toLowerCase().includes(keyword.toLowerCase()));
}

export { searchNotes, getLetter, getRandomColor, showFormattedDate };
