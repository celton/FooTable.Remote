//Permanent
var __grid = {};
var FooTableExtend = {};
FooTableExtend.__gridAction = {};
FooTableExtend.__gridPostData = {};

FooTableExtend.__gridRowsData = {};
FooTableExtend.__gridPageData = {};
FooTableExtend.__gridSidxData = {};
FooTableExtend.__gridSordData = {};

//Configurável
FooTableExtend.__gridBootstrapHeadClass = "success";
FooTableExtend.__gridDistinctLines = false;
FooTableExtend.__gridBootstrapAlternateRowClass = "active";

FooTableExtend.__gridOrderDescTHClass = "footable-desc";
FooTableExtend.__gridOrderAscTHClass = "footable-asc";

FooTableExtend.__gridOrderDescSpanClass = "fooicon-sort-desc";
FooTableExtend.__gridOrderAscSpanClass = "fooicon-sort-asc";
FooTableExtend.__gridExpandWhenReduze = false;

//Linhas
FooTableExtend.__gridRows = 15;
//Página
FooTableExtend.__gridPage = 1;

//Field Name Index
FooTableExtend.__gridSidx = "Id";

//ASC ou DESC
FooTableExtend.__gridSord = "ASC";

/**
 * Inicializa o Grid
 * @param {(jQuery|jQuery.selector|HTMLTableElement)} seletor - The jQuery table object, selector or the HTMLTableElement to initialize FooTable on.
 * @param {object} options - The options to initialize FooTable with.
 * @param {bool} expandWhenReduze - When reduze, expand.  
 * @param {string | HTML Content} htmlToControls - Add a content at footer of grid.
 * @returns {Objeto grid} - Adicionar a uma variável
 */
FooTableExtend.Init = function (seletor, options, expandWhenReduze, htmlToControls) {
    var _seletor = seletor.replace("#", "").replace(".", "");

    __grid[_seletor] = FooTable.init(seletor, options);

    $(seletor + " th").addClass(FooTableExtend.__gridBootstrapHeadClass);

    $(seletor).append(__FooTableFooter);

    if (htmlToControls != undefined && htmlToControls != null)
        $("#GridControl").append(htmlToControls);

    if (expandWhenReduze != undefined && typeof expandWhenReduze == 'boolean')
        FooTableExtend.__gridExpandWhenReduze = expandWhenReduze;

    var objetosGrid = __grid[__transformarSeletorId(seletor)].columns.array;
    $.each(objetosGrid, function (indexSortDefault, objetosGridItem) {
        if (objetosGridItem.name == $(seletor).attr("data-sidx")) {
            var selecionada = $(seletor + " th")[indexSortDefault];
            if ($(seletor).attr("data-sord").toUpperCase() == "ASC") {
                $(selecionada).removeClass("fooicon-sort").addClass(FooTableExtend.__gridOrderAscTHClass);
                $(selecionada).children("span").removeClass("fooicon-sort").addClass(FooTableExtend.__gridOrderAscSpanClass);
            } else {
                $(selecionada).removeClass("fooicon-sort").addClass(FooTableExtend.__gridOrderDescTHClass);
                $(selecionada).children("span").removeClass("fooicon-sort").addClass(FooTableExtend.__gridOrderDescSpanClass);
            }
        }
    });

    //TODO: DistinctLines - Colorir linhas alternadamente
    //if (distinctLines != undefined)
    //    FooTableExtend.__gridDistinctLines = distinctLines;

    __FooTableSort(seletor);

    //TODO: Não postará a data ao inicializar
    //FooTableExtend.PostData(seletor, $(seletor).attr("data-url"), true, SerializarForm(seletor), FooTableExtend.__gridRows, FooTableExtend.__gridPage, $(seletor).attr("data-sidx"), $(seletor).attr("data-sord"));

    AdicionarEventoPaginacao(seletor);
};

/**
 * Adds a row to the underlying {@link FooTable.Rows#all} array.
 * @param {(jQuery|jQuery.selector|HTMLTableElement)} seletor - The jQuery table object, selector or the HTMLTableElement to initialize FooTable on.
 * @param {(object|FooTable.Row)} dataRow - A hash containing the row values or an actual {@link FooTable.Row} object.
  */
