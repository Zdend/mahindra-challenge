import React from 'react';
import BasicLayout from '../components/BasicLayout';
import ProgressBarGroup from '../containers/ProgressBarGroup';

const ProgressBarView = () => {
    return (
        <BasicLayout title="Progress Bar Demo">
            <ProgressBarGroup />
        </BasicLayout>
    );
};

export default ProgressBarView;