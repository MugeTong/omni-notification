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
export function parseNumericValue(measurement: number | string): NumericValue {
  let type: NumericType = 'auto';
  let value: number = 0;
  if (typeof measurement === 'string') {
    const match = measurement.match(/^(-?\d+(\.\d+)?)(px|%)$/);
    if (match) {
      value = parseFloat(match[0]);
      type = match[3] as NumericType;
    } else if (measurement !== 'auto') {
      throw new Error(`Expected a valid number/string(px,%,auto), got "${measurement}"`);
    }
  } else {
    type = 'px';
    value = measurement;
  }
  return {type, value};
}

/**
 * Increment a number used for id generation
 */
export const incrementId = (i => () => i++)(0);

/**
 * Parse a position string to CSS style
 *
 * top-left => top: 0; left: 0;
 * center => top: 50%; left: 50%; transform: translate(-50%, -50%);
 * bottom-right => bottom: 0; right: 0;
 * top-center => top: 0; left: 50%; transform: translateX(-50%);
 */
export function parsePosition(position: string): string {
  const [vertical, horizontal] = position.split('-');
  let style = '';
  switch (vertical) {
    case 'top':
      style += 'top: 0;';
      break;
    case 'center':
      style += 'top: 50%; left: 50%; transform: translate(-50%, -50%);';
      break;
    case 'bottom':
      style += 'bottom: 0;';
      break;
  }
  switch (horizontal) {
    case 'left':
      style += 'left: 0;';
      break;
    case 'center':
      style += 'left: 50%; transform: translateX(-50%);';
      break;
    case 'right':
      style += 'right: 0;';
      break;
  }
  return style;
}
