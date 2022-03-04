let loadButtons=document.getElementById('load-students');
let tableTbody=document.querySelectorAll('table>tbody')[0];


loadButtons.addEventListener('click',function () {

    let promiseGet=fetch(`https://new-students-e69cd-default-rtdb.firebaseio.com/Students/.json`);

    promiseGet
        .then(res=>res.json())
        .then(data=>{

            let keys=Object.keys(data);

            tableTbody.innerHTML=keys.map(x=>`<tr><td>${data[x].id}</td> <td>${data[x].firstName}</td> <td>${data[x].lastName}</td> 
         <td>${data[x].grade}</td> <td>${data[x].facultyNumber}</td>
         <td>
         <button data-key=${x}>Edit</button>
         <button data-key="${x}">Delete</button>
          </td></tr>`).join('')




            let allButtons=document.querySelectorAll('button');
            let buttons=Array.from(allButtons);
             let first=buttons.shift();
             let second=buttons.shift();


             for(let index in buttons){

                 if(index%2===0){

                     buttons[index].addEventListener('click',function () {

                       let id=buttons[index].getAttribute('data-key');

                         let body2=document.getElementsByTagName('body')[0];
                         let form2=document.createElement('form');
                         form2.setAttribute('id','editStudents')

                         let labelId=document.createElement('label');
                         labelId.textContent='Id';
                         let inputId=document.createElement('input');
                         inputId.setAttribute('placeholder','Id...')

                         let labelFirstName=document.createElement('label');
                         labelFirstName.textContent='First Name';
                         let inputFirstName=document.createElement('input');
                         inputFirstName.setAttribute('placeholder','First Name....')

                         let labelLastName=document.createElement('label');
                         labelLastName.textContent='Last Name';
                         let inputLastName=document.createElement('input');
                         inputLastName.setAttribute('placeholder','Last Name....')


                         let labelFacultyNumber=document.createElement('label');
                         labelFacultyNumber.textContent='Faculty Number';
                         let inputFacultyNumber=document.createElement('input');
                         inputFacultyNumber.setAttribute('placeholder','Faculty Number...');

                         let labelGrade=document.createElement('label');
                         labelGrade.textContent='Grade';
                         let inputGrade=document.createElement('input');
                         inputGrade.setAttribute('placeholder','Grade...');

                         let labelSubmit=document.createElement('label');
                         labelSubmit.textContent='Submit';
                         let buttonSubmit=document.createElement('button');
                         buttonSubmit.setAttribute('id','submitBtn');
                         buttonSubmit.textContent='Submit';

                         form2.appendChild(labelId);
                         form2.appendChild(inputId);
                         form2.appendChild(labelFirstName);
                         form2.appendChild(inputFirstName);
                         form2.appendChild(labelLastName);
                         form2.appendChild(inputLastName);
                         form2.appendChild(labelFacultyNumber);
                         form2.appendChild(inputFacultyNumber);
                         form2.appendChild(labelGrade);
                         form2.appendChild(inputGrade);
                         form2.appendChild(labelSubmit);
                         form2.appendChild(buttonSubmit);
                         body2.appendChild(form2);



                         let object={
                           method:'PATCH',headers:{'Content-type':'application/json'},

                       }

                       fetch(`https://new-students-e69cd-default-rtdb.firebaseio.com/Students/${id}/.json`)
                           .then(res=>res.json())
                           .then(({fNumber,fName,grade,id,lName})=>{
                               console.log(fName)
                            inputFacultyNumber.value=fNumber;
                            inputFirstName.value=fName;
                            inputGrade.value=grade;
                            inputId.value=id;
                            inputLastName.value=lName;


                           });

                         buttonSubmit.addEventListener('click',function () {

                             let object={
                                 method:'PATCH',headers:{'Content-type':'application/json'},
                                body:JSON.stringify({facultyNumber:inputFacultyNumber.value,firstName:inputFirstName.value,
                                 lastName:inputLastName.value,id:inputId.value,grade:inputGrade.value})
                             }
                             fetch(`https://new-students-e69cd-default-rtdb.firebaseio.com/Students/${id}/.json`,object)
                                 .then(res=>res.json())
                         });

                    });

                }else if(index%2!==0){

                    buttons[index].addEventListener('click',function (e) {

               e.preventDefault()
                        let id=buttons[index].getAttribute('data-key');

                        fetch(`https://new-students-e69cd-default-rtdb.firebaseio.com/Students/${id}/.json`,{method:'DELETE'})
                            .then(res=>res.json())

                       let trAll=document.querySelectorAll('table>tbody>tr');
                        console.log(trAll);

                         trAll.forEach(tr=>{

                             tr.deleteRow(id);
                         })

                    })

                }
            }

        });
});

