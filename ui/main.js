

      
//Submit name
      document.getElementById('sub_btn').onclick = function(){
        alert('1');
          var request = new XMLHttpRequest();
        
        request.onreadystatechange = function() {
          if(reuest.readyState === XMLHttpRequest.DONE) {
              if(request.status ===200){
                  alert('Login successful');
              }else if(request.status === 403){
                    alert('Username or password not correct');
              }else if(request.status === 500){
                    alert('Server error');
              }
          }
        };
      
                       alert('logged in');

        
      
      var username = document.getElementById('username').value;
      var password = document.getElementById('password').value;
          request.open('POST', 'https://pukit604.imad.hasura-app.io/login', true);
            request.setRequestHeader('Content-Type', 'application/json');
          request.send(JSON.stringify({username:username, password:password}));
          
        }; 
        
    
