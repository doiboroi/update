var iVersion = "1.9.12";
let sURL = window.location.href;
if( sURL.indexOf('truyenfull') != -1 ){
	truyenfull()
}else if( sURL.indexOf('metruyenchu') != -1 || sURL.indexOf('metruyencv') != -1 ){
	metruyenchu()
}

function truyenfull(){

	if( sURL.split("/").length < 6 ) return;
	if( sURL.indexOf('danh-sach') != -1 ) return;
	if( sURL.indexOf('tim-kiem') != -1 ) return;
	console.log("RUN");

	jQuery("head").append('<style>\
		.my-setting, #next_chap,#nextChapter{ opacity:0.5; position: fixed; right: 0; z-index: 99999; }\
		.my-setting{line-height:200%;opacity:0.5;width:110px;height:47px;position:fixed;left:50%;background-color: #5cb85c;}\
		.my-setting{cursor:pointer;opacity:0.3;right: auto;left:0;width:110px;transform:none;text-align:center;font-size:25px;}\
		.my-setting.active{opacity:0.7}\
		.close-btn{z-index:999999}\
		.cover-scroll{border-right:2px solid green;position: fixed;z-index:10;left: 0;right: 0; top: 76px;bottom: 0;display:none;}\
		.cover-scroll.active{display:block}\
		/*.my-setting,#next_chap{top: 100%;transform: translateY(-100%);}*/\
		.pdown{}\
		\
		\
		\
		.pdown{display:none}\
		.pdown{opacity:0.5;width:110px;height:47px;position:fixed;left:50%;background-color: #5cb85c;top: 100%;transform:translate(-50%);}\
		\
		\
		\
		.winh{position:fixed;top:0;left:0;background:green;color:yellow;padding:3px;}\
		\
		\
		\
		#wrap,.chapter .chapter-c, body, #footer {background:black !important;color:#7c7c7c}\
		#js-read__content{font-size:22px !important}\
		\
		\
		\
		.navbar-breadcrumb{ background:#746767}\
		.navbar-breadcrumb a{color:#e6e6e6}\
		\
		\
		\
		@media screen and (max-width:767px){\
			.toleft,.toright{display:none;}\
		}\
		</style>')

	// remove banner ads
	jQuery("#ads-install-app").remove();
	jQuery(".nh-read__alert").remove()
	jQuery(".ads-holder").remove()
	jQuery("#read-comments").remove()
	jQuery(".header-ads-full").remove();

	// remove iframe wrapper
	jQuery("#ads-chapter-bottom-truyentranh").remove();


	var bFlip = false
		bFlip = true
	var direction = "left"
	direction = ""
	if( getUrlParameter('dir') == "left" || getUrlParameter('dir') == "l" || getUrlParameter('d') == "left" || getUrlParameter('d') == "l" ){
		direction = "left"
		if( jQuery("#next_chap").length && jQuery("#next_chap").attr("href").indexOf("dir=left") == -1 ){
			let sNewHref = jQuery("#next_chap").attr("href") + "?dir=left"
			jQuery("#next_chap").attr( "href", sNewHref  )
			
			sNewHref = jQuery("#prev_chap").attr("href") + "?dir=left"
			jQuery("#prev_chap").attr( "href", sNewHref  )
			
		}
	}else if( getUrlParameter('dir') == "right" || getUrlParameter('dir') == "r" || getUrlParameter('d') == "right" || getUrlParameter('d') == "r" ){
		direction = "right"
		if( jQuery("#next_chap").length && jQuery("#next_chap").attr("href").indexOf("dir=right") == -1 ){
			let sNewHref = jQuery("#next_chap").attr("href") + "?dir=right"
			jQuery("#next_chap").attr( "href", sNewHref  )
			
			sNewHref = jQuery("#prev_chap").attr("href") + "?dir=right"
			jQuery("#prev_chap").attr( "href", sNewHref  )
			
		}
	}else bFlip = false
		
	if( bFlip == true ){
		let iMaxWidth = window.innerHeight - 20 + "px"
	    console.log( "max width: " + iMaxWidth )
		let wWidth = window.innerWidth - 50 + 'px'
		jQuery("head").append('<style>\
			*{max-width:'+iMaxWidth+' !important;min-width:auto !important}\
			.navbar-header{display:none;}\
			body{transform: rotate(-90deg);height:'+iMaxWidth+'}\
			.cover-scroll{height:5000px !important;}\
			.my-setting, #next_chap{top:'+wWidth+' !important;opacity:0.1; transition:opacity 1s}\
			.my-setting.active{opacity:0.2}\
			.cover-scroll{height:'+wWidth+'}\
			.nh-read__container{width:'+iMaxWidth+' !important}\
			#js-read__body{padding:0 15px}\
			#js-right-menu{top:0 !important}\
			#js-read__content{font-size:22px !important;}\
		</style>')
		jQuery("#chapter-big-container").width(window.innerHeight - 20 )
		jQuery("body").on("keypress", function(e){
			if( e.which == 32 ){
				jQuery(".cover-scroll").click()
			}
		})
		
		if( direction == "right" ){
			jQuery("head").append('<style>\
				body{transform: rotate(90deg);transform: rotate(90deg) translateY(-120%);}\
			</style>')
			jQuery("body").attr("ofs", 0)
		}
	}

	jQuery("body").on("mouseover", ".my-setting, #next_chap", function(){
		jQuery(".my-setting, #next_chap").css( "opacity", "0.7" )
	})

	jQuery("body").on("mouseout", ".my-setting, #next_chap", function(){
		jQuery(".my-setting, #next_chap").css( "opacity", "0.1" )
	})

	if( getUrlParameter('winheight') ){
		jQuery("body").append('<div class="winh"></div>')
		window.setInterval(function(){
			jQuery(".winh").text( window.innerHeight )
		}, 100 )
	}

	setTimeout(function(){
		jQuery(".my-setting").removeClass("active")
		jQuery(".my-setting, .btn-chapter-nav").css("opacity","0.1");
	},2000)


	// cover scroll
	jQuery("body").append('<div class="cover-scroll"></div>')

	// page down
	jQuery("body").append( '<div class="pdown"></div>' )
	let iNextW = jQuery("#next_chap").outerWidth()
	let iWinW = window.innerWidth
	let iPdownW = iWinW - iNextW * 2 - 6
	jQuery(".pdown").css("width", iPdownW + "px")


	jQuery("body").on("click", ".pdown, .cover-scroll", function(){
		//console.log("clicked cover scroll - truyenfull")
		let wH = window.innerHeight
		let wW = window.innerWidth
		//let wSc = jQuery(window).scrollTop()
		let wSc = $('html,body').scrollTop()
		let wScL = jQuery(window).scrollLeft();

		let onePage = wH + wSc - 70
		let onePageWidth = wW + wScL - 70
		if( bFlip == true ){
			if( direction == "right" ){
				let ofs = jQuery("body").attr("ofs")
				ofs = parseInt( ofs ) + 1 
				jQuery("body").attr("ofs", ofs)
				let toLeft = ofs*180 + 120
				jQuery("body").css({"transform":"rotate(90deg) translateY(-"+toLeft+"%)"})
				onePageWidth = jQuery("body").offset().left + 558
				console.log( onePageWidth )
				jQuery(".my-setting, #next_chap").attr("style", "width: 170px;top:"+onePageWidth + "px !important")
				console.log( "onePageWidth: " + onePageWidth )
				
			}else{
				jQuery(window).scrollLeft( onePageWidth );
				onePageWidth += wW - 50
				jQuery(".my-setting, #next_chap").attr("style", "width: 170px;top:"+onePageWidth + "px !important")
				console.log( "onePageWidth: " + onePageWidth )
			}
		}else{
			//jQuery(window).scrollTop( onePage )
			console.log( "onepage scroll: " + onePage)
			$('html,body').animate({scrollTop:onePage}, 150);
		}
		
		
	})

	jQuery("body").prepend('<button class="exitfullscreen">Exit Full Screen '+iVersion+'</button>')
	jQuery("body").prepend('<button class="fullscreen">Full Screen</button>&ensp;&ensp;')

	jQuery(".fullscreen").click(function(){
		console.log("clicked fullscreen")
		var elem = document.querySelector("body"); 
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		}else{
			console.log("not work")
		}
	});
	jQuery(".exitfullscreen").click(function(){
		document.exitFullscreen()
	})

	//setting
	jQuery("body").append( '<div class="my-setting"><span class="glyphicon glyphicon-cog"></span></div>' )
	jQuery(".my-setting").css("width", iNextW + "px")
	jQuery("body").on("click",'.my-setting', function(){
		jQuery(this).toggleClass("active")
		if( jQuery(this).hasClass("active") ){
			jQuery(".cover-scroll").css("display","block")
			localStorage.setItem('bOpenCover', true)
		}else{
			jQuery(".cover-scroll").css("display","none")

			localStorage.setItem('bOpenCover', "") 
		}
	})

	var bOpenCover = false
	if( undefined == localStorage.getItem('bOpenCover') || localStorage.getItem('bOpenCover') == ""|| localStorage.getItem('bOpenCover') == "false" ){
	    bOpenCover = false
	}else{
	    bOpenCover = true
	}

	if( bOpenCover ){
		if( !jQuery(".my-setting").hasClass("active") ){
			jQuery(".my-setting").click()
			localStorage.setItem('bOpenCover', true) 
		}
	}



	// reset top of bottom button
	function reset_bottom_btn_top(){
		let iWinH = window.innerHeight
	    let iNextBtnH
	    if( jQuery("#next_chap").length )
	        iNextBtnH = jQuery("#next_chap").outerHeight()
	    else
	        iNextBtnH = jQuery("#nextChapter").outerHeight()

		let iNewTop = iWinH - iNextBtnH
		jQuery(".my-setting,.pdown,#next_chap,#nextChapter").css("top", iNewTop + "px")
	}
	reset_bottom_btn_top()


	jQuery(window).resize(function(){
		let iNextW = jQuery("#next_chap").outerWidth()
		let iWinW = window.innerWidth
		let iPdownW = iWinW - iNextW * 2 - 6
		jQuery(".pdown").css("width", iPdownW + "px")
		jQuery("body").on("click", ".pdown", function(){
			let wH = window.innerHeight
			let wSc = jQuery(window).scrollTop()

			let onePage = wH + wSc - 70
			jQuery(window).scrollTop( onePage )
		})


		jQuery(".my-setting").css("width", iNextW + "px")

		reset_bottom_btn_top()
	})

	function share_function(){
		

		// close btn
		jQuery("body").on("click", ".close-btn", function(){
			jQuery(this).parent().remove()
		})

		// remove bottom right ads
		var iCount = 1000
		var waitAdInterval = setInterval(function(){
                        if( jQuery('div[id*=fly]').length ){
                            jQuery('div[id*=fly]').remove();
                        }
			if( jQuery("div[id^=fly]").length || iCount-- <=0){
				jQuery("div[id^=fly]").remove()
				clearInterval( waitAdInterval)
			}
                        
		},100)


		var iCheckAdCount = 50 // 10 seconds
		var iCheckAd = setInterval(function(){

			jQuery("div").each(function(){
			    if( $(this).css("position") == "absolute"){
			       $(this).remove()
			    }
			})

			if( iCheckAdCount-- <= 0 ){
				clearInterval( iCheckAd)
			}

		}, 200 )


	}



	if( window.location.href.indexOf('full.vn') != -1 ){
		function remove_ad(){
			jQuery(".ads-iads").remove()
			jQuery(".ads-mobile").remove()
			jQuery(".group_story.text-center").remove()
			jQuery(".ads-content").remove()
			jQuery(".nt-fl-ad").remove()
			jQuery("#ads-inpage-container").remove()
			jQuery(".ads-responsive").remove()
			jQuery(".ads-chapter-box").remove()
		}

		remove_ad()

		jQuery(document).ready(function(){
			remove_ad()
		})

		jQuery(window).load(function(){
			remove_ad()
			share_function()
		})
	}else if( window.location.href.indexOf('full.com') != -1 ){

		function remove_ad(){
			jQuery(".adsbygoogle").remove()
			jQuery(".google-auto-placed").remove()
			jQuery(".ads").remove()
			jQuery("div[id^=fly]").remove()
		}

		remove_ad()

		jQuery(document).ready(function(){
			remove_ad()
		})


		jQuery(window).load(function(){
			remove_ad()
			share_function()
		})
	}

	var br = document.getElementsByTagName('br'),
	        l = br.length,
	        i = 0,
	        nextelem, elemname, include;
	        
	    // Loop through tags
	    for (i; i < l - 1; i++) {
	        // This flag indentify we should hide the next element or not
	        include = false;
	        
	        // Getting next element
	        nextelem = br[i].nextSibling;
	        
	        // Getting element name
	        if( nextelem != null ){
		        elemname = nextelem.nodeName.toLowerCase();
		        
		        // If element name is `br`, set the flag as true.
		        if (elemname == 'br') {
		            include = true;
		        }
		        
		        // If element name is `#text`, we face text node
		        else if (elemname == '#text') {
		            // If text node is only white space, we must pass it.
		            // This is because of something like this: `<br />   <br />`
		            if (! nextelem.data.replace(/\s+/g, '').length) {
		                nextelem = br[i+1];
		                include = true;
		            }
		        }
		    }    
		        // If the element is flagged as true, hide it
		        if (include) {
		            nextelem.style.display = 'none';
		        }

	    }





	jQuery("#chapter-c,#chapter-c >*").each(function(){
	    jQuery(this).html( jQuery(this).html().replaceAll( 'tang thi', 'zombie' ) );
	    jQuery(this).html( jQuery(this).html().replaceAll( 'Kinh Cức', 'Kim Cút' ) );

	})

	jQuery(".cover-scroll").after('<button class="toleft">Left</button><button class="toright">Right</button>')

	jQuery("head").append( '<style>.toleft,.toright{position:fixed;top:50%;left:0;opacity:0.7;z-index:99999;} .toright{right:0;left:auto}</style>' )
	jQuery(".toleft,.toright").click(function(){
	    var sNewHref= window.location.href.split("?")[0]
	    if( jQuery(this).hasClass('toright') )
	        sNewHref += "?dir=right"
	    else
	        sNewHref +=  "?dir=left"

	    window.location.href = sNewHref

	})


		// click next chap
	jQuery("body").on("click", "#next_chap", function(e){
		e.preventDefault();
		console.log("open next chap");
		jQuery.ajax({
			type: "GET",
			url:jQuery(this).attr("href"),
			beforeSend: function(){
			},
			success : function(result){
				var result = $($.parseHTML("<div>"+result+"</div>"));
			
				var chapterC = result.find("#chapter-c").parent().html();
				jQuery("#chapter-c").parent().html( chapterC );
				reset_bottom_btn_top()

				jQuery(".chapter-nav>.group_story.text-center, .chapter-nav>.col-xs-12").remove();

				$('html,body').animate({scrollTop:360}, 150);
				jQuery(".toggle-nav-open").hide();

				if( jQuery(".page-link").length ){
					
					history.pushState(null, '', jQuery(".page-link").attr("href"));
				}

				jQuery(".page-link").remove();
				jQuery("body").prepend('<a style="display:block;margin-bottom:10px;" class="page-link" href="'+this.url+'">'+this.url+'</a>');

				setTimeout(function(){
					jQuery(".my-setting").removeClass("active")
					jQuery(".my-setting, .btn-chapter-nav").css("opacity","0.1");
				},1000);


				jQuery("#chapter-c,#chapter-c >*").each(function(){
				    jQuery(this).html( jQuery(this).html().replaceAll( 'tang thi', 'zombie' ) );
				    jQuery(this).html( jQuery(this).html().replaceAll( 'Kinh Cức', 'Kim Cút' ) );

				})

				
			}
		});

		// jQuery.get(jQuery(this).attr("href"), function(result){
		// 	var result = $($.parseHTML("<div>"+result+"</div>"));
			
		// 	var chapterC = result.find("#chapter-c").parent().html();
		// 	jQuery("#chapter-c").parent().html( chapterC );
		// 	reset_bottom_btn_top()

		// 	jQuery(".chapter-nav>.group_story.text-center, .chapter-nav>.col-xs-12").remove();

		// 	$('html,body').animate({scrollTop:360}, 150);
		// 	jQuery(".toggle-nav-open").hide();

		// 	if( jQuery("body").find(".page-link").length == 0 ){
		// 		jQuery("body").prepend('<a style="display:block" class="page-link" href="'+this.url+'">'+this.url+'</a>');
		// 	}

		// 	setTimeout(function(){
		// 		jQuery(".my-setting").removeClass("active")
		// 		jQuery(".my-setting, .btn-chapter-nav").css("opacity","0.1");
		// 	},1000)

			
		// });
	});

	// hide gototop
	jQuery(".toggle-nav-open").hide();

}


