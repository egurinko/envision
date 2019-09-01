// States
export type UiS  = {
    isPhone: boolean;
    isTablet: boolean;
    selectedTimespan: string;
};

// Getters
export type UiG = {
    getIsPhone: boolean;
    getIsTablet: boolean;
    getConvertedTimespan: number;
    getSelectedTimespan: string;
};

export type UiRG = {
    "ui/getIsPhone": UiG["getIsPhone"];
    "ui/getIsTablet": UiG["getIsTablet"];
    "ui/getConvertedTimespan": UiG["getConvertedTimespan"];
    "ui/getSelectedTimespan": UiG["getSelectedTimespan"];
};

// Mutations
export type UiM = {
    setIsPhone: boolean;
    setIsTablet: boolean;
    setTimespan: string;
};

export type UiRM = {
    "ui/setIsPhone": UiM["setIsPhone"];
    "ui/setIsTablet": UiM["setIsTablet"];
    "ui/setTimespan": UiM["setTimespan"];
};

// Actions
export type UiA = {
    setIsPhone: number;
    setIsTablet: number;
    setTimespan: string;
};

export type UiRA = {
    "ui/setIsPhone": UiA["setIsPhone"];
    "ui/setIsTablet": UiA["setIsTablet"];
    "ui/setTimespan": UiA["setTimespan"];
};