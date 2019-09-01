// States
export type UiS  = {
    isPhone: boolean;
    isTablet: boolean;
    selectedTimespan: string;
    isLoading: boolean;
};

// Getters
export type UiG = {
    getIsPhone: boolean;
    getIsTablet: boolean;
    getConvertedTimespan: number;
    getSelectedTimespan: string;
    getIsLoading: boolean;
};

export type UiRG = {
    "ui/getIsPhone": UiG["getIsPhone"];
    "ui/getIsTablet": UiG["getIsTablet"];
    "ui/getConvertedTimespan": UiG["getConvertedTimespan"];
    "ui/getSelectedTimespan": UiG["getSelectedTimespan"];
    "ui/getIsLoading": UiG["getIsLoading"];
};

// Mutations
export type UiM = {
    setIsPhone: boolean;
    setIsTablet: boolean;
    setTimespan: string;
    setIsLoading: boolean;
};

export type UiRM = {
    "ui/setIsPhone": UiM["setIsPhone"];
    "ui/setIsTablet": UiM["setIsTablet"];
    "ui/setTimespan": UiM["setTimespan"];
    "ui/setIsLoading": UiM["setIsLoading"];
};

// Actions
export type UiA = {
    setIsPhone: number;
    setIsTablet: number;
    setTimespan: string;
    setIsLoading: boolean;
};

export type UiRA = {
    "ui/setIsPhone": UiA["setIsPhone"];
    "ui/setIsTablet": UiA["setIsTablet"];
    "ui/setTimespan": UiA["setTimespan"];
    "ui/setIsLoading": UiA["setIsLoading"];
};