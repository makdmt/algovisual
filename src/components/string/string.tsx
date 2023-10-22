import React, { ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

import styles from './string.module.css'
import { FlexForm } from "../flex-form/flex-form";
import { wait } from "../../utils/utils";
import { reverseString } from "../../utils/reverse-string-algoritm/reverse-string";

export interface IReverse {
  str: string[],
  left: number,
  right: number
}

export const StringComponent: React.FC = () => {

  const [inputString, setInputString] = React.useState<string>('');
  const [reverse, setReverse] = React.useState<IReverse>({
    str: [],
    left: 0,
    right: 0,
  })

  const onChange = React.useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    setInputString(evt.target.value);
  }, [])

  const animationFunction = async (str: string[], left: number, right: number) => {

    setReverse({
      str,
      left,
      right
    })
    await wait(1000);
  }

  const onSubmit = React.useCallback(async (evt) => {
    evt.preventDefault();

    const toReverse = {
      str: inputString.split(''),
      left: 0,
      right: inputString.length - 1
    }

    await reverseString(toReverse, animationFunction);

  }, [inputString])


  const getCircleState = React.useCallback((index) => {
    if (reverse.left < reverse.right && (index === reverse.left || index === reverse.right)) return ElementStates.Changing;
    if (index <= reverse.left || index >= reverse.right) return ElementStates.Modified;
    return ElementStates.Default
  }, [reverse])


  return (
    <SolutionLayout title="Строка">
      <FlexForm onSubmit={onSubmit} extraClass="mb-40">
        <Input maxLength={11} isLimitText={true} onChange={onChange} value={inputString} extraClass={`${styles.input} mr-6`} data-testid="text-input" />
        <Button text='Развернуть' isLoader={reverse.left < reverse.right ? true : false} disabled={inputString.length === 0} type='submit' data-testid="submit-btn" />
      </FlexForm>
      <div className={styles.circlesContainer} >
        {!!reverse?.str?.length && reverse.str.map((char, index) => {
          return (<Circle key={index + char} letter={char} state={getCircleState(index)} extraClass="mr-8" />)
        })}
      </div>
    </SolutionLayout>
  );
};