let submitButtons=document.getElementById('submit-students');

submitButtons.addEventListener('click',function (e) {

    e.preventDefault();

    let body=document.body;
    let form=document.createElement('form');
    form.setAttribute('id','createStudents')

    let labelId=document.createElement('label');
    labelId.textContent='Id';
    let inputId=document.createElement('input');
    inputId.setAttribute('placeholder','Id...')

    let labelFirstName=document.createElement('label');
    labelFirstName.textContent='First Name';
    let inputFirstName=document.createElement('input');
    inputFirstName.setAttribute('placeholder','First Name....')

    let labelLastName=document.createElement('label');
    labelLastName.textContent='Last Name';
    let inputLastName=document.createElement('input');
    inputLastName.setAttribute('placeholder','Last Name....')


    let labelFacultyNumber=document.createElement('label');
    labelFacultyNumber.textContent='Faculty Number';
    let inputFacultyNumber=document.createElement('input');
    inputFacultyNumber.setAttribute('placeholder','Faculty Number...');

    let labelGrade=document.createElement('label');
    labelGrade.textContent='Grade';
    let inputGrade=document.createElement('input');
    inputGrade.setAttribute('placeholder','Grade...');

    let labelSubmit=document.createElement('label');
    labelSubmit.textContent='Submit';
    let buttonSubmit=document.createElement('button');
    buttonSubmit.setAttribute('id','submitBtn');
    buttonSubmit.textContent='Submit';


    form.appendChild(labelId);
    form.appendChild(inputId);
    form.appendChild(labelFirstName);
    form.appendChild(inputFirstName);
    form.appendChild(labelLastName);
    form.appendChild(inputLastName);
    form.appendChild(labelFacultyNumber);
    form.appendChild(inputFacultyNumber);
    form.appendChild(labelGrade);
    form.appendChild(inputGrade);
    form.appendChild(labelSubmit);
    form.appendChild(buttonSubmit);
    body.appendChild(form);

    buttonSubmit.addEventListener('click',function (e) {
        e.preventDefault()
        let tableBody=document.querySelectorAll('table>tbody')[0];

        let tr=document.createElement('tr');

        let tdId=document.createElement('td');
        tdId.textContent=inputId.value;

        let tdFn=document.createElement('td');
        tdFn.textContent=inputFirstName.value;

        let tdLn=document.createElement('td');
        tdLn.textContent=inputLastName.value;

        let tdFNumber=document.createElement('td');
        tdFNumber.textContent=inputFacultyNumber.value;

        let tdGrade=document.createElement('td');
        tdGrade.textContent=inputGrade.value;


        let tdDeleteEdit=document.createElement('td');

        let buttonEdit=document.createElement('button');
        buttonEdit.textContent='Edit';
        let buttonDelete=document.createElement('button');
        buttonDelete.textContent='Delete';

        tdDeleteEdit.appendChild(buttonEdit)
        tdDeleteEdit.appendChild(buttonDelete);



        tr.appendChild(tdId);
        tr.appendChild(tdFn);
        tr.appendChild(tdLn);
        tr.appendChild(tdFNumber);
        tr.appendChild(tdGrade);
        tr.appendChild(tdDeleteEdit);

        tableBody.appendChild(tr);

        fetch(`https://new-students-e69cd-default-rtdb.firebaseio.com/Students/.json`,
            {method:'POST',headers:{'Content-type':'application/json'},
                body:JSON.stringify({id:inputId.value,firstName:inputFirstName.value,lastName:inputLastName.value,
                    facultyNumber:inputFacultyNumber.value,grade:inputGrade.value})})
            .then(res=>res.json())
            .then(data=>{

            });
    });


});

