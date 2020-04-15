const ul = document.querySelector(".authors");
const url = "https://randomuser.me/api/?results=4";

function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function createBusinessCard(person) {
  const { name, location, email, phone } = person;
  const { title, first, last } = name;
  const { street, city, postcode} = location;
  return `<div class="card">
    <div class="card-container">
      <div class="row header">
        <img src=${person.picture.thumbnail} alt="picture-${first}">
        <h2>${title} ${first} ${last}</h2>
      </div>
      <div class="row">
        <p class="address">${street.number} ${street.name}, ${postcode}, ${city}</p>
      </div>
      <div class="row contact">
        <p class="email">${email}</p>
        <p class="phone">${phone}</p>
      </div>
    </div>
  </div>`;
}

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    let authors = data.results;
    return authors.map(author => {
      const li = createNode("li");
      li.insertAdjacentHTML('afterbegin', createBusinessCard(author));
      append(ul, li);
    });
  })
  .catch(err => console.log(err));
