import { useState, useEffect } from 'react';
import { serverURI } from './global-variables';
import axios from "axios";

const useCustomDataHook = (endpoint) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(endpoint)
            .then(resp => setData(resp.data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [endpoint]);

    return { data, error, loading };
}

export const useAlertData = () => {
    return useCustomDataHook(serverURI + '/alerts/');
}

export const useProfileData = () => {
    return useCustomDataHook(serverURI + '/profile');
};

export const useAreaData = () => {
    return useCustomDataHook(serverURI + '/area');
};

export const useBadgesData = () => {
    return useCustomDataHook(serverURI + '/badges');
};

export const useDashboardData = () => {
    return useCustomDataHook(serverURI + '/dashboard');
};

export const useTravelEngineData = () => {
    return useCustomDataHook(serverURI + '/engine/travel');
};