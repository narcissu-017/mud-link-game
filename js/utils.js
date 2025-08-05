// js/utils.js

/**
 * Clamps a number between a minimum and maximum value.
 * @param {number} value The number to clamp.
 * @param {number} min The minimum value.
 * @param {number} max The maximum value.
 * @returns {number} The clamped number.
 */
export function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
}
