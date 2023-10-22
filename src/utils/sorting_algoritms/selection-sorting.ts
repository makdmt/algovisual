import type { TSortDirection } from "../../components/sorting-page/sorting-page";
import { isLess, isMore } from "../../utils/utils";


type TExtremumType = 'min' | 'max';


export async function selectionSort(arr: number[], sortDirection: TSortDirection, animateFunction?: Function): Promise<number[]> {

    const extremumType: TExtremumType = sortDirection === 'asc' ? 'min' : 'max';
    let curIndex: number = 0;
    let selectedIndex: number = 0;


    while (curIndex < arr.length) {
        selectedIndex = await findExtremum(arr, extremumType, curIndex, arr.length - 1);
        [arr[curIndex], arr[selectedIndex]] = [arr[selectedIndex], arr[curIndex]];
        curIndex++;
    }

    return arr;

    async function findExtremum(arr: number[], type: TExtremumType, startSearch: number = 0, endSearch: number = arr.length - 1): Promise<number> {

        const isNewExtremum = (type === 'min') ? isLess : isMore;

        let curIndex: number = startSearch;
        let extremumIndex: number = startSearch;
        let extremumValue: number = arr[extremumIndex];

        while (curIndex <= endSearch) {
            if (animateFunction) await animateFunction(startSearch, curIndex);
            if (isNewExtremum(arr[curIndex], extremumValue)) {
                extremumValue = arr[curIndex]
                extremumIndex = curIndex;
            }
            curIndex++;
        }
        return extremumIndex;
    }
}