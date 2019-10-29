

function getData(){
    axios.get('http://localhost:5500/activities/')
        .then(res => console.log(res));
}