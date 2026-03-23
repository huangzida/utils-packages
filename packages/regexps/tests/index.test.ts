import { describe, it, expect } from "vitest";
import {
  isEmail,
  isUrl,
  isIpv4,
  isIpv6,
  isUuid,
  isPhone,
  isNumeric,
  isIdCard,
  isZipCode,
  isChinese,
  isHostname,
  isNanoid,
  isByte,
  matchHex,
  hasDigitAndLetter,
  hasDigitsLettersWithCase,
} from "../src/index";

describe("@zid-utils/regexps", () => {
  describe("isEmail", () => {
    it("should validate correct emails", () => {
      expect(isEmail.test("test@example.com")).toBe(true);
      expect(isEmail.test("user.name@domain.co.uk")).toBe(true);
      expect(isEmail.test("user+tag@example.org")).toBe(true);
    });

    it("should reject invalid emails", () => {
      expect(isEmail.test("invalid-email")).toBe(false);
      expect(isEmail.test("@domain.com")).toBe(false);
      expect(isEmail.test("user@")).toBe(false);
    });
  });

  describe("isUrl", () => {
    it("should validate correct URLs", () => {
      expect(isUrl.test("https://example.com")).toBe(true);
      expect(isUrl.test("http://www.example.org/path")).toBe(true);
      expect(isUrl.test("ftp://files.server.com")).toBe(true);
    });

    it("should reject invalid URLs", () => {
      expect(isUrl.test("not-a-url")).toBe(false);
      expect(isUrl.test("example.com")).toBe(false);
    });
  });

  describe("isIpv4", () => {
    it("should validate correct IPv4 addresses", () => {
      expect(isIpv4.test("192.168.1.1")).toBe(true);
      expect(isIpv4.test("0.0.0.0")).toBe(true);
      expect(isIpv4.test("255.255.255.255")).toBe(true);
      expect(isIpv4.test("10.0.0.1")).toBe(true);
    });

    it("should reject invalid IPv4 addresses", () => {
      expect(isIpv4.test("256.1.1.1")).toBe(false);
      expect(isIpv4.test("192.168.1")).toBe(false);
      expect(isIpv4.test("192.168.1.1.1")).toBe(false);
    });
  });

  describe("isIpv6", () => {
    it("should validate correct IPv6 addresses", () => {
      expect(isIpv6.test("::1")).toBe(true);
      expect(isIpv6.test("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).toBe(true);
      expect(isIpv6.test("fe80::1")).toBe(true);
    });

    it("should reject invalid IPv6 addresses", () => {
      expect(isIpv6.test("invalid-ipv6")).toBe(false);
      expect(isIpv6.test("not-a-valid-address")).toBe(false);
    });
  });

  describe("isUuid", () => {
    it("should validate correct UUIDs", () => {
      expect(isUuid.test("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
      expect(isUuid.test("urn:uuid:550e8400-e29b-41d4-a716-446655440000")).toBe(
        true,
      );
      expect(isUuid.test("123e4567-e89b-12d3-a456-426614174000")).toBe(true);
    });

    it("should reject invalid UUIDs", () => {
      expect(isUuid.test("not-a-uuid")).toBe(false);
      expect(isUuid.test("550e8400-e29b-41d4-a716")).toBe(false);
    });
  });

  describe("isPhone", () => {
    it("should validate correct phone numbers", () => {
      expect(isPhone.test("13812345678")).toBe(true);
      expect(isPhone.test("8613812345678")).toBe(true);
      expect(isPhone.test("1795113912345678")).toBe(true);
    });

    it("should reject invalid phone numbers", () => {
      expect(isPhone.test("123456")).toBe(false);
      expect(isPhone.test("abc")).toBe(false);
    });
  });

  describe("isNumeric", () => {
    it("should validate numeric strings", () => {
      expect(isNumeric.test("123456")).toBe(true);
      expect(isNumeric.test("0")).toBe(true);
    });

    it("should reject non-numeric strings", () => {
      expect(isNumeric.test("123.456")).toBe(false);
      expect(isNumeric.test("abc")).toBe(false);
      expect(isNumeric.test("123abc")).toBe(false);
    });
  });

  describe("isIdCard", () => {
    it("should validate correct Chinese ID cards", () => {
      expect(isIdCard.test("110101199001011234")).toBe(true);
      expect(isIdCard.test("110101900101123")).toBe(true);
    });

    it("should reject invalid ID cards", () => {
      expect(isIdCard.test("invalid")).toBe(false);
      expect(isIdCard.test("123")).toBe(false);
    });
  });

  describe("isZipCode", () => {
    it("should validate correct Chinese zip codes", () => {
      expect(isZipCode.test("100000")).toBe(true);
      expect(isZipCode.test("510000")).toBe(true);
    });

    it("should reject invalid zip codes", () => {
      expect(isZipCode.test("12345")).toBe(false);
      expect(isZipCode.test("1234567")).toBe(false);
      expect(isZipCode.test("012345")).toBe(false);
    });
  });

  describe("isChinese", () => {
    it("should validate Chinese characters", () => {
      expect(isChinese.test("你好世界")).toBe(true);
      expect(isChinese.test("中文")).toBe(true);
    });

    it("should reject non-Chinese strings", () => {
      expect(isChinese.test("hello")).toBe(false);
      expect(isChinese.test("hello你好")).toBe(false);
      expect(isChinese.test("123")).toBe(false);
    });
  });

  describe("isHostname", () => {
    it("should validate correct hostnames", () => {
      expect(isHostname.test("example.com")).toBe(true);
      expect(isHostname.test("sub.domain.org")).toBe(true);
      expect(isHostname.test("my-host.io")).toBe(true);
    });

    it("should reject invalid hostnames", () => {
      expect(isHostname.test("-invalid.com")).toBe(false);
      expect(isHostname.test("has space.com")).toBe(false);
    });
  });

  describe("isNanoid", () => {
    it("should validate correct nanoids (21 chars)", () => {
      const testStr = "ABCDEFGHIJKLMNOPQRSTU";
      expect(testStr).toHaveLength(21);
      expect(isNanoid.test(testStr)).toBe(true);
    });

    it("should reject invalid nanoids", () => {
      expect(isNanoid.test("short")).toBe(false);
      expect(isNanoid.test("V1StGXR8_Z5jdHi6B")).toBe(false);
    });
  });

  describe("isByte", () => {
    it("should validate base64 encoded strings", () => {
      expect(isByte.test("SGVsbG8gV29ybGQ=")).toBe(true);
    });

    it("should reject invalid base64 strings", () => {
      expect(isByte.test("not-base64!")).toBe(false);
    });
  });

  describe("matchHex", () => {
    it("should match hex color codes", () => {
      expect(matchHex.test("#ffffff")).toBe(true);
      expect(matchHex.test("#fff")).toBe(true);
      expect(matchHex.test("ffffff")).toBe(true);
    });
  });

  describe("hasDigitAndLetter", () => {
    it("should validate strings with digits and letters", () => {
      expect(hasDigitAndLetter.test("abc123")).toBe(true);
      expect(hasDigitAndLetter.test("password1")).toBe(true);
    });

    it("should reject strings without both", () => {
      expect(hasDigitAndLetter.test("abc")).toBe(false);
      expect(hasDigitAndLetter.test("123")).toBe(false);
    });
  });

  describe("hasDigitsLettersWithCase", () => {
    it("should validate strings with digits, upper and lower case", () => {
      expect(hasDigitsLettersWithCase.test("Password123")).toBe(true);
      expect(hasDigitsLettersWithCase.test("Abc123")).toBe(true);
    });

    it("should reject strings without all requirements", () => {
      expect(hasDigitsLettersWithCase.test("password123")).toBe(false);
      expect(hasDigitsLettersWithCase.test("PASSWORD123")).toBe(false);
      expect(hasDigitsLettersWithCase.test("Password")).toBe(false);
    });
  });
});
