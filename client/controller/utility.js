/**
@author:ANas
date:
desc:
**/
var fs=require("fs");

//log the file
exports.log=function(filename,data){
	var folderpath='../log/'
	fs.writeFile(folderpath+filename+".txt",data,function(err){
  		if(err){
  			 console.error(err);
  		}else{
  			console.log('File Write sucessfully.....!');
  		}
  });
}
