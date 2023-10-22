import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';
import renderer from 'react-test-renderer'

describe('Тесты компонента Circle', () => {
    it('Рендеринг Circle без содержимого соответствует снепшоту', () => {
        const tree = renderer
            .create(<Circle />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендеринг Circle с буквой внутри соответствует снепшоту', () => {
        const tree = renderer
            .create(<Circle letter="M" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендеринг Circle с меткой head соответствует снепшоту', () => {
        const tree = renderer
            .create(<Circle head="head" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендеринг Circle с дополнительным Circle в head соответствует снепшоту', () => {
        const tree = renderer
            .create(<Circle head={<Circle />} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендеринг Circle с меткой tail соответствует снепшоту', () => {
        const tree = renderer
            .create(<Circle tail="tail" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендеринг Circle с дополнительным Circle в tail соответствует снепшоту', () => {
        const tree = renderer
            .create(<Circle tail={<Circle />} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендеринг Circle с меткой index соответствует снепшоту', () => {
        const tree = renderer
            .create(<Circle index="8" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендеринг Circle с пропсом isSmall={true} соответствует снепшоту', () => {
        const tree = renderer
            .create(<Circle isSmall={true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендеринг Circle в состоянии default соответствует снепшоту', () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Default} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендеринг Circle в состоянии changing соответствует снепшоту', () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Changing} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Рендеринг Circle в состоянии modified соответствует снепшоту', () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Modified} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})

