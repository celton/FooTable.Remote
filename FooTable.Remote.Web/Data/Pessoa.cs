using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FooTable.Remote.Web.Data
{
    public class Pessoa
    {
        public int Id { get; private set; }
        public string Nome { get; private set; }
        public string Descricao { get; private set; }

        public static class Factory
        {
            public static Pessoa Criar(int id, string nome, string descricao)
            => new Pessoa { Id = id, Nome = nome, Descricao = descricao };
        }
    }
}

