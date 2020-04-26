import React, { useState, useCallback, useEffect } from 'react';
import { useProgressBarData } from '../../hooks/progress';
import ProgressBar from '../../components/ProgressBar';
import Btn from '../../components/Btn';
import Select from '../../components/Select';
import { range } from '../../shared/number';

const ProgressBarGroup = () => {
    const { loading, data } = useProgressBarData();
    const [ selectedProgressBar, setSelectedProgressBar ] = useState(`${0}`);
    const [ progressBars, setProgressBars ] = useState([]);

    const setDelta = useCallback((delta) => {
        const newBars = progressBars.map((_, barIndex) => {
            const currentProgress = progressBars[barIndex] || 0;
            return `${barIndex}` === selectedProgressBar 
                ? range(currentProgress + delta, 0, data.limit) 
                : currentProgress;
        });
        setProgressBars(newBars);
    }, [progressBars, setProgressBars, selectedProgressBar, data]);

    useEffect(() => {
        if (data?.bars) {
            setProgressBars(data.bars);
        }
    }, [ data ]);


    if (loading) {
        return <div data-testid="progress-bar-group__loading">Loading progress bars...</div>
    }

    if (!data) {
        return <div>Data could not be fetched!</div>
    }

    const limitReached = progressBars.some(bar => bar === data.limit);

    return (
        <div data-testid="progress-bar-group__data">
            <div>
                {progressBars.map((_, index) => (
                    <ProgressBar 
                        key={index} 
                        value={progressBars[index]} 
                        max={data.limit}
                    />
                ))}
            </div>
            <div className="d-flex justify-space-between">
                <div className="mr-2">
                    <Select 
                        options={data.bars.map((_, index) => ({ label: `Progress Bar #${index + 1}`, value: `${index}` }))} 
                        value={selectedProgressBar}
                        onChange={setSelectedProgressBar}
                    />
                </div>
                <div>
                    {data.buttons.map((delta, index) => (
                        <Btn 
                            key={index} 
                            className="ml-2" 
                            onClick={() => setDelta(delta)}
                            data-testid="progress-bar-group__delta-btn">
                                {delta}
                            </Btn>
                    ))}
                </div>
            </div>
            {limitReached && <h2>Limit {data.limit} reached!</h2>}
        </div>
    );
};

export default ProgressBarGroup;