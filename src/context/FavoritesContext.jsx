import { createContext, useContext, useState, useCallback } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('sbs-favorites')) || [];
        } catch { return []; }
    });

    const toggleFavorite = useCallback((id) => {
        setFavorites(prev => {
            const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
            localStorage.setItem('sbs-favorites', JSON.stringify(next));
            return next;
        });
    }, []);

    const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}
