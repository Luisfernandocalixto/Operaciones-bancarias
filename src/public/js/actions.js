document.addEventListener("click", async function (e) {
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
        alertify.success('Success');
        return response.text();
      })
      .then((data) => {
        document.querySelector("#operations").style.display = 'none';
        document.querySelector("#consult").style.display = 'block';
        document.querySelector("#consult").innerHTML = data;
      })
      .catch((error) => {
        alertify.error('UPS! Ocurrió un error');
      })
  }

  let reBack = e.target.closest(".reBack")
  if (reBack) {
    document.querySelector("#operations").style.display = 'block';
    document.querySelector("#consult").style.display = 'none';
  }

  let reBackInsufficient = e.target.closest(".reBackInsufficient")
  if (reBackInsufficient) {
    document.querySelector("#operations").style.display = 'block';
    document.querySelector("#formInsufficient").style.display = 'none';
  }

  let reBackRest = e.target.closest(".reBackRest")
  if (reBackRest) {
    document.querySelector("#operations").style.display = 'block';
    document.querySelector("#formRestCompleted").style.display = 'none';
  }

  let addValue = e.target.closest(".addValue");
  if (addValue) {

    let element = addValue.dataset.uuid;

    document.querySelector("#operations").style.display = 'none';
    let contentForm = document.querySelector("#add");
    let documentForm = document.createElement('div');
    documentForm.innerHTML = `<form action="" id="formPostAdd" class="formDesign" style="display: grid;" >
        <input
          type="number"
          name="addElement"
          id="addElement"
          value=""
          hidden
        />
        <label for="addedValue">Ingrese cantidad a depositar</label>
        <input type="text" class="inputDesign" name="addedValue" id="addedValue" readonly required 
        min="1000" max="9999" oninput="validateInput(event)" maxLength="4"
        />
        
        <input type="number" class="" name="element" id="element" value="${element}" readonly required hidden/> 
        <div class="">
          <div class="markedForm">
            <input
              type="button"
              class="btn "
              value="1"
              onclick="added('1')"
            />
            <input
              type="button"
              class="btn "
              value="2"
              onclick="added('2')"
            />
      
            <input
              type="button"
              class="btn "
              value="3"
              onclick="added('3')"
            />
            <input type="button" class="btn" value="Borrar" onclick="removeValueAdded()" />
          </div>
          <div class="markedForm">
            <input
              type="button"
              class="btn "
              value="4"
              onclick="added('4')"
            />
            <input
              type="button"
              class="btn "
              value="5"
              onclick="added('5')"
            />
            <input
              type="button"
              class="btn "
              value="6"
              onclick="added('6')"
            />
            <input type="button" class="btn" value="Cancel" id="cancel" />
          </div>
          <div class="markedForm">
      
            <input
              type="button"
              class="btn "
              value="7"
              onclick="added('7')"
            />
            <input
              type="button"
              class="btn "
              value="8"
              onclick="added('8')"
            />
            <input
              type="button"
              class="btn "
              value="9"
              onclick="added('9')"
            />
            <button
              type="submit"
              class="btn btn-disabled"
              id="responseAdded"
            >Enter</button>
          </div>
      
          <div class="markedForm">
            <input
              type="button"
              class="btn "
              value="0"
              onclick="added('0')"
              style="margin-right: 80px;"
            />
          </div>
          <div>
      
          </div>
        </div>
        </form>`;

    contentForm.appendChild(documentForm);

    let formPostAdd = document.querySelector("#formPostAdd");
    let responseAdded = document.querySelector("#responseAdded");


    formPostAdd.addEventListener('submit', async function (event) {
      event.preventDefault();

      responseAdded.classList.add("btn-disabled")

      let formData = new FormData(formPostAdd);
      fetch('/addValue', {
        method: 'POST',
        body: formData
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error the data of server');
          }
          alertify.success('Success');
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

  let cancelFormPostAdd = e.target.closest("#cancel");
  if (cancelFormPostAdd) {
    let formPostAdd = document.querySelector('#formPostAdd');
    formPostAdd.remove();
    document.querySelector("#operations").style.display = 'block';
  }


  let formAdd = e.target.closest("#formAdd");
  if (formAdd) {
    document.querySelector("#formAdd").style.display = 'none';
    document.querySelector("#operations").style.display = 'block';
  }


  let addSend = e.target.closest(".addSend");
  if (addSend) {

    let element = addSend.dataset.uuid;

    document.querySelector("#operations").style.display = 'none';
    let contentForm = document.querySelector("#addTransfer");
    let documentForm = document.createElement('div');

    documentForm.innerHTML = `
    <form action="" id="formPostSend" class="formDesign" style="display: grid;" >
        <input
          type="number"
          name="addElementRest"
          id="addElementRest"
          value=""
          hidden
        />
        <label for="addedValue">Ingrese cantidad a retirar</label>
        <input type="text" class="inputDesign" name="addedValueRest" id="addedValueRest" readonly required 
        min="1000" max="9999" oninput="" maxLength="4"
        />
        
        <input type="number" class="" name="element" id="element" value="${element}" readonly required hidden/> 
        <div class="">
          <div class="markedForm">
            <input
              type="button"
              class="btn "
              value="1"
              onclick="addedRest('1')"
            />
            <input
              type="button"
              class="btn "
              value="2"
              onclick="addedRest('2')"
            />
      
            <input
              type="button"
              class="btn "
              value="3"
              onclick="addedRest('3')"
            />
            <input type="button" class="btn" value="Borrar" onclick="removeValueRest()" />
          </div>
          <div class="markedForm">
            <input
              type="button"
              class="btn "
              value="4"
              onclick="addedRest('4')"
            />
            <input
              type="button"
              class="btn "
              value="5"
              onclick="addedRest('5')"
            />
            <input
              type="button"
              class="btn "
              value="6"
              onclick="addedRest('6')"
            />
            <input type="button" class="btn" value="Cancel" id="cancelRest" />
          </div>
          <div class="markedForm">
      
            <input
              type="button"
              class="btn "
              value="7"
              onclick="addedRest('7')"
            />
            <input
              type="button"
              class="btn "
              value="8"
              onclick="addedRest('8')"
            />
            <input
              type="button"
              class="btn "
              value="9"
              onclick="addedRest('9')"
            />
            <button
              type="submit"
              class="btn btn-disabled"
              id="responseAddedRest"
            >Enter</button>
          </div>
      
          <div class="markedForm">
            <input
              type="button"
              class="btn "
              value="0"
              onclick="addedRest('0')"
              style="margin-right: 80px;"
            />
          </div>
          <div>
      
          </div>
        </div>
        </form>
    `;

    contentForm.appendChild(documentForm);

    let formPostSend = document.querySelector("#formPostSend")
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
    document.querySelector("#operations").style.display = 'block'
  }

});


// add value to input
function added(value) {

  let addedValue = document.getElementById("addedValue").value += value;
  if (parseInt(addedValue) === 0) return
  if (addedValue.length > 0) {
    responseAdded.classList.remove("btn-disabled");
    responseAdded.classList.add("btn-neutral");
  }
  document.getElementById("addedValue").value = parseInt(addedValue);
}

// remove value to input
function removeValueAdded() {
  const valueAdd = document.getElementById("addedValue").value;
  const resultAdd = valueAdd.slice(0, -1);
  if (resultAdd.length == 0) {
    responseAdded.classList.remove("btn-neutral")
    responseAdded.classList.add("btn-disabled")
  }
  document.getElementById('addedValue').value = resultAdd;
}

// add value to input
function addedRest(value) {
  let addedValueRest = document.getElementById("addedValueRest").value += value;
  if (addedValueRest.length > 0) {
    responseAddedRest.classList.remove("btn-disabled");
    responseAddedRest.classList.add("btn-neutral");
  }
  document.getElementById("addedValueRest").value = parseInt( addedValueRest);
}

// remove value to input
function removeValueRest() {
  const valueRest = document.getElementById("addedValueRest").value;
  const resultRest = valueRest.slice(0, -1);
  if (resultRest.length == 0) {
    responseAddedRest.classList.remove("btn-neutral")
    responseAddedRest.classList.add("btn-disabled")
  }
  document.getElementById('addedValueRest').value = resultRest;
}


