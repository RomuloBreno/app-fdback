
export function notify(clientsReq:any, json:Object, userId:string) {
    const clients: WebSocket[] = clientsReq; // Recupera os clients anexados no middleware
    console.log('notify: ' + json.event)
    if (userId){
      clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN ) {
          if (client.userId === userId ){
          client.send(
          JSON.stringify(json)
        );
      }
      }
    });
  } 
  }