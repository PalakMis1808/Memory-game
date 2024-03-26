const cardBoxArray = [
    {
        'name': 'panda',
        'img': 'CardImages/panda.jpg'
    },
    {
        'name': 'bird',
        'img': 'CardImages/bird.jpg'
    },
    {
        'name': 'puppy',
        'img': 'CardImages/puppy.jpg'
    },
    {
        'name': 'elephant',
        'img': 'CardImages/elephant.jpg'
    },
    {
        'name': 'rabbit',
        'img': 'CardImages/rabbit.jpg'
    },
    {
        'name': 'tiger',
        'img': 'CardImages/tiger.jpg'
    },
    {
        'name': 'peacock',
        'img': 'CardImages/peacock.jpg'
    },
    {
        'name': 'hamster',
        'img': 'CardImages/hamster.jpg'
    },
];

const JsGridCardsImages = document.querySelector('#grid');



//duplicating all elements

const gameCardBoxArray=cardBoxArray.concat(cardBoxArray);

//randomising its indexes
const shuffleCardArray=(array)=>{
    for(let i=array.length-1;i>=0;i--){
        let j= Math.floor(Math.random()*(i))
        let temp= array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    return array;
}

const shuffleChildCardArray= shuffleCardArray(gameCardBoxArray);

for(let i = 0; i < shuffleChildCardArray.length; i++) {

    const createdElement = document.createElement('div');
    createdElement.classList.add('grid-item');
    createdElement.dataset.name= shuffleChildCardArray[i].name;
    //createdElement.style.backgroundImage = `url(${shuffleChildCardArray[i].img})`;
    


    //create front div of each tiles
    const frontTileDiv= document.createElement('div');
    frontTileDiv.classList.add('frontTile');

    //create back div of each tiles
    const backTileDiv= document.createElement('div');
    backTileDiv.classList.add('backTile');

    //add image to tile's back
    backTileDiv.style.backgroundImage = `url(${shuffleChildCardArray[i].img})`;

    //creating tiles
    JsGridCardsImages.appendChild(createdElement)

    //creating front div and back div in each tile
    createdElement.appendChild(frontTileDiv);
    createdElement.appendChild(backTileDiv);
}


let TotalScore=0;
let TotalChances=10;
let ChancesLeft=10;
let score=0;

let play = true;
let countOfSelectedCards=0;
let firstSelectedCard= "";
let secondSelectedCard= "";
let scoreText=document.querySelector('#score p');
let ChancesLeftText=document.querySelector('#chanceLeft p');
let maximumScoreText= document.querySelector('#maximumScore p');
let gridItemArray = document.querySelectorAll('.grid-item');

gridItemArray.forEach(card => {
    card.addEventListener('click', e => {
        let currentSelectedCard = e.target.parentNode; // Target the parent node

        // If two cards are selected
        countOfSelectedCards++;
         if (countOfSelectedCards < 3) {
            if(countOfSelectedCards===1){
                currentSelectedCard.classList.add('selectedCard');
                firstSelectedCard= currentSelectedCard.dataset.name;
            }
            else{
                currentSelectedCard.classList.add('selectedCard');
                secondSelectedCard= currentSelectedCard.dataset.name;
            }
            if(firstSelectedCard!="" && secondSelectedCard!=""){
                if(firstSelectedCard===secondSelectedCard){
                    setTimeout(() => {
                        cardMatch();
                        reset();
                    }, 1000);
                }
                else{
                    setTimeout(() => {
                        reset();
                    }, 1000);
                }
            }
        }
    })
});
const cardMatch =()=>{
    let cardSelected = document.querySelectorAll('.selectedCard');
    cardSelected.forEach((elem) =>{
        elem.classList.add('matchedCards');
    });
    score+=2;
    updateScoreBoard(score);
}
const reset =()=>{
    firstSelectedCard="";
    secondSelectedCard="";
    countOfSelectedCards=0;
    let cardSelected= document.querySelectorAll('.selectedCard');
    cardSelected.forEach(e=>{
        e.classList.remove('selectedCard');
    });
    ChancesLeft--;
    updateChances(ChancesLeft);
}

function updateScoreBoard(s) {
    scoreText.textContent=s;
    return;
}
function updateChances(c) {
    ChancesLeftText.textContent=c;
    if(c==0){
        endGame();
    }
    return;
}
const endGame =()=>{
    TotalScore=Math.max(score,TotalScore);
    maximumScoreText.textContent=TotalScore;
    ChancesLeft=10;
    let matchingCards= document.querySelectorAll('.matchedCards');
    matchingCards.forEach(e=>{
        e.classList.remove('matchedCards');
    });
    updateChances(ChancesLeft);
    score=0;
    updateScoreBoard(score);
}