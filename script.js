const formAJAX = document.querySelector('.form-select-ajax')
const select = document.body.querySelector('#select')
const field = document.querySelectorAll('.field')
const btn = document.querySelector('.btn-one')
const arrayselect = []






select.addEventListener('change', event => {

	for (opt of event.target.children) {
        if (opt.selected && opt.value == 4 ) {
            formAJAX.removeAttribute('disabled', 'disabled')
        break;
        } else if (opt.selected && opt.value == 1) {
            formAJAX.setAttribute('disabled', 'disabled')
            document.forms[0].reset();
        }
    }
    
    for (opt of event.target.children) {
        if (opt.selected) {
            const selectv = opt.innerHTML
            arrayselect.splice(0, 1, selectv)
            return
        }
    }
    
}, false);




const getResponse = async (url) => {
    let response = await fetch(url)

    if(!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`)
    }

    let content = await response.json()
    content = content.splice(0, 4)

    let i

    for (i in content) {
        formAJAX.innerHTML += `
        <option value="${i}">${content[i].title}</option>
        `
    }
}
getResponse('https://jsonplaceholder.typicode.com/photos')

const sendData = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        body: data,
    })
    if(!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`)
    }

    return await response.json()
}

const sendSelect = (data) => {

    console.log(btn);

    btn.addEventListener('click', e => {
        e.preventDefault()
        var errors = document.querySelectorAll('.error')
        for (var i = 0; i < errors.length; i++) {
            errors[i].remove()
        }
        for (let i = 0; i < field.length; i++) {
          if (field[i].value == 'Open this select menu') {
            var error = document.createElement('div')
            error.className = 'error'
            error.style.color = 'red'
            error.innerHTML = 'Cannot be blank'
            field[i].parentElement.insertBefore(error, field[i])
          } else {
            
          }
        }
        const datalist = JSON.stringify(data)
        sendData('https://jsonplaceholder.typicode.com/posts', datalist)
    })
}

sendSelect(arrayselect)

const btnTwo = document.querySelector('.btn-two')
const formClose = document.querySelector('.filter-form-close')
const formArray = document.querySelectorAll('.form-more__array')
const formArrayLink = document.querySelectorAll('.form__array')
const formLink = document.querySelectorAll('.form-more__link')
const filterForm = document.querySelector('.fliter-form')
const arrayElem = []

btnTwo.onclick = () => {
    filterForm.style.display = 'block'
}
formClose.onclick = () => {
    filterForm.style.display = 'none'
}

for (let i = 0; i < formLink.length; i++){
    arrayElem.push(formLink[i]);
    formLink[i].addEventListener('click', function(e){
        const id = arrayElem.indexOf(e.target);
        console.log('#', id);
        for(let i = 0; i <formLink.length; i++ ) {
            formLink[i].style.background = '#fff'
        }
        for(let f = 0; f <formArray.length; f++ ) {
            formArray[f].style.display = 'none'
        }
        formLink[id].style.background = '#a1b4ec'
        formArray[id].style.display = 'block'

    });
} 

for(let i = 0; i <formArrayLink.length; i++ ) {
    formArrayLink[i].addEventListener('click', () => {
        filterForm.style.display = 'none'
    })
}


window.addEventListener('click', (e) => {
    if (e.target == filterForm) {
        filterForm.style.display = 'none';
    }
});