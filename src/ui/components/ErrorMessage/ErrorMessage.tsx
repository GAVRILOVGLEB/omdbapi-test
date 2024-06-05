import React, { useEffect } from "react";
import { useStatemanjs } from "@persevie/statemanjs-react";
import {
    ToastTitle,
    Toast,
    Toaster,
    useId,
    useToastController,
} from "@fluentui/react-components";

import { appErrorState } from "../../../infrastructure/storage/storageService";

function ErrorMessage(): JSX.Element {
    const errorState = useStatemanjs(appErrorState);

    const toasterId = useId("toaster");
    const { dispatchToast } = useToastController(toasterId);

    useEffect(() => {
        if (errorState && errorState?.description) {
            dispatchToast(
                <Toast>
                    <ToastTitle>ERROR: {errorState?.description}</ToastTitle>
                </Toast>,
            );
        }
    }, [errorState, dispatchToast]);

    return <Toaster toasterId={toasterId} timeout={4000} />;
}

export default ErrorMessage;
