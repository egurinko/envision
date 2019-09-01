// States
export type ResponseS  = {
    status: string;
    method: string;
    errors: string;
};

// Getters
export type ResponseG = {
    getResponse: ResponseS;
};

export type ResponseRG = {
    "response/getResponse": ResponseG["getResponse"];
};

// Mutations
export type ResponseM = {
    setStatus: string;
    setMethod: string;
    setErrors: string;
};

export type ResponseRM = {
    "response/setStatus": ResponseM["setStatus"];
    "response/setMethod": ResponseM["setMethod"];
    "response/setErrors": ResponseM["setErrors"];
};

// Actions
export type ResponseA = {
    setResponse: ResponseS;
};

export type ResponseRA = {
    "response/setResponse": ResponseA["setResponse"];
};