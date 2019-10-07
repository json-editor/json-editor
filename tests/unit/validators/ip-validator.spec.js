import { ipValidator } from '../../../src/validators/ip-validator';

function mockTranslate(message){
  return message;
}

describe("ipvValidator", function() {
  describe("ipValidator()", function(){
    describe("when format is ipv4", function(){
      it("returns an empty array for a valid IPV4 address", function() {
        expect(ipValidator({format:"ipv4"}, "172.0.0.1", "my/path", mockTranslate ).length).toBe(0);
      });      
      it("returns an error if the string does not contain four dot-separated parts", function() {
        expect(ipValidator({format:"ipv4"}, "172.0.0", "my/path", mockTranslate).length).toBe(1);
        expect(ipValidator({format:"ipv4"}, "172.0.0.1.1", "my/path", mockTranslate).length).toBe(1);
      });      
      it("returns an error if all the parts aren't numbers", function() {
        expect(ipValidator({format:"ipv4"}, "172.0.0.foo", "my/path", mockTranslate).length).toBe(1);
      });      
      it("returns an error if any of the numbers are outside the range 0-255", function() {
        expect(ipValidator({format:"ipv4"}, "172.0.0.256", "my/path", mockTranslate ).length).toBe(1);
        expect(ipValidator({format:"ipv4"}, "172.0.-1.1", "my/path", mockTranslate ).length).toBe(1);
      });      
    });
    describe("when format is ipv6", function(){
      // See https://tools.ietf.org/html/rfc2373#section-2.2
      it("returns an empty array for a preferred-form IPV6 address", function() {
        expect(ipValidator({format:"ipv6"}, "1080:0:0:0:8:800:200C:417A", "my/path", mockTranslate ).length).toBe(0);
        expect(ipValidator({format:"ipv6"}, "FF01:0:0:0:0:0:0:101", "my/path", mockTranslate ).length).toBe(0);
        expect(ipValidator({format:"ipv6"}, "0:0:0:0:0:0:0:1", "my/path", mockTranslate ).length).toBe(0);
        expect(ipValidator({format:"ipv6"}, "0:0:0:0:0:0:0:0", "my/path", mockTranslate ).length).toBe(0);
      });           
      it("returns an error if any of the contents are not hex or colons", function() {
        expect(ipValidator({format:"ipv4"}, "GF01:0:0:0:0:0:0:101", "my/path", mockTranslate ).length).toBe(1);
      });      
      it("returns an error if there are more than 8 parts", function() {
        expect(ipValidator({format:"ipv4"}, "FF01:0:0:0:0:0:0:101:34", "my/path", mockTranslate ).length).toBe(1);
      });      
      // Still not properly implemented so disable test for now
      it("returns an empty array for a compressed-zero IPV6 address", function() {
        expect(ipValidator({format:"ipv6"}, "1080::8:800:200C:417A", "my/path", mockTranslate ).length).toBe(0);
        expect(ipValidator({format:"ipv6"}, "FF01::101", "my/path", mockTranslate ).length).toBe(0);
        expect(ipValidator({format:"ipv6"}, "::1", "my/path", mockTranslate ).length).toBe(0);
        expect(ipValidator({format:"ipv6"}, "::", "my/path", mockTranslate ).length).toBe(0);
      });      
    });
    describe("when format is hostname", function(){
      it("returns an empty array for a valid hostname ", function() {
        expect(ipValidator({format:"hostname"}, "www.github.com", "my/path", mockTranslate ).length).toBe(0);
      });      
      it("returns an error if the string does contains repeated dots", function() {
        expect(ipValidator({format:"hostname"}, "www..github.com", "my/path", mockTranslate).length).toBe(1);
      });      
    });

  });
  describe("when format is anything else", function(){
    it("should return an empty array", function(){
      expect(ipValidator({format:"foo"}, "dafdaec2343", "my/path", mockTranslate ).length).toBe(0);
    });
  })
});