FooTableExtend.AddRow = function (seletor, dataRow) {
    var totalAnterior = $("#grid tbody tr").not('.footable-empty').length;
    var activeClass = "default";

    //TODO: DistinctLines - Colorir linhas alternadamente
    //if (FooTableExtend.__gridDistinctLines == true && totalAnterior > 0 && totalAnterior % 2 > 0)
    //    activeClass = FooTableExtend.__gridBootstrapAlternateRowClass;

    __grid[__transformarSeletorId(seletor)].rows.add({
        "options": {
            "expanded": FooTableExtend.__gridExpandWhenReduze,
            "classes": activeClass
        },
        "value": dataRow
    });
}

/**
*@param {(jQuery|jQuery.selector|HTMLTableElement)} seletor - The jQuery table object, selector or the HTMLTableElement to initialize FooTable on.
*/
FooTableExtend.DeleteAllRows = function (seletor) {
    while (__grid[__transformarSeletorId(seletor)].rows.all.length > 0)
        __grid[__transformarSeletorId(seletor)].rows.delete(0);
}

/**
 * Adds a row to the underlying {@link FooTable.Rows#all} array.
 * @param {(jQuery|jQuery.selector|HTMLTableElement)} seletor - The jQuery table object, selector or the HTMLTableElement to initialize FooTable on.
* @param {string} objectAction - Name of field. Example: "Acao";
 * @param {function} objectAction - Object with his function. Example: ("#grid", __acao), where __acao must receive a paramter with ajax result.
 */
FooTableExtend.AddAction = function (seletor, nameOfField, objectAction) {
    FooTableExtend.__gridAction[__transformarSeletorId(seletor)] = { action: objectAction, fieldName: nameOfField };
}

/**
 * Call de Ajax Function to post data. After that, adds row value into the grid.
 * @param {(jQuery|jQuery.selector|HTMLTableElement)} seletor - The jQuery table object, selector or the HTMLTableElement to initialize FooTable on.
*  @param {string} url - json URL;
*  @param {bool} exibirAguarde - define if has to show wait modal before and after ajax call;
*  @param {Object} postData - parmeter object defined 
 * @param {int} rows - number of lines requested. 0 to take all rest.
 * @param {int} page - page of request
 * @param {string} sidx - name of field ordered Id
 * @param {bool} eraseAllLines - If has to clean the grid i.e. delete all lines
 * @param {(jQuery|jQuery.selector|HTMLTableElement)} selectorElementPositionTop - element that page will go to;
 */
FooTableExtend.PostData = function (seletor, url, exibirAguarde, postData, rows, page, sidx, sord, eraseAllLines, selectorElementPositionTop) {

    if (rows == undefined || rows == null)
        rows = FooTableExtend.__gridRows;

    if (page == undefined || page == null)
        page = FooTableExtend.__gridPage;

    if (sidx == undefined || sidx == null)
        sidx = FooTableExtend.__gridSidx;

    if (sord == undefined || sord == null)
        sord = FooTableExtend.__gridSord;

    if (ArrayObjectContainsIndex(postData, "name", "Rows") >= 0)
        postData[ArrayObjectContainsIndex(postData, "name", "Rows")].value = rows;
    else
        postData.push({ "name": "Rows", "value": rows });

    if (ArrayObjectContainsIndex(postData, "name", "Page") >= 0)
        postData[ArrayObjectContainsIndex(postData, "name", "Page")].value = page;
    else
        postData.push({ "name": "Page", "value": page });

    if (ArrayObjectContainsIndex(postData, "name", "Sidx") >= 0)
        postData[ArrayObjectContainsIndex(postData, "name", "Sidx")].value = sidx;
    else
        postData.push({ "name": "Sidx", "value": sidx });

    if (ArrayObjectContainsIndex(postData, "name", "Sord") >= 0)
        postData[ArrayObjectContainsIndex(postData, "name", "Sord")].value = sord;
    else
        postData.push({ "name": "Sord", "value": sord });

    FooTableExtend.__gridPostData[__transformarSeletorId(seletor)] = postData;

    $.ajax({
        url: url,
        data: postData,
        dataType: "json",
        traditional: true,
        async: true,
        cache: false,
        type: "POST",
        beforeSend: function () {
            if (exibirAguarde) {
                //Aqui você pode colocar um modal enquanto carrega os dados do grid
                //modal.CarregandoTelaNegra(true);
            }
        },
        success: function (result) {
            if (eraseAllLines)
                FooTableExtend.DeleteAllRows(seletor);
            $.each(result.Rows, function (index, value) {
                var row = value;
                if (FooTableExtend.__gridAction[__transformarSeletorId(seletor)] != undefined) {
                    gridActionObject = FooTableExtend.__gridAction[__transformarSeletorId(seletor)];
                    row[gridActionObject.fieldName] = gridActionObject.action(value);
                }
                FooTableExtend.AddRow(seletor, row);
            });

            __FooTableDefineParameter(seletor, result.Page, result.PageSize, result.Records)

            if (exibirAguarde) {
                //Aqui você pode colocar um modal enquanto carrega os dados do grid
                //modal.CarregandoTelaNegra(false);
            }

            if (selectorElementPositionTop != undefined)
                $('html, body').animate({ scrollTop: $(selectorElementPositionTop).offset().top - 50 }, "fast");
        },
        error: function () {
            if (exibirAguarde) {
                //Aqui você pode colocar um modal enquanto carrega os dados do grid
                //modal.CarregandoTelaNegra(false);
            }
            console.log("Error ao consultar " + url);
        },
        complete: function (result) {

        },
    //}).fail(function () {
    //    console.log("Fail ao consultar " + url);
    //}).error(function () {
    //    console.log("Error Externo ao consultar " + url);
    });
}

