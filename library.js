const form = document.getElementById('form');
const heading = document.getElementById('heading');
const myModal = document.getElementById('myModal');
const appContainer = document.getElementById('appContainer');
const submit = document.getElementById('submit');
const author = document.getElementById('author');
const title = document.getElementById('title');
const pages = document.getElementById('pages');
const clear = document.getElementById('clear');
const yes = document.getElementById('yes');
const no = document.getElementById('no');
const close = document.getElementById('close');
//const read = '';

function check() {
  let readText = '';  // Declare readText locally
  if (yes.checked) {
    read = 'true';
    readText = 'Read';
  } else if (no.checked) {
    readText = 'Did not read';
    read = 'false';
  } else {
    console.log('You ain\'t picked nun huh');
  }
  return readText;
}

function handleToggle(index) {
  const book = library[index]; // Get the specific book object
  const toggleTest = document.getElementById(`toggleTest-${index}`);

  console.log(index);

  if (book.read === 'true') {
    toggleTest.innerText = 'You Did not Read the Book';
    book.read = 'false'; // Update the read status for the specific book
  } else if (book.read === 'false') {
    toggleTest.innerText = 'You Read the Book';
    book.read = 'true'; // Update the read status for the specific book
  } else {
    console.log('Me I dont Know');
  }

  console.log(toggleTest);
  console.log(library);
}

const library = [];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addToLibrary() {
  const readText = check();  // Get the updated readText
  const newBook = new Book(author.value, title.value, pages.value, read);
  library.push(newBook);
  displayBooks();  // Call displayBooks here to update the display after adding a new book
}


function displayCard(book, index) {
  const card = document.createElement('div');
  card.classList.add('card', `card-${index}`);
  card.innerHTML = `<div id='card'>
    <p>Author: ${book.author}</p>
    <p>Title: ${book.title}</p>
    <p>Pages: ${book.pages}</p>
    <p id='toggleTest-${index}'>You ${book.read === 'true' ? 'Read' : 'Did not read'} the Book</p>
    <span id='dialog-btn'>
      <button class="delete-btn" onclick='deleteEntry(${index})'>Delete</button>
      <button class="toggle-read" onclick='handleToggle(${index})'>Toggle Read</button>
    </span>
  </div>`;

  appContainer.append(card);
} 


function displayBooks() {
  appContainer.innerHTML = '';  // Clear the previous book display
  for (let index = 0; index < library.length; index++) {
    const book = library[index];
    displayCard(book, index);
    //console.log(book);
  }
}

function deleteEntry(index) {
  // Remove the specific card related to the deleted entry
  const deletedCard = document.querySelector(`.card-${index}`);
  if (deletedCard) {
    deletedCard.remove();
  }
  library.splice(index, 1);
  displayBooks();
}

function handleCardDisplayEvent(e) {
  e.preventDefault();
  closeModal();
  addToLibrary();
  form.reset();
  displayBooks();
}

function clearForm(e) {
  e.preventDefault();
  form.reset();
}

function openModal() {
  myModal.showModal();
}

function closeModal() {
  myModal.close();
}


clear.addEventListener('click', clearForm);
heading.addEventListener('click', openModal);
form.addEventListener('submit', handleCardDisplayEvent);
