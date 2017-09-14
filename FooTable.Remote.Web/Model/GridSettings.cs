using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FooTable.Remote.Web.Model
{
    public class GridSettings
    {
        /// <summary>
        /// Número de linhas na coluna
        /// </summary>
        public int Rows { get; set; }

        /// <summary>
        /// Página selecionada
        /// </summary>
        public int Page { get; set; }

        /// <summary>
        /// Campo para ordenação
        /// </summary>
        public string Sidx { get; set; }
        
        /// <summary>
        /// Direção
        /// </summary>
        public string Sord { get; set; }

        public GridSettings()
        {
            this.Sidx = "ID";
            this.Sord = "DESC";
            this.Page = 1;
            this.Rows = 15;
        }

        public GridSettings(string sortColumn, bool ascending)
        {
            this.Sidx = sortColumn;
            this.Sord = (ascending ? "ASC" : "DESC");
            this.Page = 1;
            this.Rows = 15;
        }
    }
}