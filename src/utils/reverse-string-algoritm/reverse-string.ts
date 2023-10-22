import type { IReverse } from "../../components/string/string";

export async function reverseString(revers: IReverse, animationFunc?: Function) {
    let curString = revers.str;
    let left = revers.left;
    let right = revers.right;

    while (left < right ) {

        if (animationFunc) await animationFunc(curString, left, right);

        [curString[left], curString[right]] = [curString[right], curString[left]];
        left++;
        right--;
    }

    if (animationFunc) await animationFunc(curString, left, right);

    return curString;
}