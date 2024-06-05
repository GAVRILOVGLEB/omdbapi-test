enum AppErrorType {
    ReadData = "READ_DATA",
}

type AppError = Error & {
    type: AppErrorType;
    description: string;
};

const commonMessage = "Something went wrong";

function createAppError(error: Error, type: AppErrorType): AppError {
    let description;

    if (error) {
        if (error.message && error.name) {
            description = `[${type} (${error.name})]: ${error.message}`;
        } else if (error.message) {
            description = `[${type}]: ${error.message}`;
        } else if (error.name) {
            description = `[${type} (${error.name})]: ${commonMessage}`;
        } else {
            description = `[${type}]: ${commonMessage}`;
        }
    } else {
        description = `[${type}]: ${commonMessage}`;
    }

    return {
        ...error,
        type,
        description,
    };
}

export { createAppError, AppErrorType };
export type { AppError };
