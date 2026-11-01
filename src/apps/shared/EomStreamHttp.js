// NDJSON framing is independent of network chunk boundaries and UTF-8 splits.
export async function postEomStream(fetchImpl, endpoint, body, headers, onPaths) {
  const response=await fetchImpl(endpoint,{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(body)});
  if(!response.ok){const p=await response.json();throw Object.assign(new Error(p.error??`EOM HTTP ${response.status}`),p);}
  if(!response.body?.getReader || !response.headers.get('content-type')?.includes('application/x-ndjson'))throw new Error('EOM streaming response unavailable.');
  const reader=response.body.getReader(),decoder=new TextDecoder('utf-8',{fatal:true});let pending='',result,terminal=false;
  async function line(text){
    if(!text.trim())return;
    if(terminal)throw new Error('Data follows the terminal EOM stream event.');
    const event=JSON.parse(text);
    if(event.type==='paths'){await onPaths(event.payload);return;}
    terminal=true;
    if(event.type==='error')throw Object.assign(new Error(event.payload.error??'EOM stream failed.'),event.payload);
    if(event.type!=='result')throw new Error('Unknown EOM stream event.');
    result=event.payload;
  }
  try{
    while(true){const {value,done}=await reader.read();pending+=done?decoder.decode():decoder.decode(value,{stream:true});let i;while((i=pending.indexOf('\n'))>=0){const text=pending.slice(0,i);pending=pending.slice(i+1);await line(text);}if(done)break;}
    if(pending)await line(pending);
    if(!terminal||!result)throw new Error('EOM path stream ended without a terminal result; live paths have no durable checkpoint.');
    return result;
  }catch(error){await reader.cancel().catch(()=>{});throw error;}finally{reader.releaseLock();}
}
