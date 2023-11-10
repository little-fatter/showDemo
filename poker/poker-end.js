const WebSocket = require('/Users/zwang/.volta/tools/shared/ws')

const wss = new WebSocket.Server({ port: 8080 })

/*
  Instace structure {
    id: room ID
    {
      name: userName
      {
        name: userName,
        status: InstanceStatus,
        score: Number,
        isShowScore: Boolean,
        showManipulator: Boolean,
        cleanManipulator: Boolean,
        client: ws Client
      }
    }
  }
*/
const instanceCache = new Map();

const InstanceStatus = { Init: 'init', Scored: 'scored' };

function isExist(id) {
  return instanceCache.has(id);
}
function wrapResult({ success, instance, error }) {
  return {
    success,
    instance,
    error,
  }
}

function genInstanceInfo(name) {
  return {
    name,
    status: InstanceStatus.Init,
    score: -1,
    isShowScore: false,
    showManipulator: false,
    cleanManipulator: false,
  }
}

function OmitClient(data) {
  const { client, ...rest } = data || {};
  return rest;
}

function getInstanceInfoExceptClient(id) {
  const instance = instanceCache.get(id) || {};
  return Object.keys(instance).map(key => OmitClient(instance[key])).reduce((res,item) => {
    res[item.name] = item;
    return res;
  },{})
}

function cacheInstance(data, client) {
  const instance = instanceCache.get(data.id);
  const info = genInstanceInfo(data.name);
  instance[data.name] = {...info, client};
  return wrapResult({ instance: getInstanceInfoExceptClient(data.id), success: true});
}

function cleanCache() {
  Array.from(instanceCache).map((instance) => {
    if(instance[1] && Object.entries(instance[1]).length > 0) {
        return ;
    } else {
        return instance[0];
    }
  }).forEach(roomId => {
      if(roomId) {
        instanceCache.delete(roomId);
      }
  })
}

function createInstance(data, client) {
  if(data.name && data.id) {
    const info = genInstanceInfo(data.name);
    instanceCache.set(data.id, { [data.name]: {...info, client} });
    cleanCache();
    return wrapResult({ instance: getInstanceInfoExceptClient(data.id), success: true});
  }
  return wrapResult({
    success: false,
    error: 'id & name is required',
  })
}

function joinPoker(data, client) {
    if(data.id) {
    return isExist(data.id) ? cacheInstance(data, client) : createInstance(data, client);
  }
  return wrapResult({
    success: false,
    error: 'id & name is required',
  })
}

function Score(data) {
  const { id, name, score } = data;
  if(isExist(id)) {
    const instance = instanceCache.get(id);
    instance[name].score = score;
    instance[name].status = InstanceStatus.Scored;
    return wrapResult({ instance: getInstanceInfoExceptClient(id), success: true});
  }
}

function Clean(data) {
  if(isExist(data.id)) {
    const instance = instanceCache.get(data.id);
    Object.keys(instance).forEach(key => {
      const client = instance[key] && instance[key].client;
      instance[key] = { ...genInstanceInfo(key), client};
    })
    return wrapResult({ instance: getInstanceInfoExceptClient(data.id), success: true});
  }
}

function Show(data) {
  const { id, name } = data;
  if(isExist(id)) {
    const instance = instanceCache.get(data.id);
    instance[name].showManipulator = true;
    Object.keys(instance).forEach(key => {
      instance[key].isShowScore = true;
    })
    return wrapResult({ instance: getInstanceInfoExceptClient(data.id), success: true});
  }
}
// function Quit(data) {
//   const { id, name } = data
//   if(isExist(id)) {
//     const instance = instanceCache.get(data.id)
//     delete instance[name]
//     return wrapResult({ instance: getInstanceInfoExceptClient(data.id), success: true})
//   }
// }

function broadcast(result,id) {
  const ins = instanceCache.get(id) || {};
  Object.keys(ins).forEach((user) => ins[user].client && ins[user].client.send(JSON.stringify(result)));
}

const eventMaps = {
  Join: joinPoker,
  Score: Score,
  Clean: Clean,
  Show: Show,
  // Quit: Quit,
}

wss.on('connection', (ws, req) => {
    try {
      ws.on('message', (message) => {
        const data = JSON.parse(message.toString()) || {};
        const result = eventMaps[data.eventType] && eventMaps[data.eventType](data, ws) || {};
        result.success ? broadcast(result, data.id) : ws.send(JSON.stringify(result));
      })
      ws.on('close', () => {
        let id;
        Array.from(instanceCache).forEach((instance) => {
          for (const [key, userInstance] of Object.entries(instance[1] ? instance[1] : {})) {
            if (userInstance.client === ws) {
              id = instance[0];
              delete instance[1][key];
            }
          }
        })
        if(id) {
          const result = wrapResult({ instance: getInstanceInfoExceptClient(id), success: true});
          broadcast(result, id);
        }
      })
    } catch (error) {
      ws.send(JSON.stringify({ success: false, error: error }));
    }
})