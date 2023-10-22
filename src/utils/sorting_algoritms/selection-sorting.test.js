import { selectionSort } from "./selection-sorting"

describe('Тестирование функции сортировки выбором',() => {
    it('При перече пустого массива в качестве аргумента, функция отрабатывает без ошибок', async () => {
        const arr = [];
        const sortDirection = 'asc';
        const res = await selectionSort(arr, sortDirection);
        expect(res).toEqual(arr);
    })

    it('При перече массива с одним элементом в качестве аргумента, функция отрабатывает без ошибок', async () => {
        const arr = [5];
        const sortDirection = 'asc';
        const res = await selectionSort(arr, sortDirection);
        expect(res).toEqual(arr);
    })

    it('Сортировка по возрастанию отрабатывает корректно', async () => {
        const arr = [5, 1, 8, 19, 100];
        const sortedArr = [1, 5, 8, 19, 100];
        const sortDirection = 'asc';
        const res = await selectionSort(arr, sortDirection);
        expect(res).toEqual(sortedArr);
    })

    it('Сортировка по убыванию отрабатывает корректно', async () => {
        const arr = [5, 1, 8, 19, 100];
        const sortedArr = [100, 19, 8, 5, 1];
        const sortDirection = 'desc';
        const res = await selectionSort(arr, sortDirection);
        expect(res).toEqual(sortedArr);
    })
})