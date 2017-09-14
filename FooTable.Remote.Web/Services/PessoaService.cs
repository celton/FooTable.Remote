using FooTable.Remote.Web.Data;
using FooTable.Remote.Web.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FooTable.Remote.Web.Services
{
    public class PessoaService
    {
        public GridResult Consultar(object paramter, GridSettings gridParameter)
        {
            var resultado = new GridResult();
            
            //Atenção: Apenas um exemplo. Nunca traga todos os dados para depois paginar!
            List<Pessoa> consulta = new PessoaRepository().ObterTodos();

            //Parâmetros - Incremente as cláusulas where arqui
            //Observação: Com IEnumerable você não precisará finalizar com "ToList"
            //if (paramter != null)
            //{
            //    int id = (int)paramter;
            //    consulta = consulta.Where(d => d.Id == id).ToList();
            //}

            //Ordenação
            Func<Pessoa, object> ordem = d => d.Id;

            switch (gridParameter.Sidx)
            {
                case "Descricao":
                    ordem = d => d.Descricao;
                    break;
                case "Nome":
                    ordem = d => d.Nome;
                    break;
            }

            //Direção
            if (gridParameter.Sord == "ASC")
                consulta = consulta.OrderBy(ordem).ToList();
            else
                consulta = consulta.OrderByDescending(ordem).ToList();

            resultado.Records = consulta.Count();

            //Paginação
            consulta = consulta.Skip((gridParameter.Page - 1) * gridParameter.Rows).Take(gridParameter.Rows).ToList();
            resultado.Rows = new List<object>(consulta.ToList());

            resultado.Page = gridParameter.Page;
            resultado.PageSize = consulta.Count();

            return resultado;
        }
    }
}