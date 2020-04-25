import { ProgressBarResponse } from '../types/progress';

const PROGRESS_BAR_ENDPOINT = `${location.protocol}//pb-api.herokuapp.com/bars`;

export const fetchProgressBars = async (): Promise<ProgressBarResponse | null> => {
    try {
        const response = await fetch(PROGRESS_BAR_ENDPOINT, {

        });
        const data = await response.json() as ProgressBarResponse;
        if (!Array.isArray(data.bars) || !Array.isArray(data.buttons) || typeof data.limit !== 'number') {
            throw new TypeError('Invalid payload format!');
        }
        return data;
    } catch (e) {
        console.error('Cannot fetch progress bars', e);
        return null;
    }
}