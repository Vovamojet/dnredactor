const originListInput = document.getElementById('originListInput');
const addInputForm = document.getElementById('addListInput');
const delInputForm = document.getElementById('delListInput');
const textResult = document.getElementById('textResult');
textResult.readOnly = true;
const textCommentOriginDuplicates = document.getElementById('text-comment-origin-duplicates');
const textCommentAddDuplicates = document.getElementById('text-comment-add-duplicates');
const textCommentDelDuplicates = document.getElementById('text-comment-del-duplicates');
const textCommentAddCompare = document.getElementById('text-comment-add-compare');
const textCommentDelCompare = document.getElementById('text-comment-del-compare');
const textCommentOriginWrongSymbols = document.getElementById('text-comment-origin-wrongsymbols');
const textCommentAddWrongSymbols = document.getElementById('text-comment-add-wrongsymbols');
const textCommentDelWrongSymbols = document.getElementById('text-comment-del-wrongsymbols');
const textCounterOrigin = document.getElementById('text-counter-origin');
const textCounterAdd = document.getElementById('text-counter-add');
const textCounterDel = document.getElementById('text-counter-del');
const textCounterResult = document.getElementById('text-counter-result');
const resultButton = document.getElementById('resultButton');
const buttonOriginListClear = document.getElementById('buttonOriginListClear');
const buttonAddListClear = document.getElementById('buttonAddListClear');
const buttonDelinListClear = document.getElementById('buttonDelListCrear');
const buttonResultListCrear = document.getElementById('buttonResultListCrear');
const buttonReplace = document.getElementById('buttonReplace');


let listArray = [];

function listHasIncorrectSymbols(list, field) {
    let incorrectSymbolsSet = new Set();

    for (let symbol of list) {
        if (!/[0-9\n]/.test(symbol)) {
            incorrectSymbolsSet.add(symbol);
        };
    };

    const incorrectSymbolsArray = Array.from(incorrectSymbolsSet);

    if (incorrectSymbolsArray.length > 0) {
        field.innerHTML = ("В списке обнаружены некорректные символы: " + incorrectSymbolsArray.join(', '));
        field.style.color = 'red';
    } else {
        field.innerHTML = ('Некорректных символов в списке не обнаружено;');
        field.style.color = '#45a039';
    };
};

function arrayHasDuplicates(inputList, field) {
    const listArray = inputList.split('\n');
    const countItems = {};

    //если элемент уже был и является числом, то + 1, иначе ставим 1
    for (const item of listArray) {
        const numberItem = parseInt(item);
        
        if (!isNaN(numberItem)) {
            countItems[numberItem] = countItems[numberItem] ? countItems[numberItem] + 1 : 1;
        };
    }

    const result = Object.keys(countItems).filter((item) => countItems[item] > 1);
    const listOfDuplicates = result.join(", ");

    if (listOfDuplicates) {
        field.innerHTML = ('Обнаружены дубликаты: ' + listOfDuplicates + ';');
        field.style.color = 'red';
    } else {
        field.innerHTML = ('Дубликатов не обнаружено;<br>');
        field.style.color = '#45a039';
    }
}

//Если обнаружен некорректный символ - пробел, то об это не узнать
//сделать кнопку - заменить переносы строк на запятые

function createNewList() {
    const originArray = (originListInput.value).split('\n');
    const addArray = (addListInput.value).split('\n');
    const delArray = (delListInput.value).split('\n');

    const arrayWithAdded = originArray.concat(addArray);
    const resultArray = arrayWithAdded.filter(item => !delArray.includes(item));

    const newList = resultArray.sort((a, b) => a - b).join('\n');
    textResult.value = newList;
    counter(newList, textCounterResult);
}


function compareOrignWithAdd() {
    const originArray = (originListInput.value).split('\n');
    const addArray = (addListInput.value).split('\n');

    if (originListInput.value && addListInput.value) {
        if (originArray.length === 0 || addArray.length === 0) {
            return;
        }
    
        const duplicates = originArray.filter(item => addArray.includes(item));
    
        if (duplicates.length > 0) {
            textCommentAddCompare.innerHTML = ('Обнаружены совпадения с начальным списком: ' + duplicates + ';');
            textCommentAddCompare.style.color = 'red';
        } else {
            textCommentAddCompare.innerHTML = ('Совпадений с первоначальным списком не обнаружено;');
            textCommentAddCompare.style.color = '#45a039';
        }


    } else {
        textCommentAddCompare.innerHTML = ('Совпадений с первоначальным списком не обнаружено;');
        textCommentAddCompare.style.color = '#45a039';
    }



}