FooTableExtend.GetPostData = function (seletor)
{
    return FooTableExtend.__gridPostData[__transformarSeletorId(seletor)];
}

FooTableExtend.GetGridObject = function(seletor)
{
    return __grid[__transformarSeletorId(seletor)];
}

/**
*Retorna um ID para o seletor. Retira # e . do ID.
*/
function __transformarSeletorId(seletor) {
    return seletor.replace("#", "").replace(".", "");
}

/**
*Retorna o HTML do Footer da página
*/
function __FooTableFooter() {
    var html = '';

    html += '<tfoot>';
    html += '    <tr>';
    html += '        <td colspan="1000">';
    html += '            <div id="GridControl" class="col-xs-8" style="margin-top: 0px;">';
    html += '                <button id="btnMaisResultados" title="Mais Resultados" type="button" class="btn btn-primary">';
    html += '                    <span class="glyphicon glyphicon-th-list"></span>';
    html += '                    <span class="text-sm-btn">Mais Resultados&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
    html += '                </button>';
    html += '                <button id="btnTodosResultados" title="Todos os Resultados" type="button" class="btn btn-primary">';
    html += '                    <span class="glyphicon glyphicon-list"></span>';
    html += '                    <span class="text-sm-btn">Todos Resultados&nbsp;&nbsp;&nbsp;</span>';
    html += '                </button>';
    html += '            </div>';
    html += '            <div class="col-xs-4">';
    html += '                <label class="control-label pull-right"><span class="text-sm-btn">Exibindo </span><span id="FooTableInitialRecord">0</span> até <span id="FooTableLastRecord">0</span> de <span id="FooTableTotalRecord">0</span></label>';
    html += '            </div>';
    html += '        </td>';
    html += '    </tr>';
    html += '</tfoot>';

    return html;
}

/**
*Define os parâmetros do footer da página
*/
function __FooTableDefineParameter(selector, page, pageSize, records) {

    var fooTableLastRecord = $(selector + ' tbody tr:not(.footable-filtered)').length;
    var fooTableInitialRecord = 1;//fooTableLastRecord - pageSize + 1;
    var fooTableTotalRecord = records;

    if (fooTableLastRecord >= fooTableTotalRecord) {
        $(selector + " #GridControl #btnMaisResultados").attr("disabled", "disabled");
        $(selector + " #GridControl #btnTodosResultados").attr("disabled", "disabled");
    } else {
        $(selector + " #GridControl #btnMaisResultados").removeAttr("disabled");
        $(selector + " #GridControl #btnTodosResultados").removeAttr("disabled");
    }

    $(selector + " #GridControl #btnTodosResultados").attr("data-max", fooTableTotalRecord);

    $(selector + " #FooTableInitialRecord").html(fooTableInitialRecord);
    $(selector + " #FooTableLastRecord").html(fooTableLastRecord);
    $(selector + " #FooTableTotalRecord").html(fooTableTotalRecord);
}

