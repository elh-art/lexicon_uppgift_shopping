const signinForm = document.querySelector('.signin')
const signupForm = document.querySelector('.signup')

const firstName = document.getElementById('firstname')
const lastName = document.getElementById('lastname')
const emailSI = document.getElementById('email')
const emailSU = document.getElementById('emailSU')
const passwordSI = document.getElementById('password')
const passwordSU = document.getElementById('passwordSU')
const passwordSU2 = document.getElementById('passwordSU2')

signinForm.addEventListener('submit', e => {
  e.preventDefault()

  checkInputsSI()
})

signupForm.addEventListener('submit', e => {
  e.preventDefault()

  checkInputsSU()
})

// ### SIGNUP CHECKS: ###

function checkInputsSU() {
  const firstNameValue = firstName.value.trim()
  const lastNameValue = lastName.value.trim()
  const emailValue = emailSU.value.trim()
  const passwordValue = passwordSU.value.trim()
  const passwordValue2 = passwordSU2.value.trim()

  if(firstNameValue === ''){
      setErrorFor(firstName, 'Firstname field cannot be left empty!')  
    } else {
      setSuccessFor(firstName)
    }

  if(lastNameValue === ''){
      setErrorFor(lastName, 'Lastname field cannot be left empty!')  
    } else {
      setSuccessFor(lastName)
    }

  if(emailValue === ''){
      setErrorFor(emailSU, 'Email field cannot be left empty!')  
    } else if (!isEmail(emailValue)) {
      setErrorFor(emailSU, 'This is not a valid email address.')  
    } else {
      setSuccessFor(emailSU)
    }

  if(passwordValue === ''){
      setErrorFor(passwordSU, 'Password field cannot be left empty!')  
    } else if (!isPassword(passwordValue)) {
      setErrorFor(passwordSU, 'Minimum one lower, one upper case letter and a number. Min length: 8 characters.')
    } else {
      setSuccessFor(passwordSU)
    }

  if (passwordValue2 === ''){
    setErrorFor(passwordSU2, 'Password field cannot be left empty!')  
    } else if (passwordValue2 !== passwordValue) {
      setErrorFor(passwordSU2, 'Please, use the same password!')  
    } else {
      setSuccessFor(passwordSU2)
    }

  if (firstName.parentElement.classList.contains("success") &&
      lastName.parentElement.classList.contains('success') &&
      emailSU.parentElement.classList.contains('success') &&
      passwordSU.parentElement.classList.contains('success') &&
      passwordSU2.parentElement.classList.contains('success')) {
        window.alert('Successful registration, please check your email address for validation.')
        removeSuccess()
      }
    
}

// ### SIGNIN CHECKS: ###

function checkInputsSI() {
  const emailValue = emailSI.value.trim()
  const passwordValue = passwordSI.value.trim()

  if(emailValue === ''){
      setErrorFor(emailSI, 'Email field cannot be left empty!')  
    } else if (!isEmail(emailValue)) {
      setErrorFor(emailSI, 'This is not a valid email address.')  
    } else {
      setSuccessFor(emailSI)
    }

  if(passwordValue === ''){
      setErrorFor(passwordSI, 'Password field cannot be left empty!')  
    } else if (!isPassword(passwordValue)) {
      setErrorFor(passwordSI, 'Minimum one lower, one upper case letter and a number. Min length: 8 characters.')
    } else {
      setSuccessFor(passwordSI)
    }

}

// ### COMMON FUNCTIONS: ###

function setErrorFor(input, msg) {
  const inputControl = input.parentElement
  const small = inputControl.querySelector('small')
  small.innerText = msg
  inputControl.classList.add('error')
}

function setSuccessFor(input) {
  const inputControl = input.parentElement
  inputControl.classList.remove('error')
  inputControl.classList.add('success')
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
}

function isPassword(email) {
	return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(email)
}

function removeSuccess() {
  firstName.parentElement.classList.remove('success')
  lastName.parentElement.classList.remove('success')
  emailSU.parentElement.classList.remove('success')
  passwordSU.parentElement.classList.remove('success')
  passwordSU2.parentElement.classList.remove('success')
}