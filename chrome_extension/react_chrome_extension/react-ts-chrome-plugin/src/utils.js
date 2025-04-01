// Utility functions for the extension

const utils = {
    // Parse numeric value from string (handles Indian format)
    parseNumber: (value) => {
        if (typeof value !== 'string') return NaN;
        // Handle Indian number format (e.g., "1,00,000")
        value = value.replace(/,/g, '');
        return parseFloat(value);
    },

    // Format percentage for display
    formatPercentage: (value) => {
        return `${value.toFixed(2)}%`;
    },

    // Check if a string contains a numeric value
    isNumeric: (value) => {
        if (typeof value !== 'string') return false;
        return !isNaN(utils.parseNumber(value));
    },

    // Deep clone an object
    deepClone: (obj) => {
        return JSON.parse(JSON.stringify(obj));
    },

    // Validate color string
    isValidColor: (color) => {
        const s = new Option().style;
        s.color = color;
        return s.color !== '';
    },

    // Generate a unique ID
    generateId: () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    },

    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Debug logging wrapper
    log: (message, data = null) => {
        if (chrome.runtime.getManifest().version_name === 'development') {
            console.log(`[Screener Formatter] ${message}`, data || '');
        }
    }
};