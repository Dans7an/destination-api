let edit = document.querySelectorAll('#Edit')

Array.from(edit).forEach(function(element){
    element.addEventListener('click', function(){
        const requestId = this.parentNode.parentNode.parentNode.getAttribute('data-requestId')
console.log(requestId);

    let newName = prompt('Enter new name')
    let newLocation = prompt('Enter new location')

        fetch("edit",{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'requestId': requestId,
                "name" : newName,
                "location": newLocation
            })
        })
    })

    // if(aim.matches('#Edit')){
    //     let editName = aim.parentNode.parentNode.childNodes[0]
    //     let editLocation = aim.parentNode.parentNode.childNodes[1]
    //     let editImage = aim.parentNode.parentNode.parentNode.childNodes[0]

    //     let newName = prompt('Enter new name')
    //     let newLocation = prompt('Enter new location')
    
    //     // INSERT INFO INTO CARD
    //     if(newName.length > 0){
    //         editName.innerText = newName;
    //     }
    //     if(newLocation.length > 0){
    //         editLocation.innerText = newLocation;
    //         getImageFromAPI(editImage,editLocation)
    //     } 
        
    // }

})