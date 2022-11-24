//get all our elements and we're assigning them to a variable
const buttonMain = document.getElementById('main');
const table = document.getElementById('table');
const buttonOne = document.getElementById('add-user');
const buttonTwo = document.getElementById('double');
const buttonThree = document.getElementById('show-millionaires');
const buttonFour = document.getElementById('Sort');
const buttonFive = document.getElementById('calculate-wealth');

// to store each user
let data = [];

//adds new user
function addUser (obj){
    data.push(obj);
}  
    
// get random user
function getRandomUser() {
    fetch("https://randomuser.me/api")
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const user = data.results[0]


        const newUser = {
            name: `${user.name.title} ${user.name.first} ${user.name.last}`,
            dob: `${user.dob.age} years`,
            location:`${user.location.city}`,
            money: `$ ${Math.floor(Math.random() * 1000000)}`,
            img: user.picture.thumbnail
        }

        addUser(newUser)
    })
    updateDOM();
}

getRandomUser();

//double money
function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2}
    })
    
    updateDOM();
}

// show only millionaires
function showOnlyMillionaires() {
 data = data.filter(user => user.money >= 1000000);
 
 updateDOM()
}

// sort by Richest
function sortByRichest () {
 data.sort ((a, b) => b.money - a.money)

 updateDOM();
}

// calculate entire wealth
function calculateWealth(){
 const wealth = data.reduce((acc, user) => (acc += user.money), 0)

 const wealthE1 = document.createElement('div');
 wealthE1.innerHTML = `<h3>Total wealth: <strong>$${wealth}</strong></h3>`

 main.appendChild(wealthE1)
}

//updating the DOM
function updateDOM(providedData = data) {
    // main.innerHTML = '<h2><strong> Photo </strong> <strong> Person </strong> <strong> Age </strong> <strong> Location </strong> <strong> Wealth </strong></h2>'

    providedData.forEach(function(item){
        const element = document.createElement('tr');
        // element.classList.add('person');
        element.innerHTML = `
        <td><img style="border-radius: 50%" src=${item.img} /></td>
        <td>${item.name}</td>
         <td><strong>${item.dob}</strong></td>
         <td><strong>${item.location}</strong></td>
         <td>${item.money}</td>
         `

        table.appendChild(element);
    })
}

//event listeners
buttonOne.addEventListener('click', getRandomUser);
buttonTwo.addEventListener('click', doubleMoney);
buttonThree.addEventListener('click', showOnlyMillionaires);
// buttonFour.addEventListener('click', sortByRichest);
buttonFive.addEventListener('click', calculateWealth);