// Set prefixed data for the LivePreview
localStorage.setItem(0+"Name", "Cien años de soledad");
localStorage.setItem(0+"Author", "Gabriel Garcia Marquez");
localStorage.setItem(0+"State", "10-10-2020");

localStorage.setItem(1+"Name", "El extranjero");
localStorage.setItem(1+"Author", "Alberto Camita");
localStorage.setItem(1+"State", "10-10-2020");

localStorage.setItem(2+"Name", "Y los hipopótamos se cocieron en sus tanques");
localStorage.setItem(2+"Author", "Jack Kerauck");
localStorage.setItem(2+"State", "10-10-2020");




let nameBook = document.querySelector("#book_name"),
    authorBook = document.querySelector("#book_author"),
    dateBook = document.querySelector('input[type="date"]');
    book_counter = 0;
    book_container = document.querySelector("#library_displayId");

// Codigo que comprueba los datos del LocalStorage y crea libros cada que se recarga la pagina
// Se calculan la cantidad de libros existentes en el local storage
// Se divide por tres por ser ése el número de atríbutos, así cada libro tiene asignados sus tres parametros
if (localStorage.length > 1){
  book_counter = localStorage.length/3 ;
  
  for (var i = 0; i < book_counter; i++) {


    // Variables where the data of each book is get with his own index
    let libro = localStorage.getItem(i+'Name'),
        author = localStorage.getItem(i+'Author'),
        estado = localStorage.getItem(i+'State'),
        biggerr_string = "";

    // Se calcula el tamaño del string más grande para pasar como argumento
    if (libro.length > author.length){
      biggerr_string = libro.length;
    } else {
      biggerr_string = author.length;
    }
    create_book(biggerr_string);

    // Set Id for each book created
    document.getElementById("library_displayId").lastElementChild.setAttribute("id", "bookid"+i);

    // Create Div that will display de information on hover 
    let displayHover = document.createElement("div");
    displayHover.setAttribute("class", "class_hover");
    displayHover.innerHTML = '<p>Book: </p>'+libro+'<br>'+'<p>Author: </p>'+author+'<br>'+'<p>Date Read: </p>'+estado;
    document.getElementById("bookid"+i).appendChild(displayHover);
    
    // Create Div that will display de information on 
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


// Function called on add button save the data in LocalStorage 
function F_add_book() {
  // Validate formulary
  if (nameBook.value != "" && authorBook.value != "" && dateBook.value != "") {
   
    // To Validate if there is less than 30 books
    if (localStorage.length < 31) {

      // Save the tree items in LocalStorage with shared book_counter index
      localStorage.setItem(book_counter+"Name", nameBook.value);
      localStorage.setItem(book_counter+"Author", authorBook.value);
      localStorage.setItem(book_counter+"State", dateBook.value);

      // Reload the page for add the new element to stand
      document.location.reload();

    } else {
      alert("Library Max Capacity Is 30");
    }

  } else {
    alert("Finish The Form Before Add");
  }
}


// Function to get a random number in a range
// Used to generate random patrons in the stand
function getRandomInt() {
    min = Math.ceil(1);
    max = Math.floor(4);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function that generate individually books in the stand, add random color, and height depending on his string_length
function create_book(bigger_string) {

  let btn = document.createElement("div");
  let random_stylebook = getRandomInt();
 
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

  // Chose Book random color
  if (random_stylebook == 1){
     btn.classList.add("stylebookCLR1");
  } else if (random_stylebook == 2){
      btn.classList.add("stylebookCLR2");
  } else if (random_stylebook == 3){
     btn.classList.add("stylebookCLR3");
  } else if (random_stylebook == 4){
      btn.classList.add("stylebookCLR4");
  }

  // Se agrega el elemento
  book_container.appendChild(btn);
}

// Function to clear LocalStorage
function clearStorage() {
  if (confirm('Are you sure you want to delete your library data?. The LocalStorage will be deleted')) {
    localStorage.clear();
    document.location.reload();
  } else {
    return;
  }
}


// Avoid two box cheked at once
// function checkbox(number_box) {
// if (number_box == "box1"){
//   if(check2.checked == true){ 
//     check2.checked = false;
//   }

//   }else if (number_box == "box2"){
//    if(check1.checked == true){ 
//      check1.checked = false;
//     } 
//   }
// }