////
///Serialização de forms
///
function SerializarForm(selector) {
    /* Because serializeArray() ignores unset checkboxes and radio buttons: */
    //Checkbox
    var values = [];

    values = values.concat(
        $(selector + ' input[type=checkbox]:checked:not(.MultiColumnSelectAll)').map(
            function () {

                return { "name": this.name, "value": this.value }
            }).get()
    );

    //Dropdown
    values = values.concat(
        $(selector + ' select').map(
            function () {
                return { "name": this.name, "value": this.value }
            }).get()
    );


    values = values.concat($(selector + " input:not([type='checkbox'])").serializeArray());

    return values;
}

///
///Retorna índice se encontra
///
function ArrayObjectContainsIndex(array, property, value) {
    var indice = -1;
    $.each(array, function (index, item) {
        if (item[property] != undefined)
            if (item[property] == value)
                indice = index;
    });
    return indice;
}