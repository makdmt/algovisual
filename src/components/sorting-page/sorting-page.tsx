import React, { ChangeEvent, SyntheticEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";

import styles from './sorting-page.module.css'
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { wait } from "../../utils/utils";
import { bubleSort } from "../../utils/sorting_algoritms/buble-sorting";
import { selectionSort } from "../../utils/sorting_algoritms/selection-sorting";

type TSortMethod = 'select' | 'bubble'
export type TSortDirection = 'asc' | 'desc';

export const SortingPage: React.FC = () => {

  const [arr, setArr] = React.useState<number[]>([]);
  const [sortMethod, setSortMethod] = React.useState<TSortMethod>('select');
  const [animatingArrElements, setAnimatingArrElements] = React.useState<{ left: number, right: number, sorted?: number }>();
  const [animationInProgress, setAnimationInProgress] = React.useState<TSortDirection | false>(false);


  const selectSortMethod = React.useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.value ===  'select' || evt.target.value ===  'bubble') setSortMethod(evt.target.value);
  },[])


  const randomArr = React.useCallback(() => {
    setAnimatingArrElements({ left: -1, right: -1 });
    const arrLength: number = Math.floor(Math.random() * 17);
    const resArr: number[] = []

    for (let i = 0; i < arrLength; i++) {
      resArr.push(Math.floor(Math.random() * 100))
    }
    setArr(resArr);
  }, [])

  const animateSorting = async (left: number, right: number, sorted?: number) => {
    setAnimatingArrElements({left, right, sorted})
    await wait(500);
  }


  const ascSortHandler = React.useCallback(async () => {
    setAnimationInProgress('asc');
    if (sortMethod === 'bubble') await bubleSort(arr, 'asc', animateSorting);
    if (sortMethod === 'select') await selectionSort(arr, 'asc', animateSorting);
    setAnimationInProgress(false);
  }, [arr, sortMethod])
  

  const descSortHandler = React.useCallback(async () => {
    setAnimationInProgress('desc');
    if (sortMethod === 'bubble') await bubleSort(arr, 'desc', animateSorting);
    if (sortMethod === 'select') await selectionSort(arr, 'desc', animateSorting);
    setAnimationInProgress(false);
  }, [arr, sortMethod])


  const getElementState = React.useCallback((index: number) => {
    if (arr.length === 1) return ElementStates.Modified;
    if (animatingArrElements && sortMethod === 'select' && (index < animatingArrElements.left || animatingArrElements.left === arr.length - 1)) return ElementStates.Modified;
    if (animatingArrElements && animatingArrElements.sorted && sortMethod === 'bubble' && (index >=  animatingArrElements.sorted || (animatingArrElements.sorted === 2 && (index === 0 || index === 1)))) return ElementStates.Modified;
    if (animatingArrElements && (index === animatingArrElements.left || index === animatingArrElements.right)) return ElementStates.Changing;
    return ElementStates.Default
  }, [arr, animatingArrElements]);

  React.useEffect(() => {
    randomArr();
  },[])



  return (
    <SolutionLayout title="Сортировка массива">
      <div className={`${styles.controlsContainer} mb-25`}>
        <RadioInput label='Выбор' name='sortingAlg' value={'select'} checked={sortMethod === 'select'} onChange={selectSortMethod} disabled={!!animationInProgress} />
        <RadioInput label='Пузырек' name='sortingAlg' value={'bubble'} checked={sortMethod === 'bubble'} onChange={selectSortMethod} disabled={!!animationInProgress} />
        <Button sorting={Direction.Ascending} text='По возрастанию' type='button' onClick={ascSortHandler} isLoader={animationInProgress === 'asc'} extraClass={styles.button} disabled={!!animationInProgress} />
        <Button sorting={Direction.Descending} text='По убыванию' type='button' onClick={descSortHandler} isLoader={animationInProgress === 'desc'} extraClass={styles.button} disabled={!!animationInProgress} />
        <Button text='Новый массив' type='button' isLoader={false} onClick={randomArr} extraClass={`${styles.button} ${styles.lastButton}`} disabled={!!animationInProgress} />
      </div>

      <div className={styles.columnsContainer}>
        {!!arr.length && arr.map((number, index) => {
          return (<Column key={index.toString() + number.toString()} index={number} state={getElementState(index)} extraClass="mr-5" />)
        })}
      </div>
    </SolutionLayout>
  );
};
