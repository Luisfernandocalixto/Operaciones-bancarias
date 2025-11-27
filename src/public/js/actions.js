import { formByAdd, formByDesign } from '/js/template/actions.js';
document.addEventListener('DOMContentLoaded', function () {

  document.addEventListener("click", async function (e) {
    const myFormByAdd = e.target.closest(".addValue");
    const consult = document.querySelector("#consult");
    const operations = document.querySelector("#operations");

    let checkValue = e.target.closest(".checkValue");
    if (checkValue) {
      let formPost = document.querySelector("#formPost")
      let formData = new FormData(formPost);
      fetch('/checkValue', {
        method: 'POST',
        body: formData
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error the data of server');
          }
          else {
            alertify.success('Success');
          }
          return response.text();
        })
        .then((data) => {
          operations.style.display = 'none';
          consult.style.display = 'block';
          consult.innerHTML = data;
        })
        .catch((error) => {
          alertify.error('UPS! Ocurrió un error');
        })
    }

    let reBack = e.target.closest(".reBack")
    if (reBack) {
      operations.style.display = 'block';
      consult.style.display = 'none';
    }

    let reBackInsufficient = e.target.closest(".reBackInsufficient")
    if (reBackInsufficient) {
      operations.style.display = 'block';
      document.querySelector("#formInsufficient").style.display = 'none';
    }

    let reBackRest = e.target.closest(".reBackRest")
    if (reBackRest) {
      operations.style.display = 'block';
      document.querySelector("#formRestCompleted").style.display = 'none';
    }

    if (myFormByAdd) {

      let element = addValue.dataset.uuid;

      operations.style.display = 'none';
      let contentForm = document.querySelector("#add");
      let documentForm = document.createElement('div');
      documentForm.innerHTML = formByAdd({ element: element });

      contentForm.appendChild(documentForm);

    }

    const btnCancel = e.target.closest(".cancel");
    if (btnCancel) {
      document.querySelector('#formByAdd').remove();
      operations.style.display = 'block';
    }

    const btnSubmitAdd = e.target.closest("#btnSubmitAdd");
    if (btnSubmitAdd) {
      document.querySelector('#formByAdd').remove();
      operations.style.display = 'block';
    }


    let formAdd = e.target.closest("#formAdd");
    if (formAdd) {
      document.querySelector("#formAdd").style.display = 'none';
      operations.style.display = 'block';
    }


    let addSend = e.target.closest(".addSend");
    if (addSend) {

      let element = addSend.dataset.uuid;

      operations.style.display = 'none';
      let contentForm = document.querySelector("#addTransfer");
      let documentForm = document.createElement('div');

      documentForm.innerHTML = formByDesign({ element: element });

      contentForm.appendChild(documentForm);

      const formPostSend = document.querySelector("#formPostSend")
      let responseAddedRest = document.querySelector("#responseAddedRest")

      formPostSend.addEventListener('submit', async function (event) {
        event.preventDefault();

        responseAddedRest.classList.add("btn-disabled");

        let formData = new FormData(formPostSend);
        fetch('/restValue', {
          method: 'POST',
          body: formData
        })
          .then((response) => {
            if (!response.ok) {
              alertify.error('UPS! Ocurrió un error');
              throw new Error('Error the data send')
            }

            alertify.success('Success');
            return response.text();

          })
          .then((data) => {
            formPostSend.reset();
            formPostSend.remove();
            document.querySelector("#responseInsufficient").innerHTML = data;
          })
          .catch((error) => {
            formPostSend.reset();
            formPostSend.style.display = 'none';
            alertify.error('UPS! Ocurrió un error');
          })

      })

    }

    // remove form 
    let cancelRest = e.target.closest('#cancelRest');
    if (cancelRest) {
      let formPostSend = document.querySelector("#formPostSend");
      formPostSend.remove();
      operations.style.display = 'block'
    }
    const btnWithdraw = e.target.closest('.withdraw');
    if (btnWithdraw) {
      const formPostSend = document.querySelector("#formPostSend");
      const btnByFormPostSend = formPostSend.querySelector("button[type='submit']");
      const inputByRest = formPostSend.querySelector(".inputByRest");
      inputByRest.value += btnWithdraw.value;
      if (inputByRest.value.startsWith("0")) {
        const testValue = Array.from(inputByRest.value).filter(e => e !== "0");
        inputByRest.value = testValue;

      };
      if (inputByRest.value.length > 0) {
        btnByFormPostSend.classList.remove("btn-disabled");
        btnByFormPostSend.classList.add("btn-neutral");
      }
    }
    const btnAdded = e.target.closest('.added');
    if (btnAdded) {
      const formByAdd = document.querySelector("#formByAdd");
      const btnByFormByAdd = formByAdd.querySelector("button[type='submit']");
      const inputByAdd = formByAdd.querySelector(".inputByAdd");
      inputByAdd.value += parseInt(btnAdded.value)
      if (inputByAdd.value.startsWith("0")) {
        const testValue = Array.from(inputByAdd.value).filter(e => e !== "0");
        inputByAdd.value = testValue;
      }
      if (inputByAdd.value.length > 0) {
        btnByFormByAdd.classList.remove("btn-disabled");
        btnByFormByAdd.classList.add("btn-neutral");
      }
    }

    const btnRemove = e.target.closest('.remove');
    if (btnRemove) {
      const formByAdd = document.querySelector("#formByAdd");
      const btnByFormByAdd = formByAdd.querySelector("button[type='submit']");
      const inputByAdd = formByAdd.querySelector(".inputByAdd").value;
      const resultRemove = inputByAdd.slice(0, -1);
      if (resultRemove.length == 0) {
        btnByFormByAdd.classList.remove("btn-neutral")
        btnByFormByAdd.classList.add("btn-disabled")
      }

      document.querySelector('.inputByAdd').value = resultRemove;

    }
    const btnRemoveWithdraw = e.target.closest('.removeWithdraw');
    if (btnRemoveWithdraw) {
      const formPostSend = document.querySelector("#formPostSend");
      const btnSubmitWithdraw = formPostSend.querySelector(".btnSubmitWithdraw");
      const inputByRest = formPostSend.querySelector(".inputByRest").value;
      const resultRemove = inputByRest.slice(0, -1);
      if (resultRemove.length == 0) {
        btnSubmitWithdraw.classList.remove("btn-neutral")
        btnSubmitWithdraw.classList.add("btn-disabled")
      }

      document.querySelector('.inputByRest').value = resultRemove;

    }

    const submitAdd = document.querySelector('.submitAdd');
    if (submitAdd) {
      const formPostSend = document.querySelector('#formByAdd');
      const btnOfFormPostSend = formPostSend?.querySelector('button[type="submit"]');
      formPostSend?.addEventListener('submit', function (event) {
        event.preventDefault();


        btnOfFormPostSend.classList.add("btn-disabled")

        const formData = new FormData(formPostSend);
        fetch('/addValue', {
          method: 'POST',
          body: formData
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Error the data of server');
            }
            else {
              alertify.success('Success');
            }
            return response.text();

          })
          .then((data) => {
            document.querySelector("#add").innerHTML = data;
          })
          .catch((error) => {
            alertify.error('UPS! Ocurrió un error');
          })
      })

    }

  }); //end click




}) // end DOMContentLoaded