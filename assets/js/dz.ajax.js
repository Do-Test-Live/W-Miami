function contactForm()
{
	'use strict';
	var msgDiv;
	
	$(".dzForm").on('submit',function(e){
		e.preventDefault();	//STOP default action
		if($('#dzLanguage').val() == 'en') $('.dzFormMsg').html('<div class="gen alert alert-success">Submitting...</div>');
		else $('.dzFormMsg').html('<div class="gen alert alert-success">Enviar...</div>');

		var dzFormAction = $(this).attr('action');
		var dzFormData = $(this).serialize();
		
		$.ajax({
			method: "POST",
			url: dzFormAction,
			data: dzFormData,
			dataType: 'json',
			success: function(dzRes){
				if(dzRes.status == 1){
					msgDiv = '<div class="gen alert alert-success">'+dzRes.msg+'</div>';
				}
				
				if(dzRes.status == 0){
					msgDiv = '<div class="err alert alert-danger">'+dzRes.msg+'</div>';
				}
				$('.dzFormMsg').html(msgDiv);
				
				
				setTimeout(function(){
					$('.dzFormMsg .alert').hide(1000);
				}, 10000);
				
				$('.dzForm')[0].reset();
			}
		})
	});
	
	
	/* This function is for mail champ subscription START*/
	$(".dzSubscribe").on('submit',function(e)
	{
		e.preventDefault();	//STOP default action
		var thisForm = $(this);
		var dzFormAction = thisForm.attr('action');
		var dzFormData = thisForm.serialize();
		thisForm.addClass('dz-ajax-overlay');
		
		$.ajax({
			method: "POST",
			url: dzFormAction,
			data: dzFormData,
			dataType: 'json',
		  success: function(dzRes) {
			thisForm.removeClass('dz-ajax-overlay');  
			if(dzRes.status == 1){
				msgDiv = '<div class="gen alert alert-success">'+dzRes.msg+'</div>';
			}
			if(dzRes.status == 0){
				msgDiv = '<div class="err alert alert-danger">'+dzRes.msg+'</div>';
			}
			$('.dzSubscribeMsg').html(msgDiv);
			
			setTimeout(function(){
				$('.dzSubscribeMsg .alert').hide(1000);
			}, 10000);
			
			$('.dzSubscribe')[0].reset();
		  }
		}) 
	});
	
	/* This function is for mail champ subscription END*/
	
	/* ajax load more Start*/
	$(".dz-load-more").on('click', function(e){
		e.preventDefault();	//STOP default action
		var dzLoadMoreUrl = $(this).attr('rel');
		
		$('.dz-load-more').append(' <i class="fa fa-refresh"></i>');
		$.ajax({
			method: "POST",
			url: dzLoadMoreUrl,
			dataType: 'html',
			success: function(data) {
			$( ".loadmore-content").append(data);
			$('.dz-load-more i').remove();
		  }
		})
	});
	/* ajaz load more END*/
}

jQuery(document).ready(function() {
    'use strict';
	contactForm();
})