function compareDelWithAdd() {
    const delArray = (delListInput.value).split('\n');
    const addArray = (addListInput.value).split('\n');

    if (delArray.length === 0 || addArray.length === 0) {
        return;
    }

    // Фильтруем массивы, чтобы получить только повторяющиеся элементы
    const duplicates = delArray.filter(item => addArray.includes(item));

    if (duplicates.length > 0) {
        textCommentDelCompare.innerHTML = ('Обнаружены совпадения с добавляемым списком: ' + duplicates + ';');
        textCommentDelCompare.style.color = 'red';
    } else {
        textCommentDelCompare.innerHTML = ('Совпадений с добавляемым списком не обнаружено;');
        textCommentDelCompare.style.color = '#45a039';
    };
};

function counter(listInput, text) {
    const listArray = listInput.split('\n');
    text.innerHTML = ('Кол-во строк: ' + listArray.length);
};

function replaceNewlinesWithCommas() {
    const listWithCommas = textResult.value.replace(/\n/g, ",");
    textResult.value = listWithCommas;
}


originListInput.focus();

originListInput.addEventListener('input', function() {
    listHasIncorrectSymbols(originListInput.value, textCommentOriginWrongSymbols);
    arrayHasDuplicates(originListInput.value, textCommentOriginDuplicates);
    counter(originListInput.value, textCounterOrigin);

    if (originListInput.value && addListInput.value) {
        compareOrignWithAdd();
    } else {
        textCommentAddCompare.innerHTML = ('Совпадений с первоначальным списком не обнаружено;');
        textCommentAddCompare.style.color = '#45a039';
    }
});

addListInput.addEventListener('input', function() {
    listHasIncorrectSymbols(addListInput.value, textCommentAddWrongSymbols);
    arrayHasDuplicates(addListInput.value, textCommentAddDuplicates);
    counter(addListInput.value, textCounterAdd);

    if (originListInput.value && addListInput.value) {
        compareOrignWithAdd();
    } else {
        textCommentAddCompare.innerHTML = ('Совпадений с первоначальным списком не обнаружено;');
        textCommentAddCompare.style.color = '#45a039';
    }
});

delListInput.addEventListener('input', function() {
    listHasIncorrectSymbols(delListInput.value, textCommentDelWrongSymbols);
    arrayHasDuplicates(delListInput.value, textCommentDelDuplicates);
    counter(delListInput.value, textCounterDel);

    if (addListInput.value && delListInput.value) {
        compareDelWithAdd();
    } else {
        textCommentDelCompare.innerHTML = ('Совпадений с добавляемым списком не обнаружено;');
        textCommentDelCompare.style.color = '#45a039';
    }
});

resultButton.addEventListener('click', createNewList);

buttonOriginListClear.addEventListener('click', function() {
    originListInput.value ='';
    counter(originListInput.value, textCounterOrigin);
    textCommentOriginWrongSymbols.innerHTML = ('Некорректных символов в списке не обнаружено;');
    textCommentOriginWrongSymbols.style.color = '#45a039';
    textCommentOriginDuplicates.innerHTML = ('Дубликатов не обнаружено;<br>');
    textCommentOriginDuplicates.style.color = '#45a039';
});

buttonAddListClear.addEventListener('click', function() {
    addListInput.value ='';
    counter(addListInput.value, textCounterAdd);
    textCommentAddWrongSymbols.innerHTML = ('Некорректных символов в списке не обнаружено;');
    textCommentAddWrongSymbols.style.color = '#45a039';
    textCommentAddDuplicates.innerHTML = ('Дубликатов не обнаружено;<br>');
    textCommentAddDuplicates.style.color = '#45a039';
    textCommentAddCompare.innerHTML = ('Совпадений с первоначальным списком не обнаружено;');
    textCommentAddCompare.style.color = '#45a039';
});

buttonDelinListClear.addEventListener('click', function() {
    delListInput.value ='';
    counter(delListInput.value, textCounterDel);
    textCommentDelWrongSymbols.innerHTML = ('Некорректных символов в списке не обнаружено;');
    textCommentDelWrongSymbols.style.color = '#45a039';
    textCommentDelDuplicates.innerHTML = ('Дубликатов не обнаружено;<br>');
    textCommentDelDuplicates.style.color = '#45a039';
    textCommentDelCompare.innerHTML = ('Совпадений с добавляемым списком не обнаружено;');
    textCommentDelCompare.style.color = '#45a039';
});

buttonResultListCrear.addEventListener('click', function() {
    textResult.value ='';
    textCounterResult.innerHTML = ('Кол-во строк: 0');
});

buttonReplace.addEventListener('click', replaceNewlinesWithCommas);