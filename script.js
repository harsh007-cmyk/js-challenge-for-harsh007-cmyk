const btn=document.querySelector('button');
const userform=document.forms['userform'];
const inps=document.querySelectorAll('input')
const msg=document.querySelector('.message');
const tbody=document.querySelector('.table-body');
const tmsg=document.querySelector('.tmessage');
const address=document.getElementById('Adrs');
btn.addEventListener('click',submit);
var len=0;
addTotable()
function submit(e){
    var message="";  
    e.preventDefault();
    const fname=userform['fname'];
    const lname=userform['lname'];
    const username=userform['uname'];
    const email=userform['Email'];
    const ph=userform['phone'];
    const web=userform['web-site'];
    const company=userform['company-name'];
    const fnameLen=fname.value.length;
    const lnameLen=lname.value.length;
    const mailRegX=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const urlRegX=/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    let domain="";
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(fnameLen<3||!/^[a-zA-Z0-9]+$/.test(fname.value)){
        message+="First name must contain atleast three alphanumeric characters (only alphanumeric is allowed).<br>"
    }
    if(lnameLen<3||!/^[a-zA-Z0-9]+$/.test(lname.value)){
        console.log('afsda');
        message+="Last name must contain atleast three alphanumeric characters(only alphanumeric is allowed).<br>";
    }
    if(!/^[a-zA-Z0-9.]+$/.test(username.value)){
        
        message+="Username can't be blank and only dot and alphanumeric are allowed.<br>";  
    }

    if(!mailRegX.test(email.value)){
        console.log("mail");
        message+="Invalid Email. <br>";
    }
    if(!address.value){
        message+="Address can't be blank.  <br>"; 

    }
    if(!phoneno.test(ph.value)){
        console.log('abcdef');
        message+="Invalid phone number. <br>";
    }
    if(web.value&&!urlRegX.test(web.value)){
        message+="Invalid website."
    }
    if(message){
        msg.innerHTML=message;
        return ;
    }
    msg.innerHTML="";
    const  ind=len+1;
    len++;
    const webUrl=web.value;
    let dname=""
    if(webUrl){
        domain=new URL(webUrl);
        dname=domain.hostname.replace('www.','');
    }
    
    addInputData(
        ind,
        fname.value+" "+lname.value,
        username.value,
        email.value,
        address.value,
        ph.value,
        dname,
        company.value
        );

        address.value="";
        inps.forEach(el=>{
            el.value="";    
        })
   
}
function addInputData(
    id,
    name,
    username,
    email,
    address,
    phone,
    website,
    company
    ){
    const td=document.createElement('tr');
    td.innerHTML=`<td>${id}</td>
                <td>${name}</td>
                <td>${username}</td>
                <td>${email}</td>
                <td>${address}</td>
                <td>${phone}</td>
                <td>${website}</td>
                <td>${company}</td>
                `
    tbody.appendChild(td);
}

 function addTotable(){
    fetch('https://jsonplaceholder.typicode.com/users').
    then(res=>res.json()).then(data=>{
        var temp="";
        len=data.length;
        data.forEach(element => {
            var adrs=element.address;
            temp+=`<tr>
            <td>${element.id}</td>
            <td>${element.name}</td>
            <td>${element.username}</td>
            <td>${element.email}</td>
            <td class="address-cell">${adrs.street}, ${adrs.suite}, ${adrs.city}, ${adrs.zipcode}, ${adrs.geo.lat}, ${adrs.geo.lng}</td>
            <td>${element.phone}</td>
            <td>${element.website}</td>
            <td>${element.company.name}</td>
            `;
            
        }
        );
        tbody.innerHTML=temp;

    }).catch(err=>{
        tmsg.innerHTML='Something went wrong while fetching the users.'
        console.log(err);
    })
    
}
