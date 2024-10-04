const brailleDict={
        "a": "O.....", 
        "b": "O.O...",
        "c": "OO....", 
        "d": "OO.O..", 
        "e": "O..O..",
        "f": "OOO...", 
        "g": "OOOO..", 
        "h": "O.OO..", 
        "i": ".OO...", 
        "j": ".OOO..",
        "k": "O..O..", 
        "l": "O.OO..", // Add more letters
        "1": "O.....", 
        "2": "O.O...", // Add numbers (same as letters but with number prefix)
        "o.....": "a",
        "cap": ".....O", // Capital follows symbol
        "num": ".O.OOO", // Number follows symbol
        " ": "......",  // Space
};



function isBraille(input) {
    return /^[O\. ]+$/.test(input);  // Matches only O, ., and spaces
}


function brailleToEnglish(brailleStr){
    let brailleWords = brailleStr.split(" ");  // Braille chars are separated by spaces
    let result = "";
    let isCapital = false;
    let isNumber = false;
    
    for (let brailleChar of brailleWords) {
        if (brailleChar === brailleDict['cap']) {
            isCapital = true;
        } else if (brailleChar === brailleDict['num']) {
            isNumber = true;
        } else {
            // Reverse lookup for Braille to English
            let englishChar = Object.keys(brailleDict).find(key => brailleDict[key] === brailleChar);
            
            if (isCapital) {
                englishChar = englishChar.toUpperCase();
                isCapital = false;
            }
            if (isNumber) {
                // Assuming numbers map to letters a-j
                englishChar = String(parseInt(Object.keys(brailleDict).indexOf(englishChar)) + 1);
                isNumber = false;
            }
            result += englishChar;
        }
    }
    return result;
}



function englishToBraille(englishStr) {
    let result = "";
    
    for (let char of englishStr) {
        if (char >= 'A' && char <= 'Z') {
            result += brailleDict['cap'];  // Add capital symbol before letter
            result += brailleDict[char.toLowerCase()];
        } else if (char >= '0' && char <= '9') {
            result += brailleDict['num'];  // Add number symbol
            result += brailleDict[String.fromCharCode(char.charCodeAt(0) - '1'.charCodeAt(0) + 'a'.charCodeAt(0))];  // Map number to letter
        } else {
            result += brailleDict[char];  // Regular letter
        }
        result += " ";  // Separate each Braille char by space
    }
    
    return result.trim();  // Remove trailing space
};




document.getElementById('translateButton').addEventListener('click',function(){
    const inputText=
    document.getElementById('inputText').value;
    let translatedText=" ";
    if (isBraille(inputText)){
        translatedText=brailleToEnglish(inputText);
    }else{
        translatedText=englishToBraille(inputText);
    }
    document.getElementById('result').textContent=translatedText;
});

















