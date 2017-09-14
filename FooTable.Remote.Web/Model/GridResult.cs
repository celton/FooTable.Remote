using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FooTable.Remote.Web.Model
{
    public class GridResult
    {
        /// <summary>
        /// Index da página consultada
        /// </summary>        
        private int page;
        public int Page
        {
            get
            {
                return Records <= PageSize ? 1 : this.page;
            }
            set
            {
                this.page = value;
            }
        }

        public int PageSize { get; set; }

        /// <summary>
        /// Total de registros retornado pela consulta
        /// </summary>
        public int Records { get; set; }

        public List<Object> Rows { get; set; }
        
        /// <summary>
        /// Total de páginas existentes
        /// </summary>
        public int Total
        {
            get
            {
                return (int)Math.Ceiling((double)Records / PageSize);
            }
        }
    }
}