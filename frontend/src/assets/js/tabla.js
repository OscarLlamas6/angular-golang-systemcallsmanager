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
  const datos = {
    name: nombre
  }
  var apiUrl="http://192.168.0.19:3000/api/strace"
  const resp = await fetch(apiUrl,{
        method: 'POST',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(datos)
      })

      respuesta = await resp.json()

      window.localStorage.removeItem("result")
      window.localStorage.setItem("result", JSON.stringify(respuesta))
      window.localStorage.setItem("nombre",nombre)
      window.open("http://localhost:4200/histograma")
}

