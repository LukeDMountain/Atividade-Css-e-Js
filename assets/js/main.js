(function() {

	"use strict";

	var	$body = document.querySelector('body');

	// Métodos/polyfills.

			!function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();

		// canUse
			window.canUse=function(p){if(!window._canUse)window._canUse=document.createElement("div");var e=window._canUse.style,up=p.charAt(0).toUpperCase()+p.slice(1);return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};

		// window.addEventListener
			(function(){if("addEventListener"in window)return;window.addEventListener=function(type,f){window.attachEvent("on"+type,f)}})();

	// Reproduzir animações iniciais no carregamento da página.
		window.addEventListener('load', function() {
			window.setTimeout(function() {
				$body.classList.remove('is-preload');
			}, 100);
		});

	// Plano de fundo do slideshow.
		(function() {

			// Configurações.
				var settings = {

					// Imagens (no formato 'url': 'alinhamento').
						images: {
							'images/bg01.jpg': 'center',
							'images/bg02.jpg': 'center',
							'images/bg03.jpg': 'center'
						},

					// Atraso.
						delay: 6000

				};

			// Variáveis.
				var	pos = 0, lastPos = 0,
					$wrapper, $bgs = [], $bg,
					k, v;

			// Criar wrapper de BG, BGs.
				$wrapper = document.createElement('div');
					$wrapper.id = 'bg';
					$body.appendChild($wrapper);

				for (k in settings.images) {

					// Criar BG.
						$bg = document.createElement('div');
							$bg.style.backgroundImage = 'url("' + k + '")';
							$bg.style.backgroundPosition = settings.images[k];
							$wrapper.appendChild($bg);

					// Adicioná-lo ao array.
						$bgs.push($bg);

				}

			// Loop principal.
				$bgs[pos].classList.add('visible');
				$bgs[pos].classList.add('top');

				// Desistir se tivermos apenas um único BG ou o cliente não suportar transições.
					if ($bgs.length == 1
					||	!canUse('transition'))
						return;

				window.setInterval(function() {

					lastPos = pos;
					pos++;

					// Voltar ao início se necessário.
						if (pos >= $bgs.length)
							pos = 0;

					// Trocar imagens de topo.
						$bgs[lastPos].classList.remove('top');
						$bgs[pos].classList.add('visible');
						$bgs[pos].classList.add('top');

					// Ocultar a última imagem após um curto atraso.
						window.setTimeout(function() {
							$bgs[lastPos].classList.remove('visible');
						}, settings.delay / 2);

				}, settings.delay);

		})();

	// Formulário de inscrição.
		(function() {

			// Variáveis.
				var $form = document.querySelectorAll('#signup-form')[0],
					$submit = document.querySelectorAll('#signup-form input[type="submit"]')[0],
					$message;

			// Desistir se addEventListener não for suportado.
				if (!('addEventListener' in $form))
					return;

			// Mensagem.
				$message = document.createElement('span');
					$message.classList.add('message');
					$form.appendChild($message);

				$message._show = function(type, text) {

					$message.innerHTML = text;
					$message.classList.add(type);
					$message.classList.add('visible');

					window.setTimeout(function() {
						$message._hide();
					}, 3000);

				};

				$message._hide = function() {
					$message.classList.remove('visible');
				};

			// Eventos.
			// Nota: Se você *não* estiver usando AJAX, remova este event listener.
				$form.addEventListener('submit', function(event) {

					event.stopPropagation();
					event.preventDefault();

					// Ocultar mensagem.
						$message._hide();

					// Desabilitar envio.
						$submit.disabled = true;

					// Processar formulário.
					// Nota: Não faz nada ainda (além de informar um "obrigado"),
					// mas há o suficiente aqui para montar uma chamada de submissão AJAX funcional.
						window.setTimeout(function() {

							// Redefinir formulário.
								$form.reset();

							// Habilitar envio.
								$submit.disabled = false;

							// Mostrar mensagem.
								$message._show('success', 'Obrigado!');
								//$message._show('failure', 'Algo deu errado. Por favor, tente novamente.');

						}, 750);

				});

		})();

})();
