import { describe, it, expect } from 'vitest';

const VALID_COUNTRIES = ['US', 'CA', 'GB', 'AU', 'BD'];

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC'
];

const CA_PROVINCES = [
  'AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'
];

const BD_DIVISIONS = [
  'BARISAL', 'CHITTAGONG', 'DHAKA', 'KHULNA', 'MYMENSINGH', 'RAJSHAHI', 'RANGPUR', 'SYLHET'
];

function validateAddress(data: any): { valid: boolean; error?: string } {
  const required = ['firstName', 'lastName', 'address1', 'city', 'state', 'postalCode', 'country'];
  for (const field of required) {
    if (!data[field] || typeof data[field] !== 'string' || data[field].trim() === '') {
      return { valid: false, error: `Missing required field: ${field}` };
    }
  }

  if (data.firstName.length > 50) return { valid: false, error: 'First name must be 50 characters or less' };
  if (data.lastName.length > 50) return { valid: false, error: 'Last name must be 50 characters or less' };
  if (data.company && data.company.length > 100) return { valid: false, error: 'Company must be 100 characters or less' };
  if (data.address1.length > 100) return { valid: false, error: 'Address line 1 must be 100 characters or less' };
  if (data.address2 && data.address2.length > 100) return { valid: false, error: 'Address line 2 must be 100 characters or less' };
  if (data.city.length > 50) return { valid: false, error: 'City must be 50 characters or less' };

  if (!VALID_COUNTRIES.includes(data.country)) {
    return { valid: false, error: 'Invalid country' };
  }

  if (data.country === 'US' && !US_STATES.includes(data.state)) {
    return { valid: false, error: 'Invalid US state' };
  }
  if (data.country === 'CA' && !CA_PROVINCES.includes(data.state)) {
    return { valid: false, error: 'Invalid Canadian province' };
  }
  if (data.country === 'BD' && !BD_DIVISIONS.includes(data.state.toUpperCase())) {
    return { valid: false, error: 'Invalid Bangladesh division' };
  }

  const postalCode = data.postalCode.trim().toUpperCase();
  if (data.country === 'US') {
    if (!/^\d{5}(-\d{4})?$/.test(postalCode)) {
      return { valid: false, error: 'Invalid US ZIP code format (use 12345 or 12345-6789)' };
    }
  } else if (data.country === 'CA') {
    if (!/^[A-Z]\d[A-Z] ?\d[A-Z]\d$/.test(postalCode)) {
      return { valid: false, error: 'Invalid Canadian postal code format (use A1A 1A1)' };
    }
  } else if (data.country === 'GB') {
    if (!/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/.test(postalCode)) {
      return { valid: false, error: 'Invalid UK postcode format' };
    }
  } else if (data.country === 'AU') {
    if (!/^\d{4}$/.test(postalCode)) {
      return { valid: false, error: 'Invalid Australian postcode format (use 1234)' };
    }
  } else if (data.country === 'BD') {
    if (!/^\d{4}$/.test(postalCode)) {
      return { valid: false, error: 'Invalid Bangladesh postal code format (use 1212)' };
    }
  }

  return { valid: true };
}

const validAddress = {
  firstName: 'John',
  lastName: 'Doe',
  address1: '123 Main St',
  city: 'San Francisco',
  state: 'CA',
  postalCode: '94102',
  country: 'US',
};

describe('Address Validation', () => {
  describe('Required fields', () => {
    it('should pass with all required fields', () => {
      const result = validateAddress(validAddress);
      expect(result.valid).toBe(true);
    });

    it('should fail when firstName is missing', () => {
      const { firstName, ...rest } = validAddress;
      const result = validateAddress(rest);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('firstName');
    });

    it('should fail when lastName is missing', () => {
      const { lastName, ...rest } = validAddress;
      const result = validateAddress(rest);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('lastName');
    });

    it('should fail when address1 is missing', () => {
      const { address1, ...rest } = validAddress;
      const result = validateAddress(rest);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('address1');
    });

    it('should fail when city is missing', () => {
      const { city, ...rest } = validAddress;
      const result = validateAddress(rest);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('city');
    });

    it('should fail when state is missing', () => {
      const { state, ...rest } = validAddress;
      const result = validateAddress(rest);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('state');
    });

    it('should fail when postalCode is missing', () => {
      const { postalCode, ...rest } = validAddress;
      const result = validateAddress(rest);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('postalCode');
    });

    it('should fail when country is missing', () => {
      const { country, ...rest } = validAddress;
      const result = validateAddress(rest);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('country');
    });

    it('should fail when required field is empty string', () => {
      const result = validateAddress({ ...validAddress, firstName: '' });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('firstName');
    });

    it('should fail when required field is whitespace only', () => {
      const result = validateAddress({ ...validAddress, lastName: '   ' });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('lastName');
    });
  });

  describe('Bangladesh (BD) validation', () => {
    const bdValidAddress = {
      firstName: 'Rahim',
      lastName: 'Ahmed',
      address1: 'House 123, Road 4',
      city: 'Dhaka',
      state: 'DHAKA',
      postalCode: '1212',
      country: 'BD',
    };

    it('should pass with valid Bangladesh address', () => {
      const result = validateAddress(bdValidAddress);
      expect(result.valid).toBe(true);
    });

    it('should pass with all valid Bangladesh divisions', () => {
      for (const division of BD_DIVISIONS) {
        const result = validateAddress({ ...bdValidAddress, state: division });
        expect(result.valid).toBe(true);
      }
    });

    it('should pass with lowercase Bangladesh division', () => {
      const result = validateAddress({ ...bdValidAddress, state: 'dhaka' });
      expect(result.valid).toBe(true);
    });

    it('should pass with mixed case Bangladesh division', () => {
      const result = validateAddress({ ...bdValidAddress, state: 'DhAkA' });
      expect(result.valid).toBe(true);
    });

    it('should fail with invalid Bangladesh division', () => {
      const result = validateAddress({ ...bdValidAddress, state: 'INVALID' });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid Bangladesh division');
    });

    it('should pass with valid 4-digit Bangladesh postal code', () => {
      const result = validateAddress({ ...bdValidAddress, postalCode: '1212' });
      expect(result.valid).toBe(true);
    });

    it('should fail with invalid Bangladesh postal code (3 digits)', () => {
      const result = validateAddress({ ...bdValidAddress, postalCode: '123' });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Bangladesh postal code');
    });

    it('should fail with invalid Bangladesh postal code (5 digits)', () => {
      const result = validateAddress({ ...bdValidAddress, postalCode: '12345' });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Bangladesh postal code');
    });

    it('should fail with invalid Bangladesh postal code (letters)', () => {
      const result = validateAddress({ ...bdValidAddress, postalCode: 'ABCD' });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Bangladesh postal code');
    });
  });
});