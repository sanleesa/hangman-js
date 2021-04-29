/**
 * Hangman Javascript class
 * Author: @jelofsson
 * Author: @JadeMaverc
 **/

var wordlist = [{
        "word": "ELEPHANTS",
        "hint": "Only animals that can't jump"
    },
    {
        "word": "TONGUE",
        "hint": "Like fingerprints, everyone's what print is different"
    },
    {
        "word": "HONEY",
        "hint": "The only food that doesn't spoil is"
    },
    {
        "word": "BREATH",
        "hint": "You can't kill yourself by holdingy your"
    },
    {
        "word": "TYPEWRITER",
        "hint": "The longest word that can be made using the letters only on one row on the keyboard"
    },
    {
        "word": "TONGUE",
        "hint": "It's the longest muscle in our body"
    },
    {
        "word": "CARBON MONOXIDE",
        "hint": "What can kill a person in less than 15 minutes"
    },
    {
        "word": "DRAGONFLIES",
        "hint": "The fastest insects, flying 50 to 60 mph"
    },
    {
        "word": "ANTARCTICA",
        "hint": "Corn is grown on every continent except"
    },
    {
        "word": "HEARING",
        "hint": "Which  is the fastest human sense"
    },
    {
        "word": "RHYTHM",
        "hint": "The longest English word without a vowel"
    },
    {
        "word": "THIGH BONES",
        "hint": "One part of human body is stronger than concrete"
    },
    {
        "word": "EARTH",
        "hint": "The only planet not named after a God"
    },
    {
        "word": "PEDESTRAIN",
        "hint": "One who goes on foot"
    },
    {
        "word": "BILINGUAL",
        "hint": "One who speaks two languages"
    },
    {
        "word": "RETICENT",
        "hint": "One who speaks less"
    },
    {
        "word": "BLOBFISH",
        "hint": "What is the ugliest animal in the world"
    },
    {
        "word": "DENTISTRY",
        "hint": "Name the oldest profession in the world"
    },
    {
        "word": "SOUTH KOREA",
        "hint": "Only places you cant buy coca cola"
    },
    {
        "word": "FRANCE",
        "hint": "A country which is visited by most of the people around the world"
    },
    {
        "word": "JAPAN",
        "hint": "World most prone to  earthquake country "
    }
];

var Hangman = (function() {

    'use strict';

    function Hangman(elId) {

        // Dom is ready
        this.elId = elId;
        this.words = [];
        this.hints = [];

        wordlist.forEach(entry => {
            this.words.push(entry.word);
            this.hints.push(entry.hint);
        })

        // Hide the flower
        this.hideElementById(this.elId + "_1", null)
        this.hideElementById(this.elId + "_2", null)
        this.hideElementById(this.elId + "_3", null)
        this.hideElementById(this.elId + "_4", null)
        this.hideElementById(this.elId + "_5", null)
        this.hideElementById(this.elId + "_6", null)
    }

    Hangman.prototype.reset = function() {

        // Reset variables
        this.STOPPED = false;
        this.MISTAKES = 0;
        this.GUESSES = [];
        this.INDEX = Math.floor(Math.random() * this.words.length);
        this.WORD = this.words[this.INDEX];
        this.HINT = this.hints[this.INDEX];

        // Reset Elements
        this.hideElementByClass('h');
        this.showElementByIdWithContent(this.elId + "_guessbox", null);
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedfWord());
        this.showElementByIdWithContent(this.elId + "_hintbox", "<button onclick='Hangman.showHint(); return false'>HINT</button>");

        // Show the flower
        this.showElementByIdWithContent(this.elId + "_1", null)
        this.showElementByIdWithContent(this.elId + "_2", null)
        this.showElementByIdWithContent(this.elId + "_3", null)
        this.showElementByIdWithContent(this.elId + "_4", null)
        this.showElementByIdWithContent(this.elId + "_5", null)
        this.showElementByIdWithContent(this.elId + "_6", null)

        // Show spaces
        this.guess(' ');
    };

    Hangman.prototype.showHint = function() {

        // Replace button with hint text
        this.showElementByIdWithContent(this.elId + "_hintbox", this.HINT);
    }

    Hangman.prototype.guess = function(guess) {

        // Uppercase the guessed letter
        guess = guess.charAt(0).toUpperCase();

        if (this.STOPPED || this.GUESSES.indexOf(guess) > -1) {
            // Game stopped or allready guessed on that letter
            return;
        }

        // Add the letter to array GUESSES
        this.GUESSES.push(guess);
        // Update the word hint
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedfWord());
        // Update the guessed letter list
        this.showElementByIdWithContent(this.elId + "_guesses", this.GUESSES.join(''));

        if (this.WORD.indexOf(guess) < 0 && guess != ' ') {

            // Incorrect guess
            this.MISTAKES++;

            // Hide a petal
            this.hideElementById(this.elId + "_" + this.MISTAKES, null);

            if (this.MISTAKES === 6) {
                // Game Over
                this.showElementByIdWithContent(this.elId + "_end", "GAME OVER!<br/>The word was: " + this.WORD);
                this.STOPPED = true;
                return;
            }

        } else if (this.WORD.indexOf(this.getGuessedfWord()) !== -1) {
            // Victory
            this.showElementByIdWithContent(this.elId + "_end", "You made it!<br/>The word was: " + this.WORD);
            this.STOPPED = true;
            return;
        }

    };

    Hangman.prototype.showElementByIdWithContent = function(elId, content) {
        if (content !== null) {
            document.getElementById(elId).innerHTML = content;
        }
        document.getElementById(elId).style.opacity = 1;
    };

    Hangman.prototype.hideElementById = function(elId) {
        document.getElementById(elId).style.opacity = 0;
    }

    Hangman.prototype.hideElementByClass = function(elClass) {
        var elements = document.getElementsByClassName(elClass),
            i;
        for (i = 0; i < elements.length; i++) {
            elements[i].style.opacity = 0;
        }
    };

    Hangman.prototype.getGuessedfWord = function() {
        var result = "",
            i;
        for (i = 0; i < this.WORD.length; i++) {
            // Word characters
            result += (this.GUESSES.indexOf(this.WORD[i]) > -1) ?
                this.WORD[i] : "_";
        }
        return result;
    };

    return new Hangman('hangm');

}());