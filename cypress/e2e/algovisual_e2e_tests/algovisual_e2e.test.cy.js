import { fibonacci } from '../../../src/utils/fibonacci'

const baseUrl = 'http://localhost:3000';
const defaultAnimationDelay = 500;

//Routes
const mainPage = 'algovisual';
const stringPage = 'recursion';
const fibonacciPage = 'fibonacci';
const sortingPage = 'sorting';
const stackPage = 'stack';
const queuePage = 'queue';
const listPage = 'list';

//Selectors
//Used on every pages:
const mainTextInput = '[data-testid="text-input"]';
const submitBtn = '[data-testid="submit-btn"]';
const mainCircles = '[data-testid="main-circle"]';
const headCircles = '[data-testid="head-circle"]';
const tailCircles = '[data-testid="tail-circle"]';

//Stack & queue pages
const deleteBtn = '[data-testid="delete-btn"]';
const resetBtn = '[data-testid="reset-btn"]';
const circlesContainer = '[data-testid="circles-container"]';

//List page
const addHeadBtn = '[data-testid="add-head-btn"]';
const addTailBtn = '[data-testid="add-tail-btn"]';
const deleteHeadBtn = '[data-testid="delete-head-btn"]';
const deleteTailBtn = '[data-testid="delete-tail-btn"]';
const addIndexBtn = '[data-testid="add-index-btn"]';
const deleteIndexBtn = '[data-testid="delete-index-btn"]';
const indexInput = '[data-testid="index-input"]';
const tailIndexes = '[data-testid="tail-index"]';



describe('Общие тесты приложения', () => {
    it(`Приложение запускается по адресу ${baseUrl}/${mainPage}`, () => cy.visit(baseUrl));
    it(`Работает роутинг на страницу Строка`, () => {
        cy.visit(`${baseUrl}/${stringPage}`);
        cy.contains('Строка');
    })
    it(`Работает роутинг на страницу Последовательность Фибоначчи`, () => {
        cy.visit(`${baseUrl}/${fibonacciPage}`);
        cy.contains('Последовательность Фибоначчи');
    })
    it(`Работает роутинг на страницу Сортировка массива`, () => {
        cy.visit(`${baseUrl}/${sortingPage}`);
        cy.contains('Сортировка массива');
    })
    it(`Работает роутинг на страницу Стек`, () => {
        cy.visit(`${baseUrl}/${stackPage}`);
        cy.contains('Стек');
    })
    it(`Работает роутинг на страницу Очередь`, () => {
        cy.visit(`${baseUrl}/${queuePage}`);
        cy.contains('Очередь');
    })
    it(`Работает роутинг на страницу Связный список`, () => {
        cy.visit(`${baseUrl}/${listPage}`);
        cy.contains('Связный список');
    })
})

describe('Тестирование страницы Строка', () => {
    beforeEach(function () {
        cy.visit(`${baseUrl}/${stringPage}`);
    })
    it('Если в инпуте пусто, то кнопка запуска неактивна', () => {
        cy.get(mainTextInput).clear();
        cy.get(submitBtn).should('have.attr', 'disabled');
    })
    it('Разворот строки отрабатывает корректно: значения меняются согласно алгоритму, стили default/changing/modified применяются к соответствующим элементам по заданной задержке', () => {
        const stringToTest = 'qwerty';
        cy.get(mainTextInput).type(stringToTest);
        cy.get(submitBtn).click();
        cy.get(mainCircles).as('circles');
        cy.get('@circles').should('have.length', stringToTest.length).each((elm, index) => {
            cy.wrap(elm).should('contain', stringToTest[index]);
        })

        for (let i = 0; i < stringToTest.length / 2; i++) {
            // элементы которые меняются местами на i шаге должны подсвечиваться css классом .changing
            // исключение - последний шаг, если в строке нечетное кол-во элементов.
            if (!(stringToTest.length % 2 !== 0 && i === Math.floor(stringToTest.length / 2))) {
                cy.get('@circles').eq(i).invoke('attr', 'class').should('match', /.*changing.*/)
                cy.get('@circles').eq(stringToTest.length - 1 - i).invoke('attr', 'class').should('match', /.*changing.*/)
            }

            //элементы, которые находятся в середине строки, между меняющимися символами, должны иметь css класс .default
            for (let j = i + 1; j < stringToTest.length - 1 - i; j++) {
                cy.get('@circles').eq(j).invoke('attr', 'class').should('match', /.*default.*/)
            }

            cy.wait(defaultAnimationDelay * 2);
            cy.get('@circles').each((el, index) => {
                const elm = cy.wrap(el);
                //на i шаге все элементы до i вкл. должны поменяться значениями с элементами в конце строки а также быть подсвечены css классом .modified 
                if (index <= i || index >= stringToTest.length - 1 - i) {
                    elm.should('contain', stringToTest[stringToTest.length - 1 - index]);
                    elm.invoke('attr', 'class').should('match', /.*modified.*/);
                }
                // Остальные элементы пока имеют старые значения - еще не пришло время их замены.
                else {
                    elm.should('contain', stringToTest[index]);
                    // elm.invoke('attr', 'class').should('match', /.*default.*/);
                }
            })
        }
    })
}); 

