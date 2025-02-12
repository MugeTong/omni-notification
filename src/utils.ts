// Description: Utility functions for the library


type NumericType = 'auto' | 'px' | '%';
export type NumericValue = { type: NumericType; value: number; };
/**
 * Parse a string value to a number
 * 
 * ['auto', 100, '100px', 100%] => [
 *   {type='auto', value=0},
 *   {type='px', value=100},
 *   {type='px', value=100},
 *   {type='%', value=100}
 * ]
 */
export function parseNumericValue(position: number | string): NumericValue {
    let type: NumericType = 'auto';
    let value: number = 0;
    if (typeof position === 'string') {
        const match = position.match(/^(\d+(\.\d+)?)(px|%)/);
        if (match) {
            value = parseInt(match[1]);
            type = match[2] as NumericType;
        }
    } else {
        type = 'px';
        value = position;
    }
    return { type, value };
}

















