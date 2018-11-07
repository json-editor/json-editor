JSONEditor.defaults.editors.signature = JSONEditor.defaults.editors.string.extend({

  // This editor is using the signature pad editor from https://github.com/szimek/signature_pad
  // Credits for the pad itself go to https://github.com/szimek

  build: function() {
    var self = this, i;

    if(!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
    if(this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);
    var formname = this.formname.replace(/\W/g, '');

    if (typeof SignaturePad == 'function') {
      // Dynamically add the required CSS the first time this editor is used
      var styleId = 'json-editor-style-signature';
      var styles = document.getElementById(styleId);
      this.input = this.theme.getFormInputField('hidden');
      this.container.appendChild(this.input);

      // Required to keep height
      var signatureContainer = document.createElement('div');
      signatureContainer.classList.add('signature-container');

      // Create canvas for signature pad
      var canvas = document.createElement('canvas');
      canvas.setAttribute('name', formname);
      canvas.classList.add('signature');
      signatureContainer.appendChild(canvas);


      self.signaturePad = new window.SignaturePad(canvas, {
        onEnd: function() {

          // check if the signature is not empty before setting a value
          if (!self.signaturePad.isEmpty()) {
            self.input.value = self.signaturePad.toDataURL();
          } else {
            self.input.value = '';
          }

          self.is_dirty = true;
          self.refreshValue();
          self.watch_listener();
          self.jsoneditor.notifyWatchers(self.path);
          if(self.parent) self.parent.onChildEditorChange(self);
          else self.jsoneditor.onChange();

        }
      });

      // create button containers and add clear signature button
      var buttons = document.createElement('div');
      var clearButton = document.createElement('button');
      clearButton.classList.add('tiny', 'button');
      clearButton.innerHTML='Clear signature';
      buttons.appendChild(clearButton);
      signatureContainer.appendChild(buttons);

      if(this.options.compact) this.container.setAttribute('class',this.container.getAttribute('class')+' compact');

      if(this.schema.readOnly || this.schema.readonly) {
        this.always_disabled = true;
        $each(this.inputs,function(i,input) {
          canvas.setAttribute("readOnly", "readOnly");
          input.disabled = true;
        });
      }
      // add listener to the clear button. when clicked, trigger a canvas change after emptying the canvas
      clearButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        self.signaturePad.clear();
        // trigger stroke end to let signaturePad update the dataURL
        self.signaturePad.strokeEnd();
      });

      this.control = this.theme.getFormControl(this.label, signatureContainer, this.description);
      this.container.appendChild(this.control);
      this.refreshValue();

      // signature canvas will stretch to signatureContainer width
      canvas.width = signatureContainer.offsetWidth;
      if (self.options && self.options.canvas_height) {
        canvas.height = self.options.canvas_height;
      } else {
        canvas.height = "300"; // Set to default height of 300px;
      }
    } else {
      var message = document.createElement('p');
      message.innerHTML='Signature pad is not available, please include SignaturePad from https://github.com/szimek/signature_pad';
      this.container.appendChild(message);
    }

  },
  setValue: function(val) {
    var self = this, i;
    if (typeof SignaturePad == 'function') {
      var formname = this.formname.replace(/\W/g, '');
      var sanitized = this.sanitize(val);
      if(this.value === sanitized) {
        return;
      }
      self.value = sanitized;
      self.input.value = self.value;
      self.signaturePad.clear();
      // only set contents if value != ''
      if (val && val != '') {
        self.signaturePad.fromDataURL(val);
      }
      self.watch_listener();
      self.jsoneditor.notifyWatchers(self.path);
      return false;
    }
  },
  destroy: function() {
    var self = this, i;
    var formname = this.formname.replace(/\W/g, '');
    self.signaturePad.off();
    delete self.signaturePad;
  }
});
