rp-validate
===========
options:
  errors:
	  Pattern:
			{
				error_code1: {
					message: function_msg_return_string,
					validate: func_validate1_return_boolean
				},
				...
				error_code2: {
					message:	string_msg,
					validate: func_validate2_return_boolean
				}
			}
			
methods:
  code: 	return error code
	error: 	return error message
	add: 		add new error_object
		args:
			code
			handle
	remove:
		args:
			code
	valid: return input validity