import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const APP_NAME = 'Integration Centre';

export function useRouteDocumentTitle() {
    const location = useLocation();

    useEffect(() => {
        const title = location.pathname
            .split('/')
            .filter(Boolean)
            .map(
                segment =>
                    segment.charAt(0).toUpperCase() + segment.slice(1)
            )
            .join(' · ');

        document.title = title
            ? `${title}`
            : APP_NAME;
    }, [location.pathname]);
}
