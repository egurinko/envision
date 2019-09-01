// States
export type UserS  = {
    username: string;
    isLoggedIn: boolean;
};

// Getters
export type UserG = {
    getUsername: string;
    getIsLoggedIn: boolean;
};

export type UserRG = {
    "User/getUsername": UserG["getUsername"];
    "User/getIsLoggedIn": UserG["getIsLoggedIn"];
};

// Mutations
export type UserM = {
    setUsername: string;
    setIsLoggedIn: boolean;
};

export type UserRM = {
    "User/setUsername": UserM["setUsername"];
    "User/setIsLoggedIn": UserM["setIsLoggedIn"];
};

// Actions
export type UserA = {
    setUsername: string;
    setIsLoggedIn: boolean;
};

export type UserRA = {
    "User/setUsername": UserA["setUsername"];
    "User/setIsLoggedIn": UserA["setIsLoggedIn"];
};