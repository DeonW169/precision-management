export interface AlertState {
    open: boolean;
    severity: 'success' | 'info' | 'warning' | 'error';
    message: string;
    duration: number;
    nextRoute: string | null;
}

export interface OpenAlertPayload {
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error';
    duration?: number;
    nextRoute?: string;
}