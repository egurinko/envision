// States
export type UiS  = {
    isPhone: boolean;
    isTablet: boolean;
};

// Getters
export type UiG = {
    getIsPhone: boolean;
    getIsTablet: boolean;
};

export type UiRG = {
    "ui/getIsPhone": UiG["getIsPhone"];
    "ui/getIsTablet": UiG["getIsTablet"];
};

// Mutations
export type UiM = {
    setIsPhone: boolean;
    setIsTablet: boolean;
};

export type UiRM = {
    "ui/setIsPhone": UiM["setIsPhone"];
    "ui/setIsTablet": UiM["setIsTablet"];
};

// Actions
export type UiA = {
    setIsPhone: number;
    setIsTablet: number;
};

export type UiRA = {
    "ui/setIsPhone": UiA["setIsPhone"];
    "ui/setIsTablet": UiA["setIsTablet"];
};