console.log('Loaded!');



      
//Submit name
      
      var submit = document.getElementbyId('sub_btn');
      submit.onclick = function(){
        
        
          var request = new XMLHttpRequest();
        
        request.onreadystatechange = function() {
          if(reuest.readyState === XMLHttpRequest.DONE) {
              if(request.status ===200){
                  
                  var names = request.responseText;
                  names = JSON.parse(names);
                  var list = '';
                  for (var i=0; i< names.length; i++){
                    
                      list+= '<li>' +names[i] + '</li>';
                  }
                
                var ul = document.getElementbyId('namelist');
                ul.innerHTML = list;
                } 
                      };
        
      
      var nameInput = document.getElementbyId('name');
        var name = nameInput.value;
          request.open('GET', 'http://pukit604.imad.hasura-app.io/submit-name?name=' +name, true);
          request.send(null);
        };  
      
