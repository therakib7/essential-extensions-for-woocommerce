export interface IAction {
    /**
     * Action type string key name.
     */
    type: string;
}

export interface IResponse {
    config?: any;
    data?: any;
    success?: any;
    headers?: any;
    request?: any;
    status?: number;
    statusText?: string;
}