describe('Тестирование страницы Последовательность Фибоначчи', () => {
    beforeEach(function () {
        cy.visit(`${baseUrl}/${fibonacciPage}`);
    })
    it('Если в инпуте пусто, то кнопка запуска неактивна', () => {
        cy.get(mainTextInput).clear();
        cy.get(submitBtn).should('have.attr', 'disabled');
    })
    it('Последовательность генерируется корректно: числа генерируются по алгоритму, появление новых элементов происходит по заданной задержке',() => {

        //максимальное число которое обрабатывает компонент - 19
        const n = 5 || 19;
        const fibonacciSeq = fibonacci(n);

        cy.get(mainTextInput).clear().type(n);
        cy.get(submitBtn).click();
        cy.get(mainCircles).as('circles');

        for (let i = 0; i <= n; i++) {
            cy.get('@circles').should('have.length', i + 1);
            cy.get('@circles').eq(i).should('contain', fibonacciSeq[i]);
            cy.wait(defaultAnimationDelay);
        }
    })
});

describe('Тестирование страницы Стек', () => {
    beforeEach(function () {
        cy.visit(`${baseUrl}/${stackPage}`);
    })
    it('Если в инпуте пусто, то кнопка запуска неактивна', () => {
        cy.get(mainTextInput).clear();
        cy.get(submitBtn).should('have.attr', 'disabled');
    })
    it('Элементы добавляются в стек корректно: новый элемент добавляется справа от последовательности, на него вешается пометка top. В момент добавления элемент подсвечивается css классом changing', () => {
        //максимальное кол-во символов, которое принимает инпут - 4
        const inputValues = [1, 'два', '^&*(']

        cy.get(mainTextInput).clear().type(inputValues[0]);
        cy.get(submitBtn).click();
        cy.get(mainCircles).as('circles');
        cy.get(headCircles).as('headCircles');
        cy.get(tailCircles).as('tailCircles');
        cy.get('@circles').should('have.length', 1)
        cy.get('@circles').eq(0).should('contain', inputValues[0]);
        cy.get('@headCircles').should('have.length', 1)
        cy.get('@headCircles').eq(0).should('contain', 'top');
        cy.get('@tailCircles').should('have.length', 1)
        cy.get('@tailCircles').eq(0).should('contain', '0');
        cy.get('@circles').eq(0).invoke('attr', 'class').should('match', /.*changing.*/)

        for (let i = 1; i < inputValues.length; i++) {
            cy.wait(defaultAnimationDelay);
            cy.get('@circles').eq(0).invoke('attr', 'class').should('match', /.*default.*/)
            cy.get(mainTextInput).type(inputValues[i]);
            cy.get(submitBtn).click();
            cy.get('@circles').should('have.length', i + 1)
            cy.get('@circles').eq(i).should('contain', inputValues[i]);
            cy.get('@headCircles').should('have.length', i + 1)
            cy.get('@headCircles').eq(i).should('contain', 'top');
            cy.get('@tailCircles').should('have.length', i + 1)
            cy.get('@tailCircles').eq(i).should('contain', i);
            cy.get('@circles').eq(i).invoke('attr', 'class').should('match', /.*changing.*/)

            for (let j = 0; j < i; j++) {
                cy.get('@circles').eq(j).should('contain', inputValues[j]);
                cy.get('@headCircles').eq(j).should('contain', '');
                cy.get('@tailCircles').eq(j).should('contain', j);
                cy.get('@circles').eq(j).invoke('attr', 'class').should('match', /.*default.*/)
            }

        }
    })

    it('Элементы удаляются из стека корректно: удаляется самый правый элемент в последовательности, в момент удаления элемент подсвечивается css классом changing, после удаления отметка top вешается на самый правый элемент. Когда удаляется последний элемент, контейнер становится пуст', () => {
        //Сначала добавляем элементы в стек максимальное кол-во символов, которое принимает инпут - 4
        const inputValues = [1, 'два', '^&*(']
        for (let i = 0; i < inputValues.length; i++) {
            cy.get(mainTextInput).clear().type(inputValues[0]);
            cy.get(submitBtn).click();
            cy.wait(defaultAnimationDelay);
        }

        cy.get(mainCircles).as('circles');
        cy.get(headCircles).as('headCircles');
        cy.get(tailCircles).as('tailCircles');

        for (let i = inputValues.length - 1; i >= 0; i--) {
            cy.get('@circles').should('have.length', i + 1);
            cy.get('@headCircles').eq(i).should('contain', 'top');
            cy.get('@circles').eq(i).invoke('attr', 'class').should('match', /.*default.*/)
            cy.get(deleteBtn).click();
            cy.get('@circles').eq(i).invoke('attr', 'class').should('match', /.*changing.*/)
            cy.wait(defaultAnimationDelay);
            cy.get('@circles').should('have.length', i);
            if (i > 0) cy.get('@headCircles').eq(i - 1).should('contain', 'top');

            for (let j = 0; j < i; j++) {
                cy.get('@headCircles').eq(j).should('contain', '');
                cy.get('@circles').eq(j).invoke('attr', 'class').should('match', /.*default.*/)
            }
            if (i === 0) {
                cy.get(circlesContainer).should('not.have.descendants')
            }
        }
    })

    it('Кнопка очистить удаляет все элементы из стека', () => {
        //Сначала добавляем элементы в стек максимальное кол-во символов, которое принимает инпут - 4
        const inputValues = [1, 'два', '^&*(']
        for (let i = 0; i < inputValues.length; i++) {
            cy.get(mainTextInput).clear().type(inputValues[0]);
            cy.get(submitBtn).click();
            cy.wait(defaultAnimationDelay);
        }

        cy.get(resetBtn).click();
        cy.get(circlesContainer).should('not.have.descendants');
    })
});


