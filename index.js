// Create object to store data for demostration
if (!(localStorage.hasOwnProperty('booksLocalStorage'))){
  let booksLocalStorage = {
    "1Book": {["Name"]: 'Cien años de soledad', ["Author"]: 'Gabriel Garcia Marquez', ["Date"]: '10-10-2020'},
    "2Book": {["Name"]: "1984", ["Author"]: " G.Orwell", ["Date"]: '10-10-2020' },
    "3Book": {["Name"]: 'Y los hipopótamos se cocieron en sus tanques', ["Author"]: 'William S. Burroughs / Jack Kerouac', ["Date"]: '10-10-2020'}
  };
  localStorage.setItem('booksLocalStorage', JSON.stringify(booksLocalStorage))
};

//Calculate number of books
let   objectParse = localStorage.getItem('booksLocalStorage');
      objectParse = JSON.parse(objectParse);
let   book_counter = Object.keys(objectParse).length; 

// Check data in LocalStorage and generate DOM elements
function chargePage() {
  for (let i = 0; i < book_counter; i++) {
    // Data of each book
    let bookObject = Object.values(objectParse)[i],
        libro = bookObject.Name,
        author = bookObject.Author,
        estado = bookObject.Date;

    create_book(libro, author);

    // Set Id for each book in the DOM
    document.getElementById("library_displayId").lastElementChild.setAttribute("id", "bookid"+i);

    // Hover information
    let displayHover = document.createElement("div");
    displayHover.setAttribute("class", "class_hover");
    displayHover.innerHTML = '<div class="class_hover_tittle">Book:</div><div>'+libro+'</div>'+'<div class="class_hover_tittle">Author: </div><div>'+author+'</div>'+'<div class="class_hover_tittle">Date Read: </div><div>'+estado+'</div>';
    document.getElementById("bookid"+i).appendChild(displayHover);
    
    // Book information
    let lomoBook = document.createElement("div");
    let lomoBook_author = document.createElement("div");
    lomoBook.setAttribute("class", "class_lomoBook");
    lomoBook_author.setAttribute("class", "class_lomoBook_author");
    lomoBook.innerHTML = libro;
    lomoBook_author.innerHTML = author;
    lomoBook.appendChild(lomoBook_author)
    document.getElementById("bookid"+i).appendChild(lomoBook);
  }
}


// Local Storage save data
function F_add_book() {
  // Validate formulary
  let nameBook = document.querySelector("#book_name"),
      authorBook = document.querySelector("#book_author"),
      dateBook = document.querySelector('input[type="date"]');

  if (nameBook.value != "" && authorBook.value != "" && dateBook.value != "") {
    if (localStorage.length < 31) {

      let bookName = book_counter+1+"Book",
          bookObject = {["Name"]: nameBook.value, ["Author"]: authorBook.value, ["Date"]: dateBook.value },
          retrievedObject = localStorage.getItem('booksLocalStorage');
          retrievedObject = JSON.parse(retrievedObject);

      retrievedObject[bookName] = bookObject;
      localStorage.setItem('booksLocalStorage', JSON.stringify(retrievedObject));
       
      // Reload the page cause the DOM it's generated based in the state of the localStorage data
      document.location.reload();

    } else {
      alert("Library Max Capacity Is 30");
    }
  } else {
    alert("Finish The Form Before Add Your Lecture");
  }
}

// Used to generate random colors patrons in the books
function getRandomInt() {
    min = Math.ceil(1);
    max = Math.floor(4);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Add individually books in the DOM
function create_book(Libro, author) {
  let btn = document.createElement("div"),
      bigger_string = "",
      book_container = document.querySelector("#library_displayId");

  // Define max heigth of the book
  if (Libro.length > author.length){
    bigger_string = Libro.length;
  } else {
    bigger_string = author.length;
  }  
 
   // Chose Book Heigth
  if (bigger_string < 10){
     btn.classList.add("stylebook1", "stylebookGeneric");
  } else if (bigger_string < 25){
      btn.classList.add("stylebook2", "stylebookGeneric");
  } else if (bigger_string <  35){
     btn.classList.add("stylebook3", "stylebookGeneric");
  } else if (bigger_string <  51){
      btn.classList.add("stylebook4", "stylebookGeneric");
  }

  // Se agrega el elemento
  book_container.appendChild(btn);
}

// Function to clear LocalStorage
function clearStorage() {
  if (confirm('Are you sure you want to delete your library data? The LocalStorage data will be deleted')) {
    localStorage.removeItem("booksLocalStorage")
    document.location.reload();
  } else {
    return;
  }
}

// Initial state 
chargePage();