import React from 'react';
import styled from '@emotion/styled';
import { range } from '../../shared/number';
import { COLORS } from '../../shared/theme';

const ProgressBarWrapper = styled.div`
    position: relative;
    border: 1px solid ${COLORS.GREY};
    margin: 1rem auto;
    padding: 1rem;
    border-radius: 4px;
`;

const ProgressBarLabel = styled.div`
    position: relative;
    color: ${COLORS.BLACK};
    text-align: center;
`;

interface ProgressBarFilling {
    value: number;
    exceeded: boolean;
}

const ProgressBarFilling = styled.div<ProgressBarFilling>`
    transition: all 300ms ease-in-out; 
    ${({ value, exceeded }) => `
    width: ${value}%;
    background-color: ${exceeded ? COLORS.ERROR : COLORS.INFO};
    `}
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;

interface ProgressBarProps {
    value: number;
}

const ProgressBar = ({
    value,
}: ProgressBarProps) => {
    const displayValue = range(value, 0, Infinity);
    const fillingValue = range(value, 0, 100);
    return (
        <ProgressBarWrapper>
            <ProgressBarFilling value={fillingValue} exceeded={value > 100} />
            <ProgressBarLabel>{displayValue} %</ProgressBarLabel>
        </ProgressBarWrapper>
    );
};

export default ProgressBar;