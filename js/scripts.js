// Uniform CSPRNG from https://github.com/ckknight/random-js
let rng = Random.engines.browserCrypto;

// Draw the dice inputs
function drawDiceInputs(){
    let numRows = document.getElementById("numWords").value;
    let innerHTML = "";
    for (let i = 0; i < numRows; i++){
        innerHTML += "<div class='row' id='row" + (i + 1).toString() + "'>";

        for (let j = 1; j <= 5; j++){
            innerHTML += "<input type='text' class='dice-digit' id='" + (i * 5 + j).toString() + "' pattern='[1-6]' maxlength='1' />";
        }
        innerHTML += "</div>";
    }
    document.getElementById("dice-inputs").innerHTML = innerHTML;
    clearPassphrase();
}

// Clear all inputs
function clearDiceInputs(){
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++){
        if (inputs[i].type == "text"){
            inputs[i].value = "";
        }
    }
    clearPassphrase();
}

// Clear the passphrase div
function clearPassphrase(){
    document.getElementById("generated-passphrase").innerHTML = "";
}


// Pull the info from the dropdowns into a JSON
function getOptions(){
    let options = {};
    options["separator"] = " ";

    let opts = document.getElementById("numWords");
    options["numWords"] = parseInt(opts.value);

    opts = document.getElementById("wordList");
    options["wordList"] = opts.value;

    opts = document.getElementById("separatorType");
    options["separator"] = opts.value;

    opts = document.getElementById("capitalization");
    options["capitalize"] = opts.value;



    return options;
}

// Fill the diceroll-inputs with PRNG numbers
function fillRandom(){
    let options = getOptions();
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++){
        if (inputs[i].type == "text"){
            inputs[i].value = Random.die(6)(rng);
        }
    }

    generatePassphrase();
}

// Given inputs and options, generate a passphrase
function generatePassphrase(){
    let passphrase = ""
    let passphraseWords = [];
    let options = getOptions();
    let separator = options["separator"];
    let capitalize = options["capitalize"];
    let numWords = options["numWords"];
    let list = options["wordList"];
    let wordList;
    switch (list){
        case "eff_en":
            wordList = eff_en;
            break
        case "diceware_ca":
            wordList = diceware_ca;
            break;
        case "diceware_da":
            wordList = diceware_da;
            break;
        case "diceware_de":
            wordList = diceware_de;
            break;
        case "diceware_es":
            wordList = diceware_es;
            break;
        case "diceware_fr":
            wordList = diceware_fr;
            break;
        case "diceware_ja":
            wordList = diceware_ja;
            break;
        case "diceware_mi":
            wordList = diceware_mi;
            break;
        case "diceware_nl":
            wordList = diceware_nl;
            break;
        case "diceware_pl":
            wordList = diceware_pl;
            break;
        case "diceware_sv":
            wordList = diceware_sv;
            break;
        default:
            wordList = diceware_en;
            break;
    }

    //for each row, get the five inputs
    //if all five are valid dice rolls, add a word
    let rows = document.getElementsByClassName("row");
    for (let i = 0; i < rows.length; i++){
        let diceinputs = rows[i].getElementsByClassName("dice-digit");
        let dicerolls = [];
        let validInput = true;
        for (let d = 0; d < diceinputs.length; d++){
            dicerolls.push(diceinputs[d].value);
        }
        for (let j = 0; j < dicerolls.length; j++){
            if (! /^[1-6]/.test(dicerolls[j])){
                validInput = false;
            }
        }

        if (validInput){
            let chunk = dicerolls.join("");
            let word = wordList[chunk];
            passphraseWords.push(word);
        }
    }

    // Turn the word list into passphrase - obey capitalization and separators
    if (capitalize === "none"){
        for (let i = 0; i < passphraseWords.length; i++){
            passphrase += (passphraseWords[i] + separator);
        }
    } else if (capitalize === "first"){
        for (let i = 0; i < passphraseWords.length; i++){
            let word = passphraseWords[i];
            let capitalWord = word.charAt(0).toUpperCase() + word.slice(1);
            passphrase += (capitalWord + separator);
        }

    } else if (capitalize === "random"){
        for (let n = 0; n < passphraseWords.length; n++){
            let word = passphraseWords[n];
            for (let i = 0; i < word.length; i++){
                if (Random.bool()(rng)){
                    passphrase += word.charAt(i).toUpperCase();
                } else{
                    passphrase += word.charAt(i);
                }
            }
            passphrase += separator;
        }
    }

    //remove last trailing separator, if it's there
    if (separator !== ""){
        passphrase = passphrase.slice(0,-1);
    }

    document.getElementById("generated-passphrase").innerHTML = passphrase;
}

window.onload = function(){
    document.getElementById("clear").onclick = clearDiceInputs;
    document.getElementById("generate").onclick = fillRandom;
    document.getElementById("wordList").onchange = generatePassphrase;
    document.getElementById("numWords").onchange = drawDiceInputs;
    document.getElementById("separatorType").onchange = generatePassphrase;
    document.getElementById("capitalization").onchange = generatePassphrase;
    window.addEventListener("input", generatePassphrase);
    drawDiceInputs(); // start with default of six words
}
