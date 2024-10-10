// Exercise 6
function validate() {
	var error = 0;

	// Get the input fields
	var fName = document.getElementById("fName");
	var fEmail = document.getElementById("fEmail");
	var fAddress = document.getElementById("fAddress");
	var fLastN = document.getElementById("fLastN");
	var fPassword = document.getElementById("fPassword");
	var fPhone = document.getElementById("fPhone");

	// Get the error elements
	var errorName = document.getElementById("errorName");
	var errorEmail = document.getElementById("errorEmail");
	var errorAddress = document.getElementById("errorAddress");
	var errorLastN = document.getElementById("errorLastN");
	var errorPassword = document.getElementById("errorPassword");
	var errorPhone = document.getElementById("errorPhone");


	//Validaciones de expresiones regulares para inputs específicos
	var lettersOnly = /^[a-zA-Z\s]+$/;
	var numbersOnly = /^[0-9]+$/;
	var lettersAndNumbers = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
	var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	// Limpiar mensajes de error anteriores
	clearValidation([fName, fEmail, fAddress, fLastN, fPassword, fPhone]);

	//NAME VALIDATION
	if (fName.value.trim() === "") {
		showError(fName, errorName, "El nombre es obligatorio.");
		error++;
	} else if (fName.value.length < 3) {
		showError(fName, errorName, "El nombre debe tener al menos 3 caracteres.");
		error++;
	} else if (!lettersOnly.test(fName.value)) {
		showError(fName, errorName, "El nombre solo debe contener letras.");
		error++;
	} else {
		showValid(fName, errorName);
	}

	//MAIL VALIDATION
	if (fEmail.value.trim() === "") {
		showError(fEmail, errorEmail, "El mail es obligatorio.");
		error++;
	} else if (fEmail.value.length < 3) {
		showError(fEmail, errorEmail, "El mail debe tener al menos 3 caracteres.");
		error++;
	} else if (!emailPattern.test(fEmail.value)) {
		showError(fEmail, errorEmail, "El mail debe tener un formato correcto: example@dominio.com");
		error++;
	} else {
		showValid(fEmail, errorEmail);
	}

	//ADDRESS VALIDATION
	if (fAddress.value.trim() === "") {
		showError(fAddress, errorAddress, "La dirección es obligatoria.");
		error++;
	} else if (fAddress.value.length < 3) {
		showError(fAddress, errorAddress, "La dirección debe tener al menos 3 caracteres.");
		error++;
	} else {
		showValid(fAddress, errorAddress);
	}

	//LAST NAME VALIDATION
	if (fLastN.value.trim() === "") {
		showError(fLastN, errorLastN, "El apellido es obligatorio.");
		error++;
	} else if (fLastN.value.length < 3) {
		showError(fLastN, errorLastN, "El apellido debe tener al menos 3 caracteres.");
		error++;
	} else if (!lettersOnly.test(fLastN.value)) {
		showError(fLastN, errorLastN, "El apellido solo debe contener letras.");
		error++;
	} else {
		showValid(fLastN, errorLastN);
	}

	//PASSWORD VALIDATION
	if (fPassword.value.trim() === "") {
		showError(fPassword, errorPassword, "La contraseña es obligatoria.");
		error++;
	} else if (fPassword.value.length < 3) {
		showError(fPassword, errorPassword, "La contraseña debe tener al menos 3 caracteres.");
		error++;
	} else if (!lettersAndNumbers.test(fPassword.value)) {
		showError(fPassword, errorPassword, "El password debe contener al menos una letra y un número.");
		error++;
	} else {
		showValid(fPassword, errorPassword);
	}

	//PHONE VALIDATION
	if (fPhone.value.trim() === "") {
		showError(fPhone, errorPhone, "El teléfono es obligatorio.");
		error++;
	} else if (fPhone.value.length < 9) {
		showError(fPhone, errorPhone, "El teléfono debe tener al menos 9 dígitos.");
		error++;
	} else if (!numbersOnly.test(fPhone.value)) {
		showError(fPhone, errorPhone, "El teléfono solo debe contener números.");
		error++;
	} else {
		showValid(fPhone, errorPhone);
	}

	//ALL IN OK :)
	if (error === 0) {
		alert("Tu formulario se ha enviado correctamente!");
		//si quisiese que se enviase, descomentaria la linea de abajo
		// document.getElementById("checkoutForm").submit();
	}

}

//Funcion para limpiar todas las validaciones (arriba la uso con todos los inputs)
function clearValidation(fields) {
	fields.forEach(function (field) {
		field.classList.remove("is-invalid");
		field.classList.remove("is-valid");
	});
}

//Funcion para reutilizar las validaciones OK de bootstrap en verde
function showValid(inputField, errorField) {
	inputField.classList.remove("is-invalid");
	inputField.classList.add("is-valid");
	errorField.style.display = "none";
}

//Funcion para reutilizar los errores de bootstrap en rojo
function showError(inputField, errorField, errorMessage) {
	inputField.classList.add("is-invalid");
	inputField.classList.remove("is-valid");
	errorField.textContent = errorMessage;
	errorField.style.display = "block";
}
