(function($,undefined){


	$.widget( "rp.validate" , {
		options:{
			errors:{},
		},
		_options:{
			error: '',
			code: null
		},
		code: function(){
			return that._options.code;
		},
		error: function(){
			return this._options.error;
		},
		add: function(code,handle){
			if(!code||!handle)
				throw "Invalid Validation Error Message Object given.";
			
			if(typeof handle.message == "string"||
				typeof handle.message == "function");
			else
				throw "Invalid Validation Error Message Object given.";
			
			if(typeof handle.validate != "function")
				throw "Invalid Validation Error Message Object given.";
			
			this.options.errors.code=handle;
		},
		remove: function(code){
			delete code in this.options.errors;
		},
		valid: function(){
			var that=this;
			//disable the custom validity
			this.element[0].setCustomValidity('');
			
			if(this.element[0].checkValidity()==false){
				that._options.error=this.element[0].validationMessage;
				that._options.code='';
				return false;
			}
			for(i in that.options.errors){
				if(that.options.errors[i].validate.call(that.element)==false){
					if(typeof that.options.errors[i].message=="function")
						that._options.error=that.options.errors[i].message.call(that.element);
					else
						that._options.error=that.options.errors[i].message;
					that._options.code=i;
					return false;
				}
			}
			that._options.code=null;
			that._options.error='';
			
			return true;
		},
		_create:function(){
			//asume this is
			if(this.element[0].checkValidity==false)
				throw "Invalid element to create validation";
				
			var that=this;
			
			that._typeCheckErrors();
			
			this.element.bind('keyup'+that.eventNamespace,function(event){
				//clear the invalid message
				that._options.error='';
				
				//check the default validity
				if(that.valid()==false){
					$(this).
						attr('data-error',that._options.error).
						addClass('rp-error');
				}
				else{
					$(this).
						removeClass('rp-error').
						removeAttr('data-error');
				}
				that.element.
					tooltip().
					tooltip('close').
					tooltip({
						items:'[data-error]',
						content:function(){
							return $(this).data('error');
						},
						position:{ my: "center bottom+3", at: "center top" }
						
					}).
					tooltip('open');
			});
		},
		_typeCheckErrors:function(){
			for(var i in this.options.errors){
				if(typeof this.options.errors[i].message == "string"||
					typeof this.options.errors[i].message == "function");
				else
					throw "Invalid Validation Error Message Object given.";
				if(typeof this.options.errors[i].validate != "function")
					throw "Invalid Validation Error Message Object given.";
			}
		},
		_destroy:function(){
			var that=this;
			this.element.
				tooltip().
				tooltip('destroy').
				unbind('keyup'+that.eventNamespace).
				removeClass('rp-error').
				removeAttr('data-error').
				removeData('data-error');
		}
	});
}(jQuery) );