var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var addButton = document.getElementById("addBtn");
var updateButton = document.getElementById("updateBtn");
var currentIndex;
var bookMarkList = [];


if(localStorage.getItem("bookMarkList") != null) {
    bookMarkList = JSON.parse(localStorage.getItem("bookMarkList"));
    displayBookMark();
}

//c -> create -> add
function addBookMark() {

    var bookMark = {
        //take inputs from user
        name : siteNameInput.value,
        url : siteURLInput.value,
    }
    
    if(bookMark.name && bookMark.url){
        bookMarkList.push(bookMark); 
        updateLocalStorage();
        console.log(bookMarkList);
        displayBookMark();
        clear();
    }
}


//R -> Retreive
function displayBookMark() {
    bookMarkBox = ``;
    for(var i = 0; i<bookMarkList.length; i++) {
        bookMarkBox += `
        <tr class="fw-normal">
                        <td>${i+1}</td>
                        <td>
                            <span>${bookMarkList[i].name}</span>
                        </td>
                        <td class="visitBtn">
                            <button class="btn btn-visit" onclick="visitURL('${bookMarkList[i].url}')">
                                <i class="fa-solid fa-eye pe-2"></i>Visit
                            </button>
                        </td>
                        <td class="updateBtn">
                            <button class="btn btn-update" onclick="getDataToUpdate(${i})">
                                <i class="fa-solid fa-pen-to-square pe-2"></i>Update
                            </button>
                        </td>
                        <td class="deleteBtn">
                            <button class="btn btn-delete pe-3" onclick="deleteBookMark(${i})">
                                <i class="fa-solid fa-trash-can"></i>Delete
                            </button>
                    </tr>
        `
    }
    document.getElementById('allBookMarks').innerHTML = bookMarkBox;
}

function clear() {
    siteNameInput.value = null;
    siteURLInput.value = null;

    siteNameInput.classList.remove('is-valid', 'is-invalid');
    siteURLInput.classList.remove('is-valid', 'is-invalid');
}

//D -> delete
function deleteBookMark(index) {
    // console.log(index);
    bookMarkList.splice(index, 1);
    updateLocalStorage()
    displayBookMark();
}


//U -> update
function getDataToUpdate(index) {
    // console.log(index);
    addButton.classList.add("d-none");
    updateButton.classList.remove("d-none");

    siteNameInput.value = bookMarkList[index].name;
    siteURLInput.value = bookMarkList[index].url;
    currentIndex = index;
}

function updateData() {
    addButton.classList.remove("d-none");
    updateButton.classList.add("d-none");
    bookMarkList[currentIndex].name = siteNameInput.value;
    bookMarkList[currentIndex].url = siteURLInput.value;
    
    updateLocalStorage()
    displayBookMark();
    clear();
}

function visitURL(url) {
    window.open(url, '_blank');
}

function updateLocalStorage() {
    localStorage.setItem("bookMarkList", JSON.stringify(bookMarkList));
}

//validation
function validateInputs(element) {
    var regex = {
        siteName: /^[A-Z][A-Za-z0-9 ]{2,24}$/,
        //!url validation need to be edited
        siteURL: /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,}(\/[^\s]*)?$/i // Regex for URL validation
    };

    if (element.id === 'siteName') {
        // Validate site name
        if (regex.siteName.test(element.value)) {
            // console.log("Site name is valid.");
            element.nextElementSibling.classList.add("d-none");
            element.classList.add("is-valid");
            element.classList.remove("is-invalid");
        } else {
            // console.log("Site name is invalid.");
            element.nextElementSibling.classList.remove("d-none");
            element.classList.remove("is-valid");
            element.classList.add("is-invalid");
        }
    }

    //!url validation need to be edited
    if (element.id === 'siteURL') {
        // Validate URL
        try {
            new URL(element.value); 
            // console.log("URL is valid.");
            element.nextElementSibling.classList.add("d-none");
            element.classList.add("is-valid");
            element.classList.remove("is-invalid");
        } catch (e) {
            // console.log("URL is invalid.");
            element.nextElementSibling.classList.remove("d-none");
            element.classList.remove("is-valid");
            element.classList.add("is-invalid");
        }
    }
}
