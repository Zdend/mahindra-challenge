import React from 'react';
import styled from '@emotion/styled';
import { BASE_UNIT, COLORS } from '../../shared/theme';

const SelectStyled = styled.select`
    width: 100%;
    min-width: 150px;
    max-width: 400px;
    height: ${BASE_UNIT * 9}px;
    border: 2px solid ${COLORS.PRIMARY};
`;

interface SelectItem {
    label: string;
    value: string;
}

interface SelectProps {
    options: SelectItem[];
    value: string;
    onChange: (value: string) => void;
}

const Select = ({
    options,
    value,
    onChange,
}: SelectProps) => {
    return (
        <SelectStyled 
            data-testid="select"
            value={value} 
            onChange={(e) => onChange(e.target.value)}
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </SelectStyled>
    );
};

export default Select;