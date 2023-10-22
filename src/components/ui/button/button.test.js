import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button'
import renderer from 'react-test-renderer'

describe('Тесты компонента Button', () => {
    it('Рендеринг Button без надписи соответствует снепшоту', () => {
        const tree = renderer
            .create(<Button />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендеринг Button с надписью соответствует снепшоту', () => {
        const tree = renderer
            .create(<Button text="Запуск" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендеринг Button с аттрибутом disabled cоответствует снепшоту', () => {
        const tree = renderer
            .create(<Button disabled={true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендеринг Button с индикацией загрузки cоответствует снепшоту', () => {
        const tree = renderer
            .create(<Button isLoader={true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('По клику на Button запускается колбек, переданный ему в пропс OnClick', () => {

        const callBack = () => {
            alert('Это колбек');
        }

        window.alert = jest.fn();
        render(<Button text="Запуск" onClick={callBack} />)
        const btn = screen.getByText('Запуск');
        fireEvent.click(btn);
        expect(window.alert).toHaveBeenCalledWith('Это колбек');
    });
})

