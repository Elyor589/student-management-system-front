import { useNavigate, useLocation } from 'react-router-dom';
import React from 'react';

export default function NavLinkWithFade({ to, children, className }) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (e) => {
        e.preventDefault();

        // Select your container to animate
        const container = document.querySelector('.main-content');
        if (!container) {
            navigate(to);
            return;
        }

        // Add fade-out class
        container.classList.add('fade-out');

        // After animation ends (400ms), navigate
        setTimeout(() => {
            navigate(to);
            // Remove fade-out class so next page can fade in
            container.classList.remove('fade-out');
        }, 400);
    };

    // Prevent navigating to the same page again
    if (location.pathname === to) {
        return <span className={className}>{children}</span>;
    }

    return (
        <a href={to} onClick={handleClick} className={className}>
            {children}
        </a>
    );
}
