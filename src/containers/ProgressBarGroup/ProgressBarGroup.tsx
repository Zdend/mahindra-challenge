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
            return `${barIndex}` === selectedProgressBar ? range(currentProgress + delta, 0, data.limit) : currentProgress;
        });
        setProgressBars(newBars);
    }, [progressBars, setProgressBars, selectedProgressBar, data]);

    useEffect(() => {
        if (data?.bars) {
            setProgressBars(data.bars);
        }
    }, [ data ]);


    if (loading) {
        return <div>Loading progress bars...</div>
    }

    if (!data || !progressBars) {
        return <div>Data could not be fetched!</div>
    }

    return (
        <div>
            <div>
                {progressBars.map((bar, index) => (
                    <ProgressBar 
                        key={index} 
                        value={progressBars[index]} 
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
                        <Btn key={index} className="ml-2" onClick={() => setDelta(delta)}>{delta}</Btn>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProgressBarGroup;