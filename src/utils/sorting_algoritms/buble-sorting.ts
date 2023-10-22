import { isLess, isMore } from "../../utils/utils";

type TSortDirection = 'asc' | 'desc';

export async function bubleSort (arr: number[], sortDirection: TSortDirection, animateFunction?: Function): Promise<number[]> {
    const isNeedToChange = sortDirection === 'asc' ? isLess : isMore; 
    
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (animateFunction) await animateFunction(j, j + 1, arr.length - i);
        if (isNeedToChange(arr[j + 1], arr[j])) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }