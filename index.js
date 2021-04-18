
var peopleArr = null;

$.ajax({
  url: "https://randomuser.me/api/?results=12", 
  dataType: "json",
  success: function (data) {
    console.log(data);
    createCards(data);
    peopleArr = data; 
    let cards = document.getElementsByClassName("card");
    for (let i = 0; i < cards.length; i++) {
      let index = i;
      cards[i].addEventListener("click", (e) => {
        let person = peopleArr.results[index]; 
        populateModal(person); 
        modalOverlay.classList.add("open");
      });
    }
  },
});

function createCards(data) {
  for (let i = 0; i < data.results.length; i++) {
    console.log(data.results[i]); 
    let person = (data.results[i]);
    people.innerHTML += createCard(person, i);
  }
}

function createCard(person, index) {
  let card = `<div class="card" data-index="${index}">
    <img src="${person.picture.medium}"> 
    <div class="cardText"> 
    <h3 class="bold">${person.name.first} ${person.name.last} </h3>
    <p class="email">${person.email}</p> 
    <p class="location">${person.location.city}</p>
    </div>
    </div>`;
  return card;
}

function populateModal(person) {
  let modalInfo = `<img src="${person.picture.large}"><img src="./icons/x.png" class="closeX" alt="close">
    <h3 class="bold">${person.name.first} ${person.name.last} </h3>
    <p class="email">${person.email}</p> 
    <p class="location">${person.location.city}</p>
    <hr>
    <p>${person.cell}</p>
    <p>${person.location.street.number} ${person.location.street.name} ${person.location.city} ${person.location.postcode}</p>
    <p>Birthday: ${moment(person.dob.date).format('MM/DD/YYYY')}</p>
    `
    modal.innerHTML = modalInfo; 
    var closeIcon = document.querySelector(".closeX");
    closeIcon.addEventListener('click', function() {
      modalOverlay.classList.remove("open");
    });

}

var overlay = document.querySelector(".modalOverlay");

function closeModal() {
  modalOverlay.classList.remove("open");
};


