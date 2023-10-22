import { reverseString } from "./reverse-string";

describe('Тестирование функции разворота строки', () => {
    it('Функция корректно разворачивает строку с четным количеством символов', async () => {
        const inputSring = 'qwer'.split('');
        const reversedString = 'rewq'.split('');

        const res = await reverseString({str: inputSring, left: 0, right: inputSring.length - 1});
        expect(res).toEqual(reversedString);
    })

    it('Функция корректно разворачивает строку с НЕчетным количеством символов', async () => {
        const inputSring = 'qwert'.split('');
        const reversedString = 'trewq'.split('');

        const res = await reverseString({str: inputSring, left: 0, right: inputSring.length - 1});
        expect(res).toEqual(reversedString);
    })
    it('Функция корректно отрабатывает на строке из одного символа', async () => {
        const inputSring = 'q'.split('');
        const reversedString = 'q'.split('');

        const res = await reverseString({str: inputSring, left: 0, right: inputSring.length - 1});
        expect(res).toEqual(reversedString);
    })

    it('Функция корректно отрабатывает на пустой строке', async () => {
        const inputSring = ''.split('');
        const reversedString = ''.split('');

        const res = await reverseString({str: inputSring, left: 0, right: inputSring.length - 1});
        expect(res).toEqual(reversedString);
    })
})