// Description: Utility functions for the library


type NumericType = 'auto' | 'px' | '%';
type NumericValue = { type: NumericType; value: number; };

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
    const match = position.match(/^(-?\d+(\.\d+)?)(px|%)$/);
    if (match) {
      value = parseFloat(match[0]);
      type = match[3] as NumericType;
    } else if (position !== 'auto') {
      throw new Error(`Expected a valid number/string(px,%,auto), got "${position}"`);
    }
  } else {
    type = 'px';
    value = position;
  }
  return {type, value};
}
