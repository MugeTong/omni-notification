import {describe, expect, it} from 'vitest';
import {parseNumericValue} from '../src/utils/common-functions';

describe('parseNumericValue', () => {
  it('should parse valid px string', () => {
    const result = parseNumericValue('10px');
    expect(result).toEqual({type: 'px', value: 10});
  });

  it('should parse decimal px string', () => {
    const result = parseNumericValue('-10.5px');
    expect(result).toEqual({type: 'px', value: -10.5});
  });

  it('should parse valid percentage string', () => {
    const result = parseNumericValue('50%');
    expect(result).toEqual({type: '%', value: 50});
  });

  it('should parse decimal percentage string', () => {
    const result = parseNumericValue('-50.5%');
    expect(result).toEqual({type: '%', value: -50.5});
  });

  it('should parse "auto" string', () => {
    const result = parseNumericValue('auto');
    expect(result).toEqual({type: 'auto', value: 0});
  });

  it('should throw error for invalid string "5apx%"', () => {
    expect(() => parseNumericValue('5apx%'))
        .toThrow('Expected a valid number/string(px,%,auto), got "5apx%"');
  });

  it('should parse number input', () => {
    const result = parseNumericValue(20);
    expect(result).toEqual({type: 'px', value: 20});
  });

  it('should parse negative number input', () => {
    const result = parseNumericValue(-20.5);
    expect(result).toEqual({type: 'px', value: -20.5});
  });
});