/**
* @param {(jQuery|jQuery.selector|HTMLTableElement)} seletor - The jQuery table object, selector or the HTMLTableElement to initialize FooTable on.
*/
function __FooTableSort(seletor) {

    var seletorHeadTh = seletor + " thead th";
    $(seletor).not("button").unbind("click");

    $(seletorHeadTh + ".footable-sortable").on("click", function (e) {

        if ($(this).hasClass(FooTableExtend.__gridOrderAscTHClass)) {
            _removeThCssClass();
            __grid[__transformarSeletorId(seletor)].columns.array[$(seletorHeadTh).index($(this))].direction = "DESC";
            $(this).addClass(FooTableExtend.__gridOrderDescTHClass);
            $(this).children("span").addClass(FooTableExtend.__gridOrderDescSpanClass);
        } else {
            _removeThCssClass();
            __grid[__transformarSeletorId(seletor)].columns.array[$(seletorHeadTh).index($(this))].direction = "ASC";
            $(this).addClass(FooTableExtend.__gridOrderAscTHClass);
            $(this).children("span").addClass(FooTableExtend.__gridOrderAscSpanClass);
        }

        var sidx = __grid[__transformarSeletorId(seletor)].columns.array[$(seletorHeadTh).index($(this))].name;
        var sord = __grid[__transformarSeletorId(seletor)].columns.array[$(seletorHeadTh).index($(this))].direction;


        $(this).closest(seletor).attr("data-sidx", sidx);
        $(this).closest(seletor).attr("data-sord", sord);

        FooTableExtend.PostData(seletor, $(seletor).attr("data-url"), true, FooTableExtend.__gridPostData[__transformarSeletorId(seletor)], FooTableExtend.__gridRows, FooTableExtend.__gridPage, $(seletor).attr("data-sidx"), $(seletor).attr("data-sord"), true, seletor);
    });

    function _removeThCssClass() {
        $(seletorHeadTh).removeClass(FooTableExtend.__gridOrderDescTHClass);
        $(seletorHeadTh).find("span").removeClass(FooTableExtend.__gridOrderDescSpanClass);
        $(seletorHeadTh).removeClass(FooTableExtend.__gridOrderAscTHClass);
        $(seletorHeadTh).find("span").removeClass(FooTableExtend.__gridOrderAscSpanClass);
    }
}

function AdicionarEventoPaginacao(selector) {
    $(selector + " #GridControl #btnMaisResultados").click(function () {
        var parentGridSelector = $(selector + " #GridControl #btnMaisResultados").parent().parent().parent().parent().parent().attr("id");
        var postData = FooTableExtend.__gridPostData[__transformarSeletorId(parentGridSelector)];
        var rows = parseInt(postData[ArrayObjectContainsIndex(postData, "name", "Rows")].value);
        var page = parseInt(postData[ArrayObjectContainsIndex(postData, "name", "Page")].value);

        if (rows == undefined || rows == null)
            rows = FooTableExtend.__gridRows;

        if (page == undefined || page == null)
            page = 1;
        else
            page++;

        var sord = postData[ArrayObjectContainsIndex(postData, "name", "Sord")].value;
        var sidx = postData[ArrayObjectContainsIndex(postData, "name", "Sidx")].value;

        FooTableExtend.PostData("#" + parentGridSelector, $("#" + parentGridSelector).attr("data-url"), true, SerializarForm("form"), rows, page, sidx, sord, false, "#GridControl #btnMaisResultados");
    });

    $(selector + " #GridControl #btnTodosResultados").click(function () {
        var parentGridSelector = $(selector + " #GridControl #btnMaisResultados").parent().parent().parent().parent().parent().attr("id");
        var postData = FooTableExtend.__gridPostData[__transformarSeletorId(parentGridSelector)];
        var rows = parseInt($(this).attr("data-max"));
        var page = 0;

        if (rows == undefined || rows == null)
            rows = FooTableExtend.__gridRows;

        if (page == undefined || page == null)
            page = 1;
        else
            page++;

        var sord = postData[ArrayObjectContainsIndex(postData, "name", "Sord")].value;
        var sidx = postData[ArrayObjectContainsIndex(postData, "name", "Sidx")].value;

        FooTableExtend.PostData("#" + parentGridSelector, $("#" + parentGridSelector).attr("data-url"), true, SerializarForm("form"), rows, page, sidx, sord, true, "#GridControl #btnTodosResultados");
    });
}