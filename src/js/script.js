let firstNumber = ''; // Первое число
let secondNumber = ''; // Второе число
let sign = ''; // Знак

let finish = false;

const digits = ['0','1','2','3','4','5','6','7','8','9','.']; // Массив из цифр и точки, для проверки значений при нажатии на кнопку
const actions = ['+','-','/','x','%']; // Массив из знаков

const out = document.querySelector('.input p'); // Форма вывода значения в <p>

const clearAll = () => { // Функция очистки формы и переменных
    firstNumber = ''; 
    secondNumber = ''; 
    sign = ''; 
    finish = false;
    out.textContent = 0; // Очистка
}

document.querySelector(".ac").onclick = clearAll; // Очистка формы

document.querySelector(".buttons").onclick = (event) => {
    if(!event.target.classList.contains('btn')) return; // Кнопка не нажата
    if(event.target.classList.contains('ac')) return; // Нажата кнопка ac(clearAll)

    out.textContent = ''; // Очищение формы
    const key = event.target.textContent; // Получаем значение кнопки

    if(digits.includes(key)){ // Добавление цифр и точки в переменные 1 и 2
        if(secondNumber === '' && sign === '') {
            firstNumber += key; // Добавление к  первому числу цифер с кнопки
            out.textContent = firstNumber;
        } else if (firstNumber !== '' && secondNumber !== '' && finish) { // Добавление цифр ко второму числу
            secondNumber += key;
            finish = false;
            out.textContent = secondNumber;
        } else { // Добавление к  втором числу цифер с кнопки
            secondNumber += key;
            out.textContent = secondNumber;
        }
        console.log(firstNumber, sign, secondNumber);
        return;
    }
    const resultСalculation = () => { // Функция расчетов 
        if (secondNumber === '') secondNumber = firstNumber; // Если второе число не введено, то используем вместо него firstNumber 
        switch (sign) {
            case "+": // Сложение
                firstNumber = (+firstNumber) + (+secondNumber);
                break;
            case "-": // Вычитание 
                firstNumber = firstNumber - secondNumber;
                break;
            case "x": // Умножение
                firstNumber = firstNumber * secondNumber;
                break;
            case "%": // Процент от деления
                firstNumber = firstNumber % secondNumber;
                break;
            case "/": // Деление
                if (secondNumber === '0') { // Проверка на 0, если 0, то выводим Error
                    out.textContent = 'Error'; 
                    firstNumber = '';
                    secondNumber = '';
                    sign = '';
                    return;
                }
                firstNumber = firstNumber / secondNumber;
                break;
        }
        finish = true;
        out.textContent = firstNumber;
    }
    if(actions.includes(key)){ // Запись знака в переменную
        if(firstNumber !== '' && secondNumber !== '') { // Вычисление без знака равно
            resultСalculation(); 
            out.textContent = firstNumber;
            secondNumber = '';
        }
        sign = key; // Запись знака в переменную
        out.textContent = sign;
        return;
    }
    if(key === '+/-') { // Добавление минуса к числу по кнопке
        if(secondNumber === '') {
            firstNumber = '-' + firstNumber;
            out.textContent = firstNumber;
        } else {
            secondNumber = '-' + secondNumber;
            out.textContent = secondNumber;
        }
    }

    // Получение результата по кнопке =
    if(key === '=') {
        resultСalculation();
    }
}