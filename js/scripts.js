//Random.js from https://github.com/ckknight/random-js

function getOptions(){
    let options = {};

    options["separator"] = " ";

    let opts = document.getElementsByTagName("input");
    for (var i = 0; i < opts.length; i++){
        if(opts[i].name == "separatorType" && opts[i].checked){
            options["separator"] = opts[i].value;
        }
        if(opts[i].name == "rngEngine" && opts[i].checked){
            options["rng"] = opts[i].value;
        }
        if(opts[i].name == "capitalization" && opts[i].checked){
            options["capitalize"] = opts[i].value;
        }
    }
    return options;
}

function rngEngine(rngType){
    if (rngType === "native"){
        return Random.engines.nativeMath;
    } else if (rngType === "browserCrypto"){
        return Random.engines.browserCrypto;
    } else if (rngType === "mersenne"){
        return Random.engines.mt19937().autoSeed();
    }
}

function fillRandom(){
    let options = getOptions();
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++){
        if (inputs[i].type == "text"){
            inputs[i].value = Random.die(6)(rngEngine(options["rng"]));
        }
    }
}

function generatePassphrase(){
    let passphrase = ""
    let passphraseWords = [];
    let options = getOptions();
    let separator = options["separator"];
    let capitalize = options["capitalize"];
    let rng = rngEngine(options["rng"]);
    console.log(options);

    //step 1 - get the dicerolls
    let dicerolls = [];
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++){
        if (inputs[i].type == "text"){
            dicerolls.push(inputs[i].value);
        }
    }

    //step 2 - get word list
    let numWords = Math.ceil(dicerolls.length / 5);
    for (let n = 0; n < numWords; n++){
        let chunk = dicerolls.slice(n*5,(n*5)+5);
        let word = wordList[chunk.join("")];
        passphraseWords.push(word);
    }

    //step 3 - turn word list into password
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
    document.getElementById("generated-password").innerHTML = passphrase.slice(0,-1);
}

window.onload = function(){
    document.getElementById("clear").onclick = function(){
        let inputs = document.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++){
            if (inputs[i].type == "text"){
                inputs[i].value = "";
            }
        }
    }
    document.getElementById("generate").onclick = generatePassphrase;
    document.getElementById("random-fill").onclick = fillRandom;

}
