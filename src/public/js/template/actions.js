export const formByAdd = ({ element }) => {
    return `<form id="formByAdd" class="formDesign grid">
    <input type="number" name="addElement" id="addElement" value="" hidden />
    <label for="addedValue">Ingrese cantidad a depositar</label>
    <input type="text" class="inputDesign inputByAdd" name="addedValue" id="addedValue" readonly required min="1000" max="9999"
        oninput="validateInput(event)" maxLength="4" />

    <input type="number" class="" name="element" id="element" value="${element}" readonly required hidden />
    <div class="">
        <div class="markedForm">
            <input type="button" class="btn added" value="1" " />
            <input type="button" class="btn added" value="2" " />

            <input type="button" class="btn added" value="3"  />
            <input type="button" class="btn remove" value="Borrar" />
        </div>
        <div class="markedForm">
            <input type="button" class="btn added" value="4" />
            <input type="button" class="btn added" value="5" />
            <input type="button" class="btn added" value="6" />
            <input type="button" class="btn cancel" value="Cancel" />
        </div>
        <div class="markedForm">

            <input type="button" class="btn added" value="7" />
            <input type="button" class="btn added" value="8" />
            <input type="button" class="btn added" value="9" />
            <button type="submit" class="btn btn-disabled submitAdd">Enter</button>
        </div>

        <div class="markedForm">
            <input type="button" class="btn added mr-[80px]" value="0"  />
        </div>
        <div>

        </div>
    </div>
</form>`
}

export const formByDesign = ({ element }) => {
    return `
<form action="" id="formPostSend" class="formDesign grid">
    <input type="number" name="addElementRest" id="addElementRest" value="" hidden />
    <label for="addedValue">Ingrese cantidad a retirar</label>
    <input type="text" class="inputDesign inputByRest" name="addedValueRest" id="addedValueRest" readonly required min="1000"
        max="9999" oninput="" maxLength="4" />

    <input type="number" class="" name="element" id="element" value="${element}" readonly required hidden />
    <div class="">
        <div class="markedForm">
            <input type="button" class="btn withdraw" value="1" />
            <input type="button" class="btn withdraw" value="2" />

            <input type="button" class="btn withdraw" value="3" />
            <input type="button" class="btn removeWithdraw" value="Borrar" />
        </div>
        <div class="markedForm">
            <input type="button" class="btn withdraw" value="4" />
            <input type="button" class="btn withdraw" value="5" />
            <input type="button" class="btn withdraw" value="6" />
            <input type="button" class="btn" value="Cancel" id="cancelRest" />
        </div>
        <div class="markedForm">

            <input type="button" class="btn withdraw" value="7" />
            <input type="button" class="btn withdraw" value="8" />
            <input type="button" class="btn withdraw" value="9" />
            <button type="submit" class="btn btn-disabled btnSubmitWithdraw" id="responseAddedRest">Enter</button>
        </div>

        <div class="markedForm">
            <input type="button" class="btn withdraw mr-[80px]" value="0" />
        </div>
        <div>

        </div>
    </div>
</form>`
}