
const ul = document.querySelector('.authors'); // Get the list where we will place our authors
const url = 'https://randomuser.me/api/?results=5';

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

fetch(url)
  .then(response => response.json())
  .then(data => {
    let authors = data.results;
    return authors.map(function(author) {
        const { first, last } = author.name;
      let li = createNode('li'),
          img = createNode('img'),
          span = createNode('span');
      img.src = author.picture.large;
      span.textContent = `${first} ${last}`;
      append(li, img);
      append(li, span);
      append(ul, li);
    })
  })
  .catch(function(error) {
    console.log(error);
});
