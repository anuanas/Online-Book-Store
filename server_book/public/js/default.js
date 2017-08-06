window.onerror = function (errorMsg, url, lineNumber) {
    alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber);
}

$("#asc").click(function(){
    if($(this).is(":checked") == true){
        var hotelStr = $("#hotelsObj").val();
        var hotelsObj = JSON.parse(hotelStr);
        console.log(hotelsObj);
       for(var h in hotelsObj)
       {
            var priceStr = hotelsObj[h].hResult.photel[0].phinfo.cp;
            var priceArr = priceStr.split(',');
            console.log(typeof priceArr);
       }

       function priceSorting(a,b){

            return a-b;
       }
    }
});