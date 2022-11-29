
var info;
var lastFilter=""
var lastSort="any"
var sortOrder =1
const colors = {"ww1":"rgba(126, 191, 126, 0.35)","ww2":"rgba(208, 198, 124, 0.35)","vietnam":"rgba(124, 159, 197, 0.35)","terror":"rgba(195, 150, 125, 0.35)"};
const colors2 = {"ww1":"#7ebf7e","ww2":"#d0c67c","vietnam":"#7c9fc5","terror":"#c3977d"};
$(document).ready(function(){
	
    $.getJSON("sungunsung.json", function(data){
		var items = [];
		info=data;
		$.each( data, function( key, val ) {
			html="<li id='" + val.nom.replace(".", "").replace(/\s+/g, "") + "' "  ;
			html+="data-ordernom='"+val.nom + "' ";
			html+="data-orderpremeses="+val.premeses + " ";
			html+="data-orderany="+val.any + " ";
			html+="data-orderpostmeses="+val.postmeses + " ";
			html+="data-orderinitialmedal='"+val.initialmedal + "' ";
			html+="data-orderfinalmedal='"+val.finalmedal + "' ";
			html+= "style='background-color: "+colors[val.conflicte]+"' " ;
			html+="> <span ></span> <a href="+ val.wiki+" target='_blank'><img src='imgs/" + val.nom + ".png' alt='" + val.nom + "' ></a> </li>";
			items.push( html);
		 });
		$("#ruler").html(items.join( "" ));

    })
	
	
	$("#tema").on('click', 'div', function() {
		mostrarTema($(this).data("conflicte"));

		$(this).parent().find('div').each(function() {
			  $( this ).attr('style',"background-color:"+colors[$(this).data("conflicte")]);
		});
		
		if(lastFilter!=""){
			$(this).attr('style',"background-color:"+colors2[$(this).data("conflicte")]);
		}
	});
	
	$("#head,#head1").on('click', 'div ', function() {
		if ($(this).data("col") !=""){
			ordenar($(this).data("col"));
			
			$(this).parent().find('img').css("transform","rotate(0)");
			if(sortOrder==2){
				$(this).find('img').css("transform","rotate(3.142rad)");
			}
		}

	});


});

function mostrarTema(tema) {
	
	$.each( info, function( key, val ) {
		el=$("#"+val.nom.replace(".", "").replace(/\s+/g, "") )
		if (tema == "" || lastFilter==tema){
			el.show();
		} else {
			if (val.conflicte == tema){
				el.show();
			}else{
				el.hide();
			}
		}
	});
	lastFilter=(lastFilter==tema)? "" : tema;
}

function ordenar(columna) {

	if ( lastSort==columna){
		sortOrder =(sortOrder === 1) ? 2 :1;
	} else {
		sortOrder =2;
		lastSort=columna;
	}
	
 if(columna == "nom" || columna == "initialmedal" || columna == "finalmedal"){
	if(sortOrder ==1){
		$(".ruler li")
		.sort((a,b) => ($(b).data("order"+columna).toUpperCase()) < ($(a).data("order"+columna).toUpperCase()) ? 1 : -1)
		.appendTo(".ruler");
	} else {
		$(".ruler li")
		.sort((a,b) => ($(b).data("order"+columna).toUpperCase()) > ($(a).data("order"+columna).toUpperCase()) ? 1 : -1)
		.appendTo(".ruler");		
		
	}
} else {
		if(sortOrder ==1){
		$(".ruler li")
		.sort((a,b) => parseInt($(b).data("order"+columna)) > parseInt($(a).data("order"+columna)) ? 1 : -1)
		.appendTo(".ruler");
	} else {
		$(".ruler li")
		.sort((a,b) => parseInt($(b).data("order"+columna)) < parseInt($(a).data("order"+columna)) ? 1 : -1)
		.appendTo(".ruler");			
	}
}
	
			
}