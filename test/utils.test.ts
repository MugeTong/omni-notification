import {describe, expect, it} from 'vitest';
import {parseNumericValue} from '../src/utils';

describe('parseNumericValue', () => {
  it('should parse valid px string', () => {
    expect(parseNumericValue('10px')).toEqual({type: 'px', value: 10});
  });

  it('should parse valid percentage string', () => {
    expect(parseNumericValue('50%')).toEqual({type: '%', value: 50});
  });

  it('should throw error for invalid string', () => {
    expect(() => parseNumericValue('abc')).toThrow('Expected a valid number/string(px,%,auto), got "abc"');
  });

  it('should parse "auto" string', () => {
    expect(parseNumericValue('auto')).toEqual({type: 'auto', value: 0});
  });

  it('should parse number input', () => {
    expect(parseNumericValue(20)).toEqual({type: 'px', value: 20});
  });

  it('should parse decimal px string', () => {
    expect(parseNumericValue('10.5px')).toEqual({type: 'px', value: 10.5});
  });

  it('should parse decimal percentage string', () => {
    expect(parseNumericValue('50.5%')).toEqual({type: '%', value: 50.5});
  });
});