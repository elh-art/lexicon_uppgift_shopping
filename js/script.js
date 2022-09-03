function validate(event) {
  switch(event.type) {
    case "keyup":
      validateElement(event.target)
      break
    case "submit":
      for (let element of event.target) {
        validateElement(element)
      }
      break
  }
}

  function validateElement(element) {
    let error = ''
      switch(element.type) {
        case "text":
          switch(element.id) {
            case "firstname":
              if(isValid(element.value, /^([a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\-]{2,})+$/)){
                error = ''
                document.getElementById(`${element.id}-error`).parentElement.classList.add('validated')
              }
              else {
                error = 'Failed firstname validation.'
                document.getElementById(`${element.id}-error`).parentElement.classList.remove('validated')
              }
            break
            case "lastname":
              if(isValid(element.value, /^([a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ'`'\-]{2,})+$/)){
                error = ''
                document.getElementById(`${element.id}-error`).parentElement.classList.add('validated')
              }
              else {
                error = 'Failed lastname validation.'
                document.getElementById(`${element.id}-error`).parentElement.classList.remove('validated')
              }
            break
          }
          break
        case "email":
          if(isValid(element.value, /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            error = ''
            document.getElementById(`${element.id}-error`).parentElement.classList.add('validated')
          }
          else {
            error = 'Failed email validation.'
            document.getElementById(`${element.id}-error`).parentElement.classList.remove('validated')
          }
          break
        case "password":
          switch(element.id) {
            case "password":
            case "password2":
              if(isValid(element.value, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)){
                error = ''
                document.getElementById(`${element.id}-error`).parentElement.classList.add('validated')
                  }
              else {
                error = 'Minimum one lower, one upper case letter and a number. Min length: 8 characters.'
                document.getElementById(`${element.id}-error`).parentElement.classList.remove('validated')
              }
            break
            case "password-repeat":
              if(document.getElementById('password2').value !== element.value) {
                error = 'Please, use the same password'
                document.getElementById(`${element.id}-error`).parentElement.classList.remove('validated')
              }
              else {
                error = ''
                document.getElementById(`${element.id}-error`).parentElement.classList.add('validated')
              }
            break
          }
        }

    // IF USER DELETES THE VALUE THE ERROR MESSAGE DISSAPEARS  
    if (element.value === '') {
      error = ''
    }
    document.getElementById(`${element.id}-error`).innerText = error
  }

    function isValid(value, regEx) {
      if (regEx.test(value)){
        return true
      } else {
          return false
      }
    }


function handleSignUp(event) {
  event.preventDefault()
  event.target[5].children[0].classList.remove('d-none')

  if (isAllValidated(event, 5)) {

      let json = JSON.stringify({
        firstname: event.target[0].value,
        lastname: event.target[1].value,
        email: event.target[2].value,
        password: event.target[3].value
      })
      
      fetch('https://lexicon-shared-webapi.azurewebsites.net/api/auth/signup', {
        method: 'post',
        headers: {'Content-type':'application/json'},
        body: json
      })
      .then(response => {
        if (response.status === 409) {
          document.getElementById('response-error2').innerText = 'There is already a user with the same email address'
          event.target[5].children[0].classList.add('d-none')
        }
        if (response.status === 200) {
          window.location.replace('account.html')
        }
      }
     )
    } else {
      document.getElementById('response-error2').innerText = 'Not all validations tests passed, please correct your values'
      event.target[5].children[0].classList.add('d-none')
    }
  }
  
function isAllValidated(event, num) {
  let iArray = []
  for (let i = 0 ; i < num ; i++){
    if(event.target[i].parentElement.classList.contains('validated')){
      iArray.push(i)
    }
  }
  if (iArray.length === num) {
    return true
  } else {
    return false
  }
}

function handleSignIn(event) {
  event.preventDefault()
  event.target[2].children[0].classList.remove('d-none')

  if (isAllValidated(event, 2)) {

      let json = JSON.stringify({
        email: event.target[0].value,
        password: event.target[1].value
      })
      
      fetch('https://lexicon-shared-webapi.azurewebsites.net/api/auth/signin', {
        method: 'post',
        headers: {'Content-type':'application/json'},
        body: json
      })
      .then(response => {
        if (response.status === 400) {
          document.getElementById('response-error').innerText = 'Ops! Email and password not matching.'
          event.target[2].children[0].classList.add('d-none')
        }
        if (response.status === 200) {
          window.location.replace('account.html')
        }
      })
      .then(data => {
        console.log(data)
        sessionStorage.setItem('token', data)
      })
     
    } else {
      document.getElementById('response-error').innerText = 'Not all validations tests passed, please correct your values'
      event.target[2].children[0].classList.add('d-none')
    }
}

function handleSignOut() {
  sessionStorage.removeItem('token')
  window.location.replace('myaccount.html')
}

function isSignedIn() {
  // let token = sessionStorage.getItem('token')
  // if(token === null || token === undefined)
  // window.location.replace('myaccount.html')
}

// document.className.includes('input-control')


// const signinForm = document.querySelector('.signin')
// const signupForm = document.querySelector('.signup')

// const firstName = document.getElementById('firstname')
// const lastName = document.getElementById('lastname')
// const emailSI = document.getElementById('email')
// const emailSU = document.getElementById('emailSU')
// const passwordSI = document.getElementById('password')
// const passwordSU = document.getElementById('passwordSU')
// const passwordSU2 = document.getElementById('passwordSU2')

// signinForm.addEventListener('submit', e => {
//   e.preventDefault()

//   checkInputsSI()
// })

// signupForm.addEventListener('submit', e => {
//   e.preventDefault()

//   checkInputsSU()
// })

// // ### SIGNUP CHECKS: ###

// function checkInputsSU() {
//   const firstNameValue = firstName.value.trim()
//   const lastNameValue = lastName.value.trim()
//   const emailValue = emailSU.value.trim()
//   const passwordValue = passwordSU.value.trim()
//   const passwordValue2 = passwordSU2.value.trim()

//   if(firstNameValue === ''){
//       setErrorFor(firstName, 'Firstname field cannot be left empty!')  
//     } else {
//       setSuccessFor(firstName)
//     }

//   if(lastNameValue === ''){
//       setErrorFor(lastName, 'Lastname field cannot be left empty!')  
//     } else {
//       setSuccessFor(lastName)
//     }

//   if(emailValue === ''){
//       setErrorFor(emailSU, 'Email field cannot be left empty!')  
//     } else if (!isEmail(emailValue)) {
//       setErrorFor(emailSU, 'This is not a valid email address.')  
//     } else {
//       setSuccessFor(emailSU)
//     }

//   if(passwordValue === ''){
//       setErrorFor(passwordSU, 'Password field cannot be left empty!')  
//     } else if (!isPassword(passwordValue)) {
//       setErrorFor(passwordSU, 'Minimum one lower, one upper case letter and a number. Min length: 8 characters.')
//     } else {
//       setSuccessFor(passwordSU)
//     }

//   if (passwordValue2 === ''){
//     setErrorFor(passwordSU2, 'Password field cannot be left empty!')  
//     } else if (passwordValue2 !== passwordValue) {
//       setErrorFor(passwordSU2, 'Please, use the same password!')  
//     } else {
//       setSuccessFor(passwordSU2)
//     }

//   if (firstName.parentElement.classList.contains("success") &&
//       lastName.parentElement.classList.contains('success') &&
//       emailSU.parentElement.classList.contains('success') &&
//       passwordSU.parentElement.classList.contains('success') &&
//       passwordSU2.parentElement.classList.contains('success')) {
//         window.alert('Successful registration, please check your email address for validation.')
//         removeSuccess()
//       }
    
// }

// // ### SIGNIN CHECKS: ###

// function checkInputsSI() {
//   const emailValue = emailSI.value.trim()
//   const passwordValue = passwordSI.value.trim()

//   if(emailValue === ''){
//       setErrorFor(emailSI, 'Email field cannot be left empty!')  
//     } else if (!isEmail(emailValue)) {
//       setErrorFor(emailSI, 'This is not a valid email address.')  
//     } else {
//       setSuccessFor(emailSI)
//     }

//   if(passwordValue === ''){
//       setErrorFor(passwordSI, 'Password field cannot be left empty!')  
//     } else if (!isPassword(passwordValue)) {
//       setErrorFor(passwordSI, 'Minimum one lower, one upper case letter and a number. Min length: 8 characters.')
//     } else {
//       setSuccessFor(passwordSI)
//     }

// }

// // ### COMMON FUNCTIONS: ###

// function setErrorFor(input, msg) {
//   const inputControl = input.parentElement
//   const small = inputControl.querySelector('small')
//   small.innerText = msg
//   inputControl.classList.add('error')
// }

// function setSuccessFor(input) {
//   const inputControl = input.parentElement
//   inputControl.classList.remove('error')
//   inputControl.classList.add('success')
// }

// function isEmail(email) {
// 	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
// }

// function isPassword(email) {
// 	return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(email)
// }

// function removeSuccess() {
//   firstName.parentElement.classList.remove('success')
//   lastName.parentElement.classList.remove('success')
//   emailSU.parentElement.classList.remove('success')
//   passwordSU.parentElement.classList.remove('success')
//   passwordSU2.parentElement.classList.remove('success')
// }