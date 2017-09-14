using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FooTable.Remote.Web.Data
{
    public class PessoaRepository
    {
        public List<Pessoa> ObterTodos()
         => new List<Pessoa>()
           {
                Pessoa.Factory.Criar(101, "Cássia     ", "Atleta"),
                Pessoa.Factory.Criar(102, "Cael       ", "Atleta"),
                Pessoa.Factory.Criar(103, "Caetana    ", "Atleta"),
                Pessoa.Factory.Criar(104, "Caetano    ", "Atleta"),
                Pessoa.Factory.Criar(105, "Caia       ", "Atleta"),
                Pessoa.Factory.Criar(201, "Caíco      ", "Torcida"),
                Pessoa.Factory.Criar(202, "Caio       ", "Torcida"),
                Pessoa.Factory.Criar(203, "Caleb      ", "Torcida"),
                Pessoa.Factory.Criar(204, "Calila     ", "Torcida"),
                Pessoa.Factory.Criar(205, "Camélia    ", "Torcida"),
                Pessoa.Factory.Criar(206, "Camila     ", "Torcida"),
                Pessoa.Factory.Criar(207, "Candice    ", "Torcida"),
                Pessoa.Factory.Criar(208, "Cândido    ", "Torcida"),
                Pessoa.Factory.Criar(209, "Cânia      ", "Torcida"),
                Pessoa.Factory.Criar(210, "Canto      ", "Torcida"),
                Pessoa.Factory.Criar(211, "Capitolina ", "Torcida"),
                Pessoa.Factory.Criar(212, "Carela     ", "Torcida"),
                Pessoa.Factory.Criar(301, "Catila     ", "Funcionário"),
                Pessoa.Factory.Criar(302, "Catilina   ", "Funcionário"),
                Pessoa.Factory.Criar(303, "Cecília    ", "Funcionário"),
                Pessoa.Factory.Criar(304, "Cedrico    ", "Funcionário"),
                Pessoa.Factory.Criar(305, "Célia      ", "Funcionário"),
                Pessoa.Factory.Criar(306, "Celina     ", "Funcionário"),
                Pessoa.Factory.Criar(307, "Celinia    ", "Funcionário"),
                Pessoa.Factory.Criar(308, "Celino     ", "Funcionário"),
                Pessoa.Factory.Criar(309, "Célio      ", "Funcionário"),
                Pessoa.Factory.Criar(310, "Celísio    ", "Funcionário"),
                Pessoa.Factory.Criar(311, "Celsa      ", "Funcionário"),
                Pessoa.Factory.Criar(312, "Célsio     ", "Funcionário"),
                Pessoa.Factory.Criar(801, "Celso      ", "Direção"),
                Pessoa.Factory.Criar(802, "Celto      ", "Direção"),
                Pessoa.Factory.Criar(803, "Celton     ", "Direção")
           };
    }
}