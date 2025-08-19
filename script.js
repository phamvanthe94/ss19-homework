let showModalBtn = document.getElementById(`show-modal`);
let closeModalBtn = document.getElementById(`close-btn`);
let modal = document.getElementById(`modal`);
let form = document.getElementById(`bookmarks-form`);
let nameInput = document.getElementById(`website-name`);
let urlInput = document.getElementById(`website-url`);
let bookmarksContainer = document.getElementById(`bookmarks-container`);

let bookmarks = JSON.parse(localStorage.getItem(`bookmarks`)) || [];

function saveBookmarks() {
  localStorage.setItem(`bookmarks`, JSON.stringify(bookmarks));
}

function deleteBookmark(index) {
  bookmarks.splice(index, 1);
  saveBookmarks();
  renderBookmarks();
}

function renderBookmarks() {
  bookmarksContainer.innerHTML = ``;
  bookmarks.forEach(function (bookmark, index) {
    let div = document.createElement(`div`);
    div.className = `bookmark`;

    let a = document.createElement(`a`);
    a.href = bookmark.url;
    a.target = `_blank`;
    a.innerHTML = bookmark.name;

    let deleteBtn = document.createElement(`button`);
    deleteBtn.className = `delete`;
    deleteBtn.innerHTML = `&times;`;
    deleteBtn.onclick = function () {
      deleteBookmark(index);
    };

    div.appendChild(deleteBtn);
    div.appendChild(a);
    bookmarksContainer.appendChild(div);
  });
}

function handleFormSubmit(event) {
  event.preventDefault();

  let name = nameInput.value.trim();
  let url = urlInput.value.trim();

  if (name === "" || url === "") {
    alert(`please enter both name and URl`);
    return;
  }

  if (!url.startsWith(`http`)) {
    url = `http://${url}`;
  }

  bookmarks.push({
    name: name,
    url: url,
  });
  saveBookmarks();
  renderBookmarks();

  form.reset();
  modal.style.display = `none`;
}

function showModal() {
  modal.style.display = `flex`;
}

function closeModal() {
  modal.style.display = `none`;
}

showModalBtn.onclick = showModal;
closeModalBtn.onclick = closeModal;
form.onsubmit = handleFormSubmit;
window.onload = renderBookmarks;
