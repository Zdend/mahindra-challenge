const MOCK_RESPONSE = {
    limit: 120,
    bars: [ 20, 67],
    buttons: [ 20, -30 ],
};

jest.mock('../../api/progress', () => ({
    fetchProgressBars: () => Promise.resolve(MOCK_RESPONSE)
}))

import React from 'react';
import { render, cleanup, wait } from '@testing-library/react';
import ProgressBarGroup from './ProgressBarGroup';

describe('ProgressBarGroup', () => {
    beforeEach(cleanup);

    it('renders loading state', async () => {
        const { getByTestId } = render(<ProgressBarGroup />);
        expect(getByTestId('progress-bar-group__loading')).toBeTruthy();
        await wait();
    });

    it('renders progress bars and buttons', async () => {
        const { getByTestId, getAllByTestId } = render(<ProgressBarGroup />);
        await wait(() => getByTestId('progress-bar-group__data'));
        getAllByTestId('progress-bar').forEach((element, index) => {
            expect(element.textContent).toBe(`${MOCK_RESPONSE.bars[index]} %`);
            expect(element.getAttribute('aria-valuenow')).toBe(`${MOCK_RESPONSE.bars[index]}`);
        });
        expect(getAllByTestId('progress-bar-group__delta-btn').length).toBe(MOCK_RESPONSE.buttons.length);
    });    

    it('changes progress bar value', async () => {
        const { getAllByTestId, getByTestId, queryByTestId } = render(<ProgressBarGroup />);
        await wait(() => getByTestId('progress-bar-group__data'));

        const firstButton = getAllByTestId('progress-bar-group__delta-btn')[0];
        const firstBar = getAllByTestId('progress-bar')[0];

        firstButton.click();
        firstButton.click();
        
        expect(firstBar.getAttribute('aria-valuenow'))
            .toBe(`${2 * +firstButton.textContent + MOCK_RESPONSE.bars[0]}`);
    });
});
