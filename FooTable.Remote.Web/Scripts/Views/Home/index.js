var options = {
    "showToggle": true,
    "columns": [
        { "name": "Id", "title": "Id", "visible": false, "sortable": false, }, //Não exibo o id em nenhum momento
        { "name": "Nome", "title": "Nome", "sortable": true, "style": "width:200px" }, //Abaixo, em breakpoints, as classes do bootstrap para não exibir
        { "name": "Descricao", "title": "Descrição", "breakpoints": "xs sm", "sortable": true, "style": "width:300px" },//Forma de implementar o estilo
        { "name": "Acao", "title": "", "sortable": false, style: { "text-align": "center", "width": "100px" } } //Outra forma de implementar o estilo
    ],
};

var controls = '                <br/><br/>';
controls += '                   <button id="btnImprimirResumido" title="Relatório Resumido" type="button" class="Imprimir btn btn-warning" data-url="' + $("#hfImprimirResumido").val() + '">';
controls += '                       <span class="glyphicon glyphicon-tasks"></span>';
controls += '                    <span class="text-sm-btn">Imprimir Resumido</span>';
controls += '                </button>';
controls += '                   <button id="btnImprimirDetalhado" title="Relatório Detalhado" type="button" class="Imprimir btn btn-warning" data-url="' + $("#hfImprimirDetalhado").val() + '">';
controls += '                    <span class="glyphicon glyphicon-align-justify"></span>';
controls += '                    <span class="text-sm-btn">Imprimir Detalhado</span>';
controls += '                </button>';

FooTableExtend.Init("#grid", options, false, controls);

//FooTableExtend.Init("#grid", options, false);

FooTableExtend.AddAction("#grid", "Acao", __acao);

//O método SerializarForm pegaria todos os valores do form e o passaria como filtro
//FooTableExtend.PostData("#grid", $("#grid").attr("data-url"), true, SerializarForm("form"), FooTableExtend.__gridRows, FooTableExtend.__gridPage, $("#grid").attr("data-sidx"), $("#grid").attr("data-sord"));
FooTableExtend.PostData("#grid", $("#grid").attr("data-url"), true, [], FooTableExtend.__gridRows, FooTableExtend.__gridPage, $("#grid").attr("data-sidx"), $("#grid").attr("data-sord"));

//TODO: Melhorar o postData
$("#btnPesquisar").click(function () {
    FooTableExtend.PostData("#grid", $("#grid").attr("data-url"), true, [], FooTableExtend.__gridRows, FooTableExtend.__gridPage, $("#grid").attr("data-sidx"), $("#grid").attr("data-sord"), true, "#grid");
});

function __acao(result) {
    id = result.Id;
    exibirEditar = true;
    exibirVisualizar = true;
    exibirDesativar = true;
    exibirAtivar = false;

    var html = "";    
    html += "<span data-id=" + id + " title=\"Visualizar Mais Informações\" class=\"editar-default cursor-pointer acao-grid glyphicon glyphicon glyphicon-plus-sign\"></span>&nbsp";

    return html;
}

$(".Imprimir").click(function () {
    alert('Você clicou num controle adicional.\nCaso não o queira, basta comentar. =)');
});