describe('Тестирование страницы Очередь', () => {
    beforeEach(function () {
        cy.visit(`${baseUrl}/${queuePage}`);
    })
    it('Если в инпуте пусто, то кнопка запуска неактивна', () => {
        cy.get(mainTextInput).clear();
        cy.get(submitBtn).should('have.attr', 'disabled');
    })
    it('Если правая часть массива очереди свободна, элементы добавляются очередь корректно: новый элемент добавляется правее от предыдущего, на него вешается пометка tail. На элементе, который был добавлен первым висит пометка head. В момент добавления элемент подсвечивается css классом changing', () => {
        //максимальное кол-во символов, которое принимает инпут - 4, максимальное количество элементов в очереди - 7.
        const inputValues = [1, 'два', '^&*(']

        cy.get(mainCircles).as('circles');
        cy.get(headCircles).as('headCircles');
        cy.get(tailCircles).as('tailCircles');
        cy.get('@circles').should('have.length', 7)
        cy.get('@headCircles').should('have.length', 7)
        cy.get('@tailCircles').should('have.length', 7)

        cy.get(mainTextInput).type(inputValues[0]);
        cy.get(submitBtn).click();
        cy.get('@circles').eq(0).invoke('attr', 'class').should('match', /.*changing.*/)
        cy.wait(defaultAnimationDelay);
        cy.get('@circles').eq(0).should('contain', inputValues[0]);
        cy.get('@headCircles').eq(0).should('contain', 'head');
        cy.get('@tailCircles').eq(0).should('contain', 'tail');
        cy.get('@circles').eq(0).invoke('attr', 'class').should('match', /.*default.*/)

        for (let i = 1; i < inputValues.length; i++) {
            cy.get(mainTextInput).type(inputValues[i]);
            cy.get(submitBtn).click();
            cy.get('@circles').eq(i).invoke('attr', 'class').should('match', /.*changing.*/)
            cy.wait(defaultAnimationDelay);
            cy.get('@circles').eq(i).should('contain', inputValues[i]);
            cy.get('@tailCircles').eq(i).should('contain', 'tail');
            cy.get('@headCircles').eq(0).should('contain', 'head');

            for (let j = 0; j <= i; j++) {
                cy.get('@circles').eq(j).should('contain', inputValues[j]);
                cy.get('@circles').eq(j).invoke('attr', 'class').should('match', /.*default.*/)
            }
        }
    })

    it('Если head в массиве очереди находится левее, чем tail, элементы извлекаются из очереди корректно: удаляется самый левый элемент в последовательности, в момент удаления элемент подсвечивается css классом changing, после удаления отметка head вешается на следующий элемент. Когда удаляется последний элемент, очередь очищается.', () => {
        //Сначала добавляем элементы в стек максимальное кол-во символов, которое принимает инпут - 4, максимальное количество элементов в очереди - 7.
        const inputValues = [1, 'два', '^&*(']
        for (let i = 0; i < inputValues.length; i++) {
            cy.get(mainTextInput).type(inputValues[i]);
            cy.get(submitBtn).click();
            cy.wait(defaultAnimationDelay);
        }

        cy.get(mainCircles).as('circles');
        cy.get(headCircles).as('headCircles');
        cy.get(tailCircles).as('tailCircles');

        for (let i = 0; i < inputValues.length; i++) {
            cy.get(deleteBtn).click();
            cy.get('@circles').eq(i).invoke('attr', 'class').should('match', /.*changing.*/)
            cy.get('@headCircles').eq(i).should('contain', 'head');
            cy.get('@circles').eq(i).should('contain', inputValues[i]);

            cy.wait(defaultAnimationDelay);
            cy.get('@circles').eq(i).invoke('attr', 'class').should('match', /.*default.*/)
            cy.get('@headCircles').eq(i).should('contain', '');
            cy.get('@circles').eq(i).should('contain', '');
            if (i < inputValues.length - 1) {
                cy.get('@headCircles').eq(i + 1).should('contain', 'head');
                cy.get('@circles').eq(i + 1).should('contain', inputValues[i + 1]);
                cy.get('@circles').eq(i + 1).invoke('attr', 'class').should('match', /.*default.*/)
            }

            if (i === inputValues.length - 1) {
                cy.get(circlesContainer).should('not.have.descendants')
            }
        }
    })

    it('Если правая часть массива очереди занята, но есть свободные места слева от head, элементы добавляются очередь корректно: новый элемент добавляется правее от предыдущего, на него вешается пометка tail. В момент добавления элемент подсвечивается css классом changing', () => {
        //Сначала добавляем элементы в стек максимальное кол-во символов, которое принимает инпут - 4, максимальное количество элементов в очереди - 7.
        const inputValues = [1, 'два', '^&*(', 4, 5, 6, 7]
        for (let i = 0; i < inputValues.length; i++) {
            cy.get(mainTextInput).type(inputValues[i]);
            cy.get(submitBtn).click();
            cy.wait(defaultAnimationDelay);
        }

        // Удаляем элементы из начала очереди
        const countToDelete = 3;
        for (let i = 1; i <= countToDelete; i++) {
            cy.get(deleteBtn).click();
        }

        //добавляем новые элементы взамен удаленных
        const newElements = ['new1', 'new2', 'new3'];

        cy.get(mainCircles).as('circles');
        cy.get(headCircles).as('headCircles');
        cy.get(tailCircles).as('tailCircles');

        for (let i = 0; i < newElements.length; i++) {
            cy.get(mainTextInput).type(newElements[i]);
            cy.get(submitBtn).click();
            cy.get('@circles').eq(i).invoke('attr', 'class').should('match', /.*changing.*/)
            cy.wait(defaultAnimationDelay);
            cy.get('@circles').eq(i).should('contain', newElements[i]);
            cy.get('@tailCircles').eq(i).should('contain', 'tail');

            for (let j = 0; j <= i; j++) {
                cy.get('@circles').eq(j).should('contain', newElements[j]);
                cy.get('@circles').eq(j).invoke('attr', 'class').should('match', /.*default.*/)
            }
        }
    })

    it('Кнопка очистить удаляет все элементы из очереди', () => {
        //Сначала добавляем элементы в очередь максимальное кол-во символов, которое принимает инпут - 4
        const inputValues = [1, 'два', '^&*(']
        for (let i = 0; i < inputValues.length; i++) {
            cy.get(mainTextInput).clear().type(inputValues[0]);
            cy.get(submitBtn).click();
            cy.wait(defaultAnimationDelay);
        }

        cy.get(resetBtn).click();
        cy.get(circlesContainer).should('not.have.descendants');
    })
});

