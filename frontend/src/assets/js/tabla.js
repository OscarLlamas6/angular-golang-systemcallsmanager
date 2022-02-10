async function terminar(pid){

    var apiUrl="http://192.168.0.17:8080/kill"
    const resp = await fetch(apiUrl,{
          method: 'POST',
          headers: {
            'Content-type' : 'application/json'
          },
          body: "{\"pid\":\""+pid+"\"}"
        })
}
