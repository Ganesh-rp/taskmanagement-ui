import { useLocation } from 'react-router-dom';


export const useQuery = () => {
    return new window.URLSearchParams(useLocation().search);
}

export const setItem = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data));
}

export const getItem = (name) => {
   return JSON.parse(localStorage.getItem(name));
}

export const clearItem = () => {
    localStorage.clear();
}


export const getPosition = () => {
    const user = getItem('user');
    return user?.position;
}
