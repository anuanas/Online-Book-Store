$(document).ready(function() {
	$.get('/getBooks',{api:true}, function(res) {
		
		var FJS = FilterJS(res['books'], '', {
		  filter_on_init: false, // Default filter_on_init is false
		  criterias: [ {field: 'author', ele: '#autContainer input:checkbox'} ],
		  callbacks: {
			afterFilter: function(result){
				console.log(result);
				var template = [];
				for(var i in result){
					template.push(renderTemplate(result[i],i));
				}
				$('#book-container').empty().append(template.join(''));
			 },			 
			 afterAddRecords: function(result){
			  var template = [];
				for(var i in result){
					template.push(renderTemplate(result[i],i));
				}
				$('#book-container').empty().append(template.join(''));
			 }
		   }
		});
	});
});
$('body').on('click', '.book', function() {
	var isbn=$(this).attr('data_isbn');
	var token=$(this).attr('data_token');
	var count=$(this).attr('data-count');
	var args={isbn:isbn,token:token};
	$.get('/buyBooks',args , function(res) {
		var res = JSON.parse(res);
		$('._stock'+count).text(res.stock);
	});
});


function renderTemplate(object,i){
	var d ='<li>'+
    '<div class="imgGrid">'+
      '<img src= "'+object.image+'"></img>'+
    '</div>'+
    '<div class="imgDec">'+
     
        '<span><strong>Title:</strong> '+object.title+'</span>'+
        '<span><strong>Author:</strong> '+object.author+'</span>'+
        '<span><strong>Edition:</strong> '+object.edition+'</span>'+ 
        '<span><strong>Genre:</strong> '+object.genre+'</span>'+
        '<span><strong>Price:</strong> '+object.totalPrice+'</span>'+
        '<span><strong>Stock Left:</strong><elm class="_stock'+i+'">'+object.stock+'</elm></span>'+
        '<span><strong>ISBN:</strong> '+object.ISBN+'</span>'+
    '</div>'+
    '<div class="priceGrid">'+
        '<span class="price">Price: '+object.price+'</span>'+
        '<input type="submit" class="book" data-count="'+i+'" value="Book" name="xcvxv" data_isbn="'+object.ISBN+'" data_token="'+object.token+'" />'+
    '</div>'+
    '</li>';
	return d;
}