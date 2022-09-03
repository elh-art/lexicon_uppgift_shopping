const respErrorElem = document.getElementById('response-error')
const respErrorElem2 = document.getElementById('response-error2')

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
          respErrorElem2.innerText = 'There is already a user with the same email address'
          event.target[5].children[0].classList.add('d-none')
          clearErrorMsg('error2')
        }
        if (response.status === 200) {
          document.getElementById('response-success').innerText = 'SUCCESS! Now you can Login.'
          event.target[5].children[0].classList.add('d-none')
          clearErrorMsg('success')
        }
      }
     )
    } else {
      respErrorElem2.innerText = 'Not all validations tests passed, please correct your values'
      event.target[5].children[0].classList.add('d-none')
      clearErrorMsg('error2')
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
      .then(async res => {
        if(res.status === 400) throw new Error(await res.text()) 
        else  
            return res.text()
      })
      .then(data => {
        sessionStorage.setItem('token', data)
        window.location.replace('account.html')
      })
      .catch(async error => {
        respErrorElem.innerText = await error.message
        event.target[2].children[0].classList.add('d-none')
        clearErrorMsg('error')
      })
      
    } else {
      respErrorElem.innerText = 'Not all validations tests passed, please correct your values'
      event.target[2].children[0].classList.add('d-none')
      clearErrorMsg('error')
    }
}

function handleSignOut() {
  sessionStorage.removeItem('token')
  window.location.replace('myaccount.html')
}

function isSignedIn() {
  let token = sessionStorage.getItem('token')
  if(token === null || token === undefined)
  window.location.replace('myaccount.html')
}

function clearErrorMsg(text) {
  setTimeout(() => {
    document.getElementById(`response-${text}`).innerText = ''
  }, "3000")
}