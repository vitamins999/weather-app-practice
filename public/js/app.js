const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value

    messageOne.textContent = 'Gathering data...'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    fetch(`/weather?address=${location}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (!data.error) {
                messageOne.textContent = data.location
                messageTwo.textContent = `${data.temp}°C (feels like ${data.feelsLike}°C)`
                messageThree.textContent = data.description
            } else {
                messageOne.textContent = data.error
            }
        })
})