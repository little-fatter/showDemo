const WebSocket = require('/Users/zwang/.volta/tools/shared/ws')

const wss = new WebSocket.Server({ port: 8080 })

const instanceCache = new Map();
const Clients = [];

const InstanceStatus = { Init: 'init', Scored: 'scored' }

function isExist(id) {
  return instanceCache.has(id)
}
function wrapResult({ success, instance, error }) {
  return {
    success,
    instance,
    error
  }
}

function genInstanceInfo(name) {
  return {
    name,
    status: InstanceStatus.Init,
    score: -1,
    isShowScore: false,
    showManipulator: false,
    cleanManipulator: false
  }
}

function OmitClient(data) {
  const { client, ...rest } = data || {};
  return rest
}

function getInstanceInfoExceptClient(id) {
  const instance = instanceCache.get(id);
  return Object.keys(instance??{}).map(key => OmitClient(instance[key])).reduce((res,item) => {
    res[item.name] = item
    return res
  },{})
}

function cacheInstance(data, client) {
  const instance = instanceCache.get(data.id)
  const info = genInstanceInfo(data.name)
  instance[data.name] = {...info, client}
  return wrapResult({ instance: getInstanceInfoExceptClient(data.id), success: true})
}

function createInstance(data, client) {
  if(data.name && data.id) {
    const info = genInstanceInfo(data.name)
    instanceCache.set(data.id, { [data.name]: {...info, client} })
    return wrapResult({ instance: getInstanceInfoExceptClient(data.id), success: true})
  }
  return wrapResult({
    success: false, error: 'id & name is required'
  })
}

function joinPoker(data, client) {
    if(data.id) {
    return isExist(data.id) ? cacheInstance(data, client) : createInstance(data, client)
  }
  return wrapResult({
    success: false, error: 'id & name is required'
  })
}

function Score(data) {
  const { id, name, score } = data
  if(isExist(id)) {
    const instance = instanceCache.get(id)
    instance[name].score = score
    instance[name].status = InstanceStatus.Scored
    return wrapResult({ instance: getInstanceInfoExceptClient(id), success: true})
  }
}

function Clean(data) {
  if(isExist(data.id)) {
    const instance = instanceCache.get(data.id)
    Object.keys(instance).forEach(key => {
      const client = instance[key]?.client;
      instance[key] = { ...genInstanceInfo(key), client};
    })
    return wrapResult({ instance: getInstanceInfoExceptClient(data.id), success: true})
  }
}

function Show(data) {
  const { id, name } = data
  if(isExist(id)) {
    const instance = instanceCache.get(data.id)
    instance[name].showManipulator = true
    Object.keys(instance).forEach(key => {
      instance[key].isShowScore = true
    })
    return wrapResult({ instance: getInstanceInfoExceptClient(data.id), success: true})
  }
}
function Quit(data) {
  const { id, name } = data
  if(isExist(id)) {
    const instance = instanceCache.get(data.id)
    delete instance[name]
    return wrapResult({ instance: getInstanceInfoExceptClient(data.id), success: true})
  }
}

function broadcast(result,id) {
  const ins = instanceCache.get(id);
  Object.keys(ins??{}).forEach((user) => ins[user].client?.send(JSON.stringify(result)))
}

const eventMaps = {
  Join: joinPoker,
  Score: Score,
  Clean: Clean,
  Show: Show,
  Quit: Quit,
}

wss.on('connection', (ws, req) => {
  const ip = req.socket.remoteAddress;
    try {
      ws.on('message', (message) => {
        const data = JSON.parse(message.toString());
        const result = eventMaps[data?.eventType]?.(data, ws)
        result?.success ? broadcast(result, data.id) : ws.send(JSON.stringify(result??{}))
      })
      ws.on('disconnect', () => {
        console.log('disconnect')
        Clients.splice(Clients.indexOf(ws),1)
      })
    } catch (error) {
      ws.send(JSON.stringify({ success: false, error: error }))
    }
})