describe('Тестирование страницы Список', () => {
    beforeEach(function () {
        cy.visit(`${baseUrl}/${listPage}`);
    })
    it('Если в основном инпуте пусто, то кнопки добавления в head и tail неактивны', () => {
        cy.get(mainTextInput).clear();
        cy.get(addHeadBtn).should('have.attr', 'disabled');
        cy.get(addTailBtn).should('have.attr', 'disabled');
    })

    it('Если в инпуте индекса пусто, то кнопки добавления по индексу неактивны', () => {
        cy.get(indexInput).clear();
        cy.get(addIndexBtn).should('have.attr', 'disabled');
        cy.get(deleteIndexBtn).should('have.attr', 'disabled');
    })


    it('При открытии страницы корректно отображается дефолтный список из 4 элементов: [0, 34, 8, 1], на первом стоит пометка head, на последнем tail, каждый элемент подписан индексом, все имеют css класс default', () => {
        const defaultList = [0, 34, 8, 1];

        cy.get(mainCircles).as('circles');
        cy.get(headCircles).as('headCircles');
        cy.get(tailCircles).as('tailCircles');
        cy.get(tailIndexes).as('tailIndexes');
        cy.get('@circles').should('have.length', 4)
        cy.get('@headCircles').should('have.length', 4)
        cy.get('@tailCircles').should('have.length', 4)
        cy.get('@tailIndexes').should('have.length', 4)
        cy.get('@headCircles').eq(0).should('contain', 'head');
        cy.get('@tailCircles').eq(3).should('contain', 'tail');

        for (let i = 0; i < 4; i++) {
            cy.get('@circles').eq(i).should('contain', defaultList[i]);
            cy.get('@circles').eq(i).invoke('attr', 'class').should('match', /.*default.*/)
            cy.get('@tailIndexes').eq(i).should('contain', i)
        }
    })

    it('Добавление нового элемента в head отрабатывает корректно: над самым левым элементом в списке появляется добавляемый элемент с css классом "changing", далее он добавляется левее текущего, ему присваивается индекс 0 и пометка "head". После выполнения все элементы имеют css класс "default"', () => {
        //Максимальное кол-во символов, которое принимает инпут - 4
        const defaultList = [0, 34, 8, 1];

        const inputValue = 'left';
        cy.get(mainTextInput).type(inputValue);
        cy.get(addHeadBtn).click();

        cy.get(mainCircles).as('circles');
        cy.get(headCircles).as('headCircles');
        cy.get(tailCircles).as('tailCircles');

        cy.get('@headCircles').eq(0).within(() => {
            cy.get(mainCircles).should('contain', inputValue);
            cy.get(mainCircles).invoke('attr', 'class').should('match', /.*changing.*/)
        });

        cy.wait(defaultAnimationDelay);
        cy.get('@circles').eq(0).should('contain', inputValue);
        cy.get('@circles').eq(0).invoke('attr', 'class').should('match', /.*modified.*/);
        cy.get('@headCircles').eq(0).should('contain', 'head');
        cy.get('@circles').should('have.length', defaultList.length + 1).each((elm, index) => {
            if (index !== 0) cy.wrap(elm).invoke('attr', 'class').should('match', /.*default.*/);
        })

        cy.wait(defaultAnimationDelay);
        cy.get('@headCircles').eq(0).should('contain', 'head');
        cy.get('@circles').should('have.length', defaultList.length + 1).each((elm, index) => {
            cy.wrap(elm).invoke('attr', 'class').should('match', /.*default.*/);
        })
    })

    it('Добавление нового элемента в tail отрабатывает корректно: над самым правым элементом в списке появляется добавляемый элемент с css классом "changing", далее он добавляется правее текущего, ему присваивается индекс последнего элемента и пометка "tail". После выполнения все элементы имеют css класс "default"', () => {
        //Максимальное кол-во символов, которое принимает инпут - 4
        const defaultList = [0, 34, 8, 1];
        const initialElementsCount = defaultList.length;

        const inputValue = 'last';
        cy.get(mainTextInput).type(inputValue);
        cy.get(addTailBtn).click();

        cy.get(mainCircles).as('circles');
        cy.get(headCircles).as('headCircles');
        cy.get(tailCircles).as('tailCircles');

        cy.get('@headCircles').eq(initialElementsCount - 1).within(() => {
            cy.get(mainCircles).should('contain', inputValue);
            cy.get(mainCircles).invoke('attr', 'class').should('match', /.*changing.*/)
        });

        cy.wait(defaultAnimationDelay);
        cy.get('@circles').eq(initialElementsCount).should('contain', inputValue);
        cy.get('@circles').eq(initialElementsCount).invoke('attr', 'class').should('match', /.*modified.*/);
        cy.get('@tailCircles').eq(initialElementsCount).should('contain', 'tail');
        cy.get('@circles').should('have.length', initialElementsCount + 1).each((elm, index) => {
            if (index !== initialElementsCount) cy.wrap(elm).invoke('attr', 'class').should('match', /.*default.*/);
        })

        cy.wait(defaultAnimationDelay);
        cy.get('@tailCircles').eq(initialElementsCount).should('contain', 'tail');
        cy.get('@circles').should('have.length', initialElementsCount + 1).each((elm, index) => {
            cy.wrap(elm).invoke('attr', 'class').should('match', /.*default.*/);
        })
    })

    it('Добавление нового элемента по индексу в середину списка отрабатывает корректно: над самым левым элементом в списке появляется добавляемый элемент с css классом "changing", далее он пошагово перемещается к элементу с искомым индексом. Все пройденные элементы помечаются css классом "changing", далее элемент встраивается на позицию по заданному индексу и помечается классом "modified". На последнем шаге все элементы имеют css класс "default"', () => {
        //Максимальное кол-во символов, которое принимает инпут - 4
        const defaultList = [0, 34, 8, 1];
        const inputValue = 'indx';
        //Индекс должен быть в пределах размера отображаемого списка
        const inputIndex = 2;

        const initialElementsCount = defaultList.length;

        cy.get(mainTextInput).type(inputValue);
        cy.get(indexInput).type(inputIndex);
        cy.get(addIndexBtn).click();

        cy.get(mainCircles).as('circles');
        cy.get(headCircles).as('headCircles');
        cy.get(tailCircles).as('tailCircles');

        for (let i = 0; i <= inputIndex; i++) {
            cy.get('@headCircles').eq(i).within(() => {
                cy.get(mainCircles).should('contain', inputValue);
                cy.get(mainCircles).invoke('attr', 'class').should('match', /.*changing.*/)
            });
            cy.get('@circles').eq(i).invoke('attr', 'class').should('match', /.*changing.*/);
            cy.wait(defaultAnimationDelay);
        }

        cy.get('@circles').should('have.length', initialElementsCount + 1).each((elm, index) => {
            if (index !== indexInput) cy.wrap(elm).invoke('attr', 'class').should('match', /.*default.*/);
            if (index === indexInput) cy.wrap(elm).invoke('attr', 'class').should('match', /.*modified.*/);
        })

        cy.wait(defaultAnimationDelay);
        cy.get('@circles').should('have.length', initialElementsCount + 1).each((elm, index) => {
            cy.wrap(elm).invoke('attr', 'class').should('match', /.*default.*/);
        })
    })

    it('Удаление элемента из head отрабатывает корректно: под самым левым элементом в списке появляется кружок с css классом "changing" и в него перемещается значение удаляемого элемента, далее в списке остается на один элемент меньше, пометка "head" вешается на следующий элемент, все оставшиеся элементы имеют css класс "default". Если элементов в списке не осталось, контейнер полностью очищается', () => {
        const defaultList = [0, 34, 8, 1];
        const initialElementsCount = defaultList.length;

        cy.get(deleteHeadBtn).click();

        cy.get(mainCircles).as('circles');
        cy.get(headCircles).as('headCircles');
        cy.get(tailCircles).as('tailCircles');

        cy.get('@circles').eq(0).should('contain', '');
        cy.get('@tailCircles').eq(0).within(() => {
            cy.get(mainCircles).should('contain', defaultList[0]);
            cy.get(mainCircles).invoke('attr', 'class').should('match', /.*changing.*/)
        });

        cy.wait(defaultAnimationDelay);
        cy.get('@headCircles').eq(0).should('contain', 'head');
        cy.get('@circles').should('have.length', initialElementsCount - 1).each((elm, index) => {
            if (index !== initialElementsCount) cy.wrap(elm).invoke('attr', 'class').should('match', /.*default.*/);
        })

        for (let i = initialElementsCount - 1; i > 0; i--) {
            cy.get(deleteHeadBtn).click();
            cy.wait(defaultAnimationDelay);
        }

        cy.get(circlesContainer).should('not.have.descendants');
    })

    it('Удаление элемента из tail отрабатывает корректно: под самым правым элементом в списке появляется кружок с css классом "changing" и в него перемещается значение удаляемого элемента, далее в списке остается на один элемент меньше, пометка "tail" вешается на последний элементы, все оставшиеся элементы имеют css класс "default". Если был удален последний элементы и других элементов в списке не осталось, контейнер полностью очищается', () => {
        const defaultList = [0, 34, 8, 1];
        const initialElementsCount = defaultList.length;

        cy.get(deleteTailBtn).click();

        cy.get(mainCircles).as('circles');
        cy.get(headCircles).as('headCircles');
        cy.get(tailCircles).as('tailCircles');

        cy.get('@circles').eq(initialElementsCount - 1).should('contain', '');
        cy.get('@tailCircles').eq(initialElementsCount - 1).within(() => {
            cy.get(mainCircles).should('contain', defaultList[defaultList.length - 1]);
            cy.get(mainCircles).invoke('attr', 'class').should('match', /.*changing.*/)
        });

        cy.wait(defaultAnimationDelay);
        cy.get('@tailCircles').eq(initialElementsCount - 2).should('contain', 'tail');
        cy.get('@circles').should('have.length', initialElementsCount - 1).each((elm, index) => {
            if (index !== initialElementsCount) cy.wrap(elm).invoke('attr', 'class').should('match', /.*default.*/);
        })

        for (let i = initialElementsCount - 1; i > 0; i--) {
            cy.get(deleteTailBtn).click();
            cy.wait(defaultAnimationDelay);
        }

        cy.get(circlesContainer).should('not.have.descendants');
    })

    it('Удаление элемента по индексу в середине списка отрабатывает корректно: Самый левый элемент помечается css классом "changing", далее пошагово им помечаются все элементы до искомого индекса включительно, затем под элементом с искомым индексом появляется кружок, куда перемещается значение элемента. После этого в списке остается на один эелмент меньше, все помечены css классом "default". Если был удален последний элементы и других элементов в списке не осталось, контейнер полностью очищается', () => {
        //Максимальное кол-во символов, которое принимает инпут - 4
        const defaultList = [0, 34, 8, 1];
        //Индекс должен быть в пределах размера отображаемого списка
        const inputIndex = 2;

        const initialElementsCount = defaultList.length;

        cy.get(indexInput).type(inputIndex);
        cy.get(deleteIndexBtn).click();

        cy.get(mainCircles).as('circles');
        cy.get(headCircles).as('headCircles');
        cy.get(tailCircles).as('tailCircles');

        for (let i = 0; i <= inputIndex; i++) {
            cy.get('@circles').eq(i).invoke('attr', 'class').should('match', /.*changing.*/);
            cy.wait(defaultAnimationDelay);
        }

        cy.get('@tailCircles').eq(inputIndex).within(() => {
            cy.get(mainCircles).should('contain', defaultList[inputIndex]);
            cy.get(mainCircles).invoke('attr', 'class').should('match', /.*changing.*/)
        });
        cy.get('@circles').eq(inputIndex).should('contain', '');

        cy.wait(defaultAnimationDelay);
        
        cy.get('@circles').should('have.length', initialElementsCount - 1).each((elm, index) => {
            cy.wrap(elm).invoke('attr', 'class').should('match', /.*default.*/);
        })

        for (let i = initialElementsCount - 1; i > 0; i--) {
            cy.get(indexInput).type(0);
            cy.get(deleteIndexBtn).click();
            cy.wait(defaultAnimationDelay*2);
        }

        cy.get(circlesContainer).should('not.have.descendants');
    })

});