/**
 *
 * @param countryCode
 * @param subscriberNumber
 * @returns {string}
 */
export const phoneFieldsFormatter = ({countryCode, subscriberNumber}) => { // iso format
    if (!countryCode || !subscriberNumber) {
        return '';
    }
    return `+${countryCode}${subscriberNumber}`;
};
