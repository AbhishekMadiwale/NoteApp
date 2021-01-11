console.log("welcome to Note App")
showNotes()

// if user add a note add it to local storage
let addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click', function (e) {

    let addTxt = document.getElementById('addTxt')
    let addTitle = document.getElementById('addTitle')
    let notes = localStorage.getItem('notes')   // getting notes from local storage
    if (notes == null) {
        notesObj = [];  // creating an array to store the data
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title:addTitle.value,
        text:addTxt.value
    }
    // notesObj.push(addTxt.value)
    notesObj.push(myObj)
    localStorage.setItem('notes', JSON.stringify(notesObj)) //converting to string
    addTxt.value = "";
    addTitle.value="";
    // console.log(notesObj);
    showNotes()
})

// show notes from local storage
function showNotes() {
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    notesObj.forEach(function (element, index) {
        html += `
                <div class=" noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title"> ${element.title}</h5>
                    <p class="card-text"> ${element.text}</p>
                    <button id = '${index}' onclick="deleteNote(this.id)"  class="btn btn-primary">Delete Note</button>
                </div>
            </div>
            </div>`;
    });
    let notesElm = document.getElementById('notes')
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use  "add a note" section`
    }
}

// delete a note function
function deleteNote(index) {
    // console.log('I am deleting', index)

    let notes = localStorage.getItem('notes')   // getting notes from local storage
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj))
    showNotes()
}

// search function
let search = document.getElementById('searchTxt')
search.addEventListener('input', function () {

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard')
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText
        if (cardTxt.includes(inputVal)) {
            element.style.display = 'block'
        }
        else {
            element.style.display = 'none'
        }
        // console.log(cardTxt)

    })
})
/*
Further Features:
1. Add Title
2. Mark a note to important
3. separate notes by user
4. Sync and hot to web server 
*/
