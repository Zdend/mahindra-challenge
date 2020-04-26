import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Select from './Select';

const mockOptions = [
    { label: 'Orange', value: '1' },
    { label: 'Apple', value: '2' },
    { label: 'Strawberry', value: '3' },
]

describe('Select', () => {
    it('renders options', () => {
        const { getByTestId, getByText } = render(
            <Select 
                value="2" 
                onChange={jest.fn()} 
                options={mockOptions} 
            />
        );
        expect(getByTestId('select').querySelectorAll('option').length).toBe(3);
        mockOptions.forEach(({ label }) => {
            expect(getByText(label).textContent).toBe(label);
        });
    });

    it('invokes onChange on change', () => {
        const onChange = jest.fn();
        const { getByTestId } = render(
            <Select 
                value="1" 
                onChange={onChange} 
                options={mockOptions} 
            />
        );

        fireEvent.change(getByTestId('select'), {
            target: { value: mockOptions[2].value },
        });
        expect(onChange).toHaveBeenCalledWith(mockOptions[2].value);

    });
})
