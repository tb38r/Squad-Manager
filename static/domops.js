//sends a new user entry to the server
const AddPlayerToDB= (obj)=> {
    
    fetch('/addplayer', {
        method: 'Post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    })
        .then(async (response) => {
            resp = await response.json();
            return resp;
        })
        .then((data) => {
   
            if(data.type === 'success'){
                populateTableOnOpen()
                displaySuccessMessage(`${data.resp.name} has been added to the database!`,2000)
            }else if(data.type === 'failure'){
                displayErrorMessage(`${data.resp} is already in the database!`, 2000)

            }
        });
}



//Deletes a player from the database
const DeletePlayer =(parentnode) => {
    let first = parentnode.getAttribute('firstname');
    let last = parentnode.getAttribute('lastname');
  
    let playerToDelete = (first + " "+ last)


   
  fetch('/deleteplayer', {
    method: 'Post',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({name:playerToDelete.trim()})
})
    .then(async (response) => {
        resp = await response.json();
        return resp;
    })
    .then((data) => {
        
        if(data.resp.name === data.name){
            console.log('Player successfully deleted', data)
            populateTableOnOpen()
            displayErrorMessage(`${data.name} has been removed from the database!`, 2000)

        }else{

            displayErrorMessage(`Error removing ${data.name} from the database!`, 2000)
            console.log('error deleting user', data);
        }

    });
  
  }
  

  const displaySuccessMessage=(message, delay)=>{
      let successdiv = document.getElementById('successmessage')
      successdiv.innerText = message
      successdiv.style.display = 'block'
      setTimeout(()=>{
        successdiv.style.display = 'none'
        //window.location.reload()
    }, delay)

  }




  const displayErrorMessage=(message, delay)=>{
    let errordiv = document.getElementById('errormessage')
    errordiv.innerText = message
    errordiv.style.display = 'block'
    setTimeout(()=>{
        errordiv.style.display = 'none'
  }, delay)

}





  
