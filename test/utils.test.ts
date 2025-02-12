import {describe, expect, it} from 'vitest';
import { parseNumericValue, NumericValue } from '../src/utils';

describe('parseNumericValue', () => {
    it('should parse integer values with px correctly', () => {
        const result = parseNumericValue('20px');
        expect(result.type).toBe('px');
        expect(result.value).toBe(20);
    });

    it('should parse floating-point values with px correctly', () => {
        const result: NumericValue = parseNumericValue('20.5px');
        expect(result.type).toBe('px');
        expect(result.value).toBe(20.5);
    });

    it('should parse integer values with % correctly', () => {
        const result: NumericValue = parseNumericValue('50%');
        expect(result.type).toBe('%');
        expect(result.value).toBe(50);
    });

    it('should parse floating-point values with % correctly', () => {
        const result: NumericValue = parseNumericValue('50.75%');
        expect(result.type).toBe('%');
        expect(result.value).toBe(50.75);
    });

    it('should parse number values as px when passed a number directly', () => {
        const result: NumericValue = parseNumericValue(10);
        expect(result.type).toBe('px');
        expect(result.value).toBe(10);
    });

    it('should default to "auto" type for invalid string inputs', () => {
        const result: NumericValue = parseNumericValue('invalid');
        expect(result.type).toBe('auto');
        expect(result.value).toBe(0);
    });

    it('should handle empty string input gracefully', () => {
        const result: NumericValue = parseNumericValue('');
        expect(result.type).toBe('auto');
        expect(result.value).toBe(0);
    });

    it('should return default values when input is not a valid number or unit', () => {
        const result: NumericValue = parseNumericValue('abcpx');
        expect(result.type).toBe('auto');
        expect(result.value).toBe(0);
    });
});
