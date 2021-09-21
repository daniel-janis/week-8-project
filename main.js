

const ball = document.querySelector(`#full-ball`);
const message = document.querySelector(`#message`);
const form = document.querySelector(`form`);
const inquiry = document.querySelector(`#inquiry-bar`);
const triangle = document.querySelector(`#message-display`);

const baseUrl = `http://localhost:4005`


const submitQ = (e) => {
    e.preventDefault()
    let inquirys = inquiry.value
    let repeatedQuestions = []
    const runGet = () => {
        e.preventDefault()
        axios.get(`${baseUrl}/fortune`)
        .then((res) => {
            ball.classList.toggle(`ball`)
            message.classList.toggle(`fade-out`)
            triangle.classList.toggle(`fade-out`)
            let repQ = { type:`${res.data.type}`, key:`${inquirys}`, value:`${res.data.value}` }
            repeatedQuestions.push(repQ)
            setTimeout(() => {
                message.classList.toggle(`fade-out`)
                triangle.classList.toggle(`fade-out`)
                message.classList.toggle(`fade-in`)
                triangle.classList.toggle(`fade-in`)
                message.textContent = res.data.value
            }, 1000)
            setTimeout(() => {
                ball.classList.toggle(`ball`)
                message.classList.toggle(`fade-in`)
                triangle.classList.toggle(`fade-in`)
            }, 5000)
        })
    }
    console.log(inquirys)
    console.log(repeatedQuestions)
    if (repeatedQuestions.length === 0){
        runGet()
    } else if (repeatedQuestions.length >= 1){
    for ( let i = 0; i < repeatedQuestions.length; i++) {
        if (repeatedQuestions.contains(`positive`) || repeatedQuestions.contains(`negative`)) {
            if (repeatedQuestions.contains(`${inquirys}`)) {
                ball.classList.toggle(`ball`)
                message.classList.toggle(`fade-out`)
                triangle.classList.toggle(`fade-out`)
                setTimeout(() => {
                    message.classList.toggle(`fade-out`)
                    triangle.classList.toggle(`fade-out`)
                    message.classList.toggle(`fade-in`)
                    triangle.classList.toggle(`fade-in`)
                    message.textContent = repeatedQuestions[i].key
                        }, 1000)
                        setTimeout(() => {
                            ball.classList.toggle(`ball`)
                            message.classList.toggle(`fade-in`)
                            triangle.classList.toggle(`fade-in`)
                        }, 5000)
                    } else {
                        runGet()
                    }
                } else {
                    runGet()
                }
             }
        }
        inquiry.value = ``
};


const submitHandler = () => {
    const submit = form.submit(submitQ)
    return submit
};

ball.addEventListener(`click`, submitQ);


