// Implements ipv4 and ipv6 format validations as perhttps://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-7.3.4
export var ipValidator = {
    validate:function(schema, value, path) {
       var errors = [];
       if(schema.format==="ipv4") 
       {
         try
         {
           var parts=value.split('.');
           if( parts.length !==4)
           {
             throw(Error());
           }
           parts.forEach(function(part){
             if( isNaN(+part) || +part < 0 || +part>255)
             {
               throw(Error());
             }
           });
         }
         catch(err)
         {
           errors.push({
             path: path,
             property: 'format',
             message: 'ipv4 addresses must be in the form of 4 numbers between 0 and 255, separated by dots'
           });
         }
       }
       else if(schema.format==="ipv6")
       {
         if( !(/^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}/).test(value))
         {
          errors.push({
            path: path,
            property: 'format',
            message: 'ipv6 addresses must be in the form of 4 numbers between 0 and 255, separated by dots'
          });  
         }
       }
  
       return errors;
     }
   };
   
   // Export ipValidator to allow it to be 'required()' by unit tests
   if( typeof(exports) !== 'undefined')
   {
    /* jshint undef: false */   
     exports.ipValidator = ipValidator;
   }
   
   
  