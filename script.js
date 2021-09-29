'use strict'

//DOM VARIABLES
const button = document.querySelector('#btn-check')
const inputGuess = document.querySelector('.guess')
const message = document.querySelector('.message')
const scoreView = document.querySelector('.score')
const numberView = document.querySelector('.number')
const chancesBox = document.querySelector('.chances')
const chancesView = document.querySelector('.chances-view')
const highscoreView = document.querySelector('.highscore')
const again = document.querySelector('#again')

//CHECK BUTTON
button.addEventListener('click', function (event) {
    const randomNumber = randomNumberGenerator(1, 20)
    guessNumber(randomNumber)
    inputGuess.focus()
})

//RANDOM NUMBER GENERATOR
function randomNumberGenerator(min, max) {
    const randomNumber = Math.floor(Math.random() * max - min) + min
    return randomNumber
}

//VARIABLES
let score = 0
let chances = 10
let highscoreCounter = 0

function guessNumber(randomNumber) {
    message.textContent = 'Start guessing...'

    //input validation
    if (inputGuess.value <= 0 || inputGuess.value > 20) {
        message.textContent =
            'No valid number, please type a number between 1 and 20!'
        return
    }

    if (inputGuess.value == randomNumber) {
        message.classList.remove('wrong')
        message.classList.add('strike')
        message.textContent = 'Strike!! +1 point'
        score++
        scoreView.textContent = score
        numberView.textContent = randomNumber
        highscoreCounter++
    } else {
        message.classList.remove('strike')
        message.classList.add('wrong')
        message.textContent = 'Wrong!! -1 chance'
        numberView.textContent = '?'
        chances--
        chancesView.textContent = chances
    }

    if (chances == 0) {
        again.classList.remove('hide')
        button.classList.add('hide')
        inputGuess.classList.add('hide')
        message.classList.add('hide')
        chancesBox.classList.add('hide')
        numberView.classList.add('youlose')
        numberView.textContent =
            'You have no chances left, click on again button try again!'
    }
}

again.addEventListener('click', event => {
    //highscore saver
    if (score >= highscoreCounter) {
        highscoreView.textContent = highscoreCounter
    }

    //variables reset
    chances = 10
    chancesView.textContent = chances
    score = 0
    scoreView.textContent = '20'
    highscoreCounter = 0
    inputGuess.value = ''
    numberView.textContent = '?'
    message.classList.remove('wrong')
    message.classList.remove('strike')
    message.textContent = 'Start guessing...'

    //view manipulation
    button.classList.remove('hide')
    inputGuess.classList.remove('hide')
    scoreView.classList.remove('hide')
    message.classList.remove('hide')
    chancesBox.classList.remove('hide')
    numberView.classList.remove('youlose')
    again.classList.add('hide')

    inputGuess.focus()
})
