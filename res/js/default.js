var Default = {

	alert1: function(){

		Alerts.closeIfExists();

		Alerts.ok('Quais podem ser os modelos de negócios da Editora Cidade Nova do futuro?', {

			description: "<p>Propostas de produtos e serviços que se apliquem a modelos de negócios mais dinâmicos e mais adequados ao mercado editorial em constante mutação. Portanto, é preciso estar atento às mudanças nos hábitos de leitura e de consumo, tendo em vista os recursos tecnológicos atuais e a infraestrutura da própria Editora.</p><p><b>Algumas indicações:</b> novas formas de publicação de conteúdos gratuitos e áreas exclusivas para assinantes.</p>",

			ready: function(modal){

				Alerts.centralize(modal);

			}

		});

	},

	alert2: function(){

		Alerts.closeIfExists();

		Alerts.ok('Quais podem ser as soluções de Portal de Conteúdo e Loja On-line da Editora Cidade Nova do futuro?', {

			description: "<p>Soluções que apresentem gerenciamento das informações dos painéis administrativos de forma mais prática e intuitiva. Para o portal de conteúdo e loja On-line, propiciar uma experiência mais agradável de navegação aos usuários (clientes, consumidores e assinantes), com usabilidade e responsividade para os diferentes dispositivos, incluindo os celulares.</p><p><b>Algumas indicações:</b> painéis administrativos com recursos práticos otimizados para todos os tipos de alterações, inclusive em lote; portal com possibilidade de oferecer conteúdo gratuito e conteúdo apenas para assinantes de diferentes perfis e produtos. Loja on-line integrada ao portal (B2C), que tenha uma área exclusiva para acesso dos colaboradores e parceiros (B2B), fornecendo ferramentas de gestão para toda a nossa rede.</p>",

			ready: function(modal){

				Alerts.centralize(modal);

			}

		});

	},

	alert3: function(){

		Alerts.closeIfExists();

		Alerts.ok('Quais podem ser as soluções de Comunicação e Marketing da Editora Cidade Nova do futuro?', {

			description: "<p>Soluções para melhorar e ampliar o impacto dos nossos conteúdos na sociedade, aproveitando as oportunidades de tráfego orgânico e a atuação de forma integrada nas redes sociais, canais da Editora e parceiros, para termos uma estratégia de comunicação e marketing mais eficaz.</p><p><b>Algumas Indicações:</b> propostas que favoreçam a divulgação dos nossos conteúdos gratuitos e exclusivos para assinantes, fazendo-os chegar a novos públicos. Buscamos encontrar soluções que ampliem: o cadastro de visitantes em nosso portal, a realização de novas assinaturas, a conversão de vendas na loja on-line etc.</p>",

			ready: function(modal){

				Alerts.centralize(modal);

			}

		});

	}

}