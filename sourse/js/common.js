const JSCCommon = {
	// часть вызов скриптов здесь, для использования при AJAX
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {

		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Закрыть",
					NEXT: "Вперед",
					PREV: "Назад",
					// PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"
				},
			},
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		})
		$.fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll('.link-modal');
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.addEventListener('click', () => {
					this.btnToggleMenuMobile.forEach(element => element.classList.toggle("on"));
					this.menuMobile.classList.toggle("active");
					document.body.classList.toggle("fixed");
					return false;
				});
			});
		}
	},

	closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(element => {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
		}

	},
	mobileMenu() {
		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', (event) => {
				let container = event.target.closest(".menu-mobile--js.active"); // (1)
				if (!container) {
					this.closeMenu();
				}
			}, { passive: true });

			window.addEventListener('resize', () => {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, { passive: true });
		}
	},
	// /mobileMenu

	// табы  .
	tabscostume(tab) {

		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					//turn off old
					let oldActiveEl = element.closest(`.${tab}`).querySelector(`.${tab}__btn.active`);
					let oldActiveContent = tabs.Content[index].closest(`.${tab}`).querySelector(`.${tab}__content.active`);

					oldActiveEl.classList.remove('active');
					oldActiveContent.classList.remove('active')

					//turn on new(cklicked el)
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				} 
			})
		})
		// $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
		// 	$(this)
		// 		.addClass('active').siblings().removeClass('active')
		// 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
		// 		.eq($(this).index()).fadeIn().addClass('active');

		// });

	},
	// /табы

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(function (element) {
			element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}")
		});
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	customRange() {

		$(".range-wrap").each(function () {
			let _this = $(this);
			var $range= _this.find(".slider-js");
			var $inputFrom = _this.find(".input_from");
			var $inputTo = _this.find(".input_to");
			var instance, from, to,
				min = $range.data('min'),
				max = $range.data('max');
			$range.ionRangeSlider({
				skin: "round",
				type: "double",
				grid: false,
				grid_snap: false,
				hide_min_max: true,
				hide_from_to: true,
				onStart: updateInputs,
				onChange: updateInputs,
				onFinish: updateInputs
			});
			instance = $range.data("ionRangeSlider");

			function updateInputs(data) {
				from = data.from;
				to = data.to;

				$inputFrom.prop("value", from);
				$inputTo.prop("value", to);
			}

			$inputFrom.on("change", function () {
				var val = $(this).prop("value");

				// validate
				if (val < min) {
					val = min;
				} else if (val > to) {
					val = to;
				}

				instance.update({
					from: val
				});

				$(this).prop("value", val);

			});

			$inputTo.on("change", function () {
				var val = $(this).prop("value");

				// validate
				if (val < from) {
					val = from;
				} else if (val > max) {
					val = max;
				}

				instance.update({
					to: val
				});

				$(this).prop("value", val);
			});

		})
	},
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			$("body").prepend('<p   class="browsehappy container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p>')

		}
	},
	sendForm() {
		var gets = (function () {
			var a = window.location.search;
			var b = new Object();
			var c;
			a = a.substring(1).split("&");
			for (var i = 0; i < a.length; i++) {
				c = a[i].split("=");
				b[c[0]] = c[1];
			}
			return b;
		})();
		// form
		$("form").submit(function (e) {
			e.preventDefault();
			const th = $(this);
			var data = th.serialize();
			th.find('.utm_source').val(decodeURIComponent(gets['utm_source'] || ''));
			th.find('.utm_term').val(decodeURIComponent(gets['utm_term'] || ''));
			th.find('.utm_medium').val(decodeURIComponent(gets['utm_medium'] || ''));
			th.find('.utm_campaign').val(decodeURIComponent(gets['utm_campaign'] || ''));
			$.ajax({
				url: 'action.php',
				type: 'POST',
				data: data,
			}).done(function (data) {

				$.fancybox.close();
				$.fancybox.open({
					src: '#modal-thanks',
					type: 'inline'
				});
				// window.location.replace("/thanks.html");
				setTimeout(function () {
					// Done Functions
					th.trigger("reset");
					// $.magnificPopup.close();
					// ym(53383120, 'reachGoal', 'zakaz');
					// yaCounter55828534.reachGoal('zakaz');
				}, 4000);
			}).fail(function () { });

		});
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		// листалка по стр
		$(" .top-nav li a, .scroll-link").click(function () {
			const elementClick = $(this).attr("href");
			const destination = $(elementClick).offset().top;

			$('html, body').animate({ scrollTop: destination }, 1100);

			return false;
		});
	}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.ifie();
	JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();
	JSCCommon.customRange();

	
	// JSCCommon.CustomInputFile();
	// добавляет подложку для pixel perfect
	var x = window.location.host;
	let screenName;
	screenName = 'journal.jpg';
	if (screenName && x === "localhost:3000") {
		$(".main-wrapper").after(`<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}
	// /добавляет подложку для pixel perfect

	let now = new Date();
	let currentYear = document.querySelector('.currentYear')
	if (currentYear) {
		currentYear.innerText = now.getFullYear();
	}
	// добавляет текущий год в .currentYear

	function whenResize() {

	}

	window.addEventListener('resize', () => {
		whenResize();

	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const headerSlider = new Swiper('.headerSlider-js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 1,
		// autoplay: {
		// 	delay: 6000,
		// },
		navigation: {
			nextEl: '.headerSlider-js .headerSlider-next',
			prevEl: '.headerSlider-js .headerSlider-prev',
		},
		pagination: {
			el: '.headerSlider-js .swiper-pagination',
			// type: 'bullets',
			clickable: true,
		},
	});

	const sCatalogSlider = new Swiper('.sCatalogSlider-js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		spaceBetween: 20,
		loop: false,
		// autoplay: {
		// 	delay: 6000,
		// },
		navigation: {
			nextEl: '.sCatalogSlider-next',
			prevEl: '.sCatalogSlider-prev',
		},

		breakpoints: {

			992: {
				slidesPerView: 4,
			}
		},

		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 4,
		},
	});

	const projectSlider = new Swiper('.projectSlider-js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 1,
		// autoplay: {
		// 	delay: 6000,
		// },
		pagination: {
			el: '.projectSlider-js .swiper-pagination',
			// type: 'bullets',
			clickable: true,
			type: 'fraction',
		},

		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 2,
		},
	});

	const hitSlider = new Swiper('.hitSlider-js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		spaceBetween: 20,
		loop: false,

		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 6,
		},

	});

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});
	// modal window

	//luckyoneJs

	//02 prod card
	let prodCardThumb = new Swiper('.prod-card-thumb-js', {
		slidesPerView: 'auto',
		spaceBetween: 8,
		slideToClickedSlide: true,
		//breakpoints
		breakpoints: {
			10: {
				direction: 'horizontal',
			},
			576: {
				direction: 'vertical',
			},
		},

		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 10,
		},
	});

	//
	$('.prod-card-thumb-js .swiper-slide').click(function (){
		$('.prod-card-thumb-js .swiper-slide').removeClass('active');
		$(this).addClass('active');
	});

	let prodCardSlider = new Swiper('.prod-card-slider-js', {
		slidesPerView: 1,
		spaceBetween: 20,
		loop: true,

		thumbs: {
			swiper: prodCardThumb,
		},
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 2,
		},
		on : {
			slideChange: () => {
				if (prodCardSlider){
					let allThumbs = document.querySelectorAll('.prod-card-thumb-js .swiper-slide');
					for (let thumb of allThumbs){
						$(thumb).removeClass('active');
					}

					$(allThumbs[prodCardSlider.realIndex]).addClass('active');
				}
			},
		},

	});

	//select2
	$('.default-select-js').select2({
		minimumResultsForSearch: Infinity,
		dropdownCssClass: "default-select",
	});

	//hints
	$('.char-icon-js')
	.mouseenter(function (){
		$(this).find('.hint-js').fadeIn(function (){
			$(this).addClass('active');
		});
	})
	.mouseleave(function (){
		$(this).find('.hint-js').fadeOut(function (){
			$(this).removeClass('active');
		});
	});


	//breadcrumbs
	var breadSl = new Swiper('.breadcrumb-slider-js', {
		slidesPerView: 'auto',
		// spaceBetween: 30,
		freeMode: true,
		freeModeMomentum: true,
		// spaceBetween: 30,
		watchOverflow: true,
	});

	//tabs slider
	$('.tabs-slider-js').each(function (){
		let tabsSlider = new Swiper(this, {
			slidesPerView: 'auto',
			spaceBetween: 20,
			freeMode: true,
			freeModeMomentum: true,
			// spaceBetween: 30,
			watchOverflow: true,
		});
	});
	//logoes slider
	let logoesSlider = new Swiper('.logoes-slider-js', {
		slidesPerView: 'auto',
		freeMode: true,
		freeModeMomentum: true,
		watchOverflow: true,

		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 100,
		},
	});
	//certificats slider
	let certSlider = new Swiper('.cetificats-slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 20,

		//lazy
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 5,
		},

		//pugination
		pagination: {
			el: $(this).find('.certificat-slider-pugin'),
			clickable: true,
		},
	});
	//feedback slider
	let feedBackSlider = new Swiper('.feedback-slider-js', {
		slidesPerView: 'auto',
		spaceBetween: 30,

		//pugination
		pagination: {
			el: $(this).find('.feedback-slider-pugin'),
			clickable: true,
		},
	});

	//txt slider
	let txtThumb = new Swiper('.txt-thumb-js', {
		slidesPerView: 'auto',
		spaceBetween: 10,

		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 5,
		},
	});

	let txtSlider = new Swiper('.txt-slider-js', {
		slidesPerView: 1,
		spaceBetween: 10,
		loop: true,

		thumbs: {
			swiper: txtThumb,
		},
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 2,
		},

		//pagination
		pagination: {
			el: $(this).find('.txt-slider-pugin'),
			clickable: true,
		},
	});
	//scroll link
	fixedStip();

	function fixedStip(){
		let fixedStrip = document.querySelector('.scroll-top');
		if(!fixedStrip) return

		window.addEventListener("scroll", toggleFixedStrip.bind(undefined, fixedStrip), {passive:  true});
		toggleFixedStrip(fixedStrip);

		$(fixedStrip).click(function (){
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		});
	}
	function toggleFixedStrip(fixedStrip){
		if (window.scrollY > calcVh(50)){
			$(fixedStrip).addClass('active');
		}
		else{
			$(fixedStrip).removeClass('active');
		}
	}
	function calcVh(v) {
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		return (v * h) / 100;
	}

	$('.drop-accardion-js').click(function(){
		$(this).parent().toggleClass('active');
		$(this).parent().find('.drop-accardion-toggle-js').toggle();
	})

	$('.mnu-accardion-js').click(function(){
		$(this).toggleClass('active').parent().find('.mnu-accardion-toggle').toggleClass('active');
	})

	$('.filter-accardion-js').click(function(){
		$(this).toggleClass('active').parent().parent().find('.filter-accardion-toggle').slideToggle();
	})

	//end luckyoneJs
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

