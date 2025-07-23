const env = 'dev'; // 'dev' 'prod'

export const base_url = env == 'dev' ? "http://localhost:3001" : "";

export const Routes = {
    BOARD: `${base_url}/board`,
    LIST: `${base_url}/list`,
    CARD: `${base_url}/card`,
    USER: `${base_url}/user`,
};