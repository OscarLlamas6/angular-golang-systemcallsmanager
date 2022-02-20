async function terminar(pid){

    var apiUrl="http://192.168.0.19:3000/api/kill"
    const resp = await fetch(apiUrl,{
          method: 'POST',
          headers: {
            'Content-type' : 'application/json'
          },
          body: "{\"pid\":\""+pid+"\"}"
        })
}

async function strace(nombre){

  var apiUrl="http://192.168.0.19:3000/api/strace"
  const resp = await fetch(apiUrl,{
        method: 'POST',
        headers: {
          'Content-type' : 'application/json'
        },
        body: "{\"name\":\""+nombre+"\"}"
      })

  console.log(resp)
}