function metruyenchu(){
	var iframeMCC, iIframeTimer = 20//(check iframe within 20 seconds)
	var bFlip = false
	main()

	jQuery("body").prepend('<button class="exitfullscreen">Exit Full Screen</button>')
	jQuery("body").prepend('<button class="fullscreen">Full Screen</button>&ensp;&ensp;')
	jQuery("body").append( '<div class="my-setting"><span class="glyphicon glyphicon-cog"></span></div>' )
	jQuery("body").append( '<div class="next-chapter"><span class="glyphicon glyphicon-cog"></span>Next</div>' )

	function main(){
		removead()
		
		style_page()
		
		remove_body_click()

	}

	function removead(){

		// remove banner ads
		jQuery("#ads-install-app").remove();

		// remove iframe
		iframeMCC = window.setInterval(function(){
			console.log("checking iframe" + jQuery("iframe").length )
			if( iIframeTimer-- <= 0 ){
				clearInterval( iframeMCC )
			}
			jQuery("iframe").each(function(){
				jQuery(this).remove()
			})

			//remove iframe wrapper
			jQuery(".tpm_attribution").remove()
			jQuery(".pt-3.text-center").remove()
			jQuery(".text-center.nh-read__alert.mb-3, .pb-3.text-center, .tpm-unit").remove()
			jQuery(".parent_zmedia_metruyenchu_mobile").remove()
			jQuery(".nh-read__pagination").remove()

			// remove comment 
			jQuery("#read-comments").remove()
			jQuery("#js-comment").remove()

			// remove js
			removejs()
		},1000)

		jQuery("#back-to-top").remove()
	}

	function removejs(){

		var aRemoveList = [ "google", "arf-km66zore.min", "ad", "media", "dmcdn", "gliacloud"]
		
		jQuery("script").filter(function(){

			let that = jQuery(this)
			let bNeedRemove = false

			if( undefined == jQuery(this).attr('src') ){
				return false
			}
			
			jQuery.each( aRemoveList, function(i,v){
			    if( that.attr('src').indexOf(v) != -1 ){
			    	bNeedRemove = true
			    	return false
			    }
			})

			return bNeedRemove
		}).remove()
		
	}

	function style_page(){
		jQuery("head").append('<style>\
			.my-setting{position:fixed;z-index: 99999;line-height:200%;opacity:0.1;width:110px;height:47px;left:0;right:auto;background-color: #5cb85c;cursor:pointer;transform:none;text-align:center;font-size:25px; }\
			.my-setting.active{opacity:0.7}\
			.cover-scroll{border-right:2px solid green;position: fixed;z-index:10;left: 0;right: 0; top: 0;bottom: 0;display:none;}\
			.cover-scroll.active{display:block}\
			\
			\
			\
			.pdown{display:none}\
			.pdown{opacity:0.5;width:110px;height:47px;position:fixed;left:50%;background-color: #5cb85c;top: 100%;transform:translate(-50%);}\
			\
			\
			\
			.winh{position:fixed;top:0;left:0;background:green;color:yellow;padding:3px;}\
			\
			\
			\
			body, #js-read__body, #js-read__content, body #bookRead .main .nh-read__body {background:black !important;color:#7c7c7c !important}\
			#js-read__content{font-size:22px !important}\
			.next-chapter{position:fixed;right:0;bottom:0;width:110px;height:47px;background-color: #5cb85c;text-align:center;font-size:25px;line-height:200%;z-index:999999;font-size:25px;opacity:0.1}\
		</style>');

	}

	function remove_body_click(){
		jQuery("#js-read__content").off()
	}

	jQuery("body").on("mouseover", ".my-setting, #next_chap", function(){
		jQuery(".my-setting, #next_chap").css( "opacity", "0.7" )
	})

	jQuery("body").on("mouseout", ".my-setting, #next_chap", function(){
		jQuery(".my-setting, #next_chap").css( "opacity", "0.1" )
	})





	bFlip = true
	var direction = "left"
	direction = ""
	if( getUrlParameter('dir') == "left" || getUrlParameter('dir') == "l" || getUrlParameter('d') == "left" || getUrlParameter('d') == "l" ){
		direction = "left"
		


		if( jQuery("#next_chap").length && jQuery("#next_chap").attr("href").indexOf("dir=left") == -1 ){
			let sNewHref = jQuery("#next_chap").attr("href") + "?dir=left"
			jQuery("#next_chap").attr( "href", sNewHref  )

			sNewHref = jQuery("#prev_chap").attr("href") + "?dir=left"
			jQuery("#prev_chap").attr( "href", sNewHref  )
		}

		if( jQuery(".next-chapter").length && (undefined == jQuery(".next-chapter").attr("href") || jQuery(".next-chapter").attr("href").indexOf("dir=left") == -1) ){

			var nextChapter = window.location.href.split( window.location.href.split("/")[5] )[0]
			nextChapter += "chuong-" + window.chapterRes.data._data.next_index + "?dir=left"

			jQuery(".next-chapter").attr("href",nextChapter)
		}
	}else if( getUrlParameter('dir') == "right" || getUrlParameter('dir') == "r" || getUrlParameter('d') == "right" || getUrlParameter('d') == "r" ){
		direction = "right"
		

		if( jQuery("#next_chap").length && jQuery("#next_chap").attr("href").indexOf("dir=right") == -1 ){
			let sNewHref = jQuery("#next_chap").attr("href") + "?dir=right"
			jQuery("#next_chap").attr( "href", sNewHref  )
			
			sNewHref = jQuery("#prev_chap").attr("href") + "?dir=right"
			jQuery("#prev_chap").attr( "href", sNewHref  )
			alert("next chapter href change2")
		}

		if( jQuery(".next-chapter").length && (undefined == jQuery(".next-chapter").attr("href") || jQuery(".next-chapter").attr("href").indexOf("dir=right") == -1) ){
			var nextChapter = window.location.href.split( window.location.href.split("/")[5] )[0]
			nextChapter += "chuong-" + window.chapterRes.data._data.next_index + "?dir=right"
			
			jQuery(".next-chapter").attr("href",nextChapter)
		}
	}else bFlip = false

	


	if( bFlip == true ){
		let iMaxWidth = window.innerHeight - 20 + "px"
	    console.log( "max width: " + iMaxWidth )
		let wWidth = window.innerWidth - 50 + 'px'
		jQuery("head").append('<style>\
			*{max-width:'+iMaxWidth+' !important;min-width:auto !important}\
			.navbar-header{display:none;}\
			body{transform: rotate(-90deg);height:'+iMaxWidth+'}\
			.cover-scroll{height:5000px !important;}\
			.my-setting, #next_chap{top:'+wWidth+' !important;opacity:0.1; transition:opacity 1s}\
			.my-setting.active{opacity:0.2}\
			.cover-scroll{height:'+wWidth+'}\
			.nh-read__container{width:'+iMaxWidth+' !important}\
			#js-read__body{padding:0 15px}\
			#js-right-menu{top:0 !important}\
			#js-read__content{font-size:22px !important;}\
		</style>')
		jQuery("#chapter-big-container").width(window.innerHeight - 20 )
		jQuery("body").on("keypress", function(e){
			if( e.which == 32 ){
				jQuery(".cover-scroll").click()
			}
		})
		
		if( direction == "right" ){
			jQuery("head").append('<style>\
				body{transform: rotate(90deg);transform: rotate(90deg) translateY(-120%);}\
			</style>')
			jQuery("body").attr("ofs", 0)
		}
	}




	// cover scroll
	jQuery("body").append('<div class="cover-scroll"></div>')

	// page down
	jQuery("body").append( '<div class="pdown"></div>' )
	let iNextW = jQuery("#next_chap").outerWidth()
	let iWinW = window.innerWidth
	let iPdownW = iWinW - iNextW * 2 - 6
	jQuery(".pdown").css("width", iPdownW + "px")


	jQuery("body").on("click", ".pdown, .cover-scroll", function(){
		let wH = window.innerHeight
		let wW = window.innerWidth
		//let wSc = jQuery(window).scrollTop()
		let wSc = $('html').scrollTop()
		let wScL = jQuery(window).scrollLeft();

		let onePage = wH + wSc - 70
		let onePageWidth = wW + wScL - 70
		if( bFlip == true ){
			if( direction == "right" ){
				let ofs = jQuery("body").attr("ofs")
				ofs = parseInt( ofs ) + 1 
				jQuery("body").attr("ofs", ofs)
				let toLeft = ofs*180 + 120
				jQuery("body").css({"transform":"rotate(90deg) translateY(-"+toLeft+"%)"})
				onePageWidth = jQuery("body").offset().left + 558
				// console.log( onePageWidth )
				jQuery(".my-setting, #next_chap, .next-chapter").attr("style", "width: 170px;top:"+onePageWidth + "px !important")
				// console.log( "onePageWidth: " + onePageWidth )
				
			}else{
				jQuery(window).scrollLeft( onePageWidth );
				onePageWidth += wW - 50
				jQuery(".my-setting, #next_chap, .next-chapter").attr("style", "width: 170px;top:"+onePageWidth + "px !important")
				console.log( "onePageWidth: " + onePageWidth )
			}
		}else{
			//jQuery(window).scrollTop( onePage )
			$('html,body').animate({scrollTop:onePage}, 150);
			console.log("scrollTop: " + onePage)
		}
	})



	jQuery(".fullscreen").click(function(){
		console.log("clicked fullscreen")
		var elem = document.querySelector("body"); 
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		}else{
			console.log("not work")
		}
	});
	jQuery(".exitfullscreen").click(function(){
		document.exitFullscreen()
	})
	//setting
	
	jQuery(".my-setting").css("width", iNextW + "px")
	jQuery("body").on("click",'.my-setting', function(){
		console.log("clicked setting")
		jQuery(this).toggleClass("active")
		if( jQuery(this).hasClass("active") ){
			jQuery(".cover-scroll").css("display","block")
			localStorage.setItem('bOpenCover', true)
		}else{
			jQuery(".cover-scroll").css("display","none")

			localStorage.setItem('bOpenCover', "") 
		}
	})

	var bOpenCover = false
	jQuery(".cover-scroll").css("display","block")
	localStorage.setItem('bOpenCover', true)
	bOpenCover = true

	jQuery("body").on("click", ".next-chapter", function(){
		
		if( jQuery(this).attr('href') == undefined ){
			var nextChapter = window.location.href.split( window.location.href.split("/")[5] )[0]
			nextChapter += "chuong-" + window.chapterRes.data._data.next_index
			window.location.href = nextChapter
		}else
			window.location.href = jQuery(this).attr('href')
	})


	// reset top of bottom button
	function reset_bottom_btn_top(){
		let iWinH = window.innerHeight
	    let iMySettingH = jQuery(".my-setting").height()
		let iNewTop = iWinH - iMySettingH

		jQuery(".my-setting,.pdown,#next_chap,#nextChapter").css("top", iNewTop + "px")
	}
	reset_bottom_btn_top()


	jQuery(window).resize(function(){
		let iNextW = jQuery("#next_chap").outerWidth()
		let iWinW = window.innerWidth
		let iPdownW = iWinW - iNextW * 2 - 6
		jQuery(".pdown").css("width", iPdownW + "px")
		jQuery("body").on("click", ".pdown", function(){
			let wH = window.innerHeight
			let wSc = jQuery(window).scrollTop()

			let onePage = wH + wSc - 70
			jQuery(window).scrollTop( onePage )
		})


		jQuery(".my-setting").css("width", iNextW + "px")

		reset_bottom_btn_top()
	})


	jQuery(".cover-scroll").after('<button class="toleft">Left</button><button class="toright">Right</button>')

	jQuery("head").append( '<style>.toleft,.toright{position:fixed;top:50%;left:0;opacity:0.7;z-index:99999;} .toright{right:0;left:auto}</style>' )
	jQuery(".toleft,.toright").click(function(){
	    var sNewHref= window.location.href.split("?")[0]
	    if( jQuery(this).hasClass('toright') )
	        sNewHref += "?dir=right"
	    else
	        sNewHref +=  "?dir=left"

	    window.location.href = sNewHref

	})


	document.onkeydown = checkKey;

	function checkKey(e) {

	    e = e || window.event;

	    if (e.keyCode == '38') {
	        // up arrow
	    }
	    else if (e.keyCode == '40') {
	        // down arrow
	    }
	    else if (e.keyCode == '37') {
	       // left arrow
	    }
	    else if (e.keyCode == '39') {
	       // right arrow 
	       jQuery(".next-chapter").click()
	    }

	}

}


function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};
