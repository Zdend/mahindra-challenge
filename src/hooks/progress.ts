import { useEffect, useState } from "react";
import { fetchProgressBars } from "../api/progress";
import { ProgressBarResponse } from "../types/progress";

interface ProgressBarData {
    loading: boolean;
    data: ProgressBarResponse;
}

export const useProgressBarData = (): ProgressBarData => {
    const [progressBarData, setProgressBarData] = useState(null);
    const [fetching, setFetching] = useState(false);
    useEffect(() => {
        (async () => {
            setFetching(true);
            const response = await fetchProgressBars();
            setProgressBarData(response);
            setFetching(false);
        })();
    }, []);

    return {
        data: progressBarData,
        loading: fetching,
    };
}