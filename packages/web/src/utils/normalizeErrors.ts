interface Error {
    errorCode: string;
    message: string;
}

export const normalizeErrors = (data:any):Error => {
    return {
        message: data.message,
        errorCode: data.errorCode
    };
};