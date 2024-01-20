function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    };
    return null;
}

(function() {

    const id = getQueryString('id');
    const scroeValueMap = {
        "0": 0,
        "½": 0.5,
        "1": 1,
        "2": 2,
        "3": 3,
        "5": 5,
        "8": 8,
        "13": 13,
        "20": 20,
        "40": 40,
        "100": 100
    };

    if(!id && id !== 0) {
        alert('id is required!');
        return ;
    }

    const url = 'ws://123.249.71.200/chat/';
    const connection = new WebSocket(url);

    const eventMaps = {
        Join: 'Join',
        Score: 'Score',
        Clean: 'Clean',
        Show: 'Show',
        // Quit: 'Quit',
      }
    const ul = document.querySelector('.scores');
    const form = document.getElementById('form');
    const JoinPart = document.querySelector('.Join');
    const ActionsPart = document.querySelector('.Actions');
    const VotesPart = document.querySelector('.Votes');
    const showScoreBtn = document.getElementById('showScore');
    const clearScoreBtn = document.getElementById('clearScore');
    let selfInstance = {};
    let instanceGroup = [];
    let wsIsOpen = false;
    let userName;

    function wsSend(data) {
        wsIsOpen && connection.send(JSON.stringify({id, ...data}));
    }

    function submitForm(e) {
        userName = e.target[0].value;
        wsSend({
            eventType: eventMaps.Join,
            name: userName,
        });
        event.preventDefault();
    }

    function score(value) {
        wsSend({
            eventType: eventMaps.Score,
            name: userName,
            score: value,
        })
    }

    function show() {
        wsSend({
            eventType: eventMaps.Show,
            name: userName,
        })
    }

    function clear() {
        wsSend({
            eventType: eventMaps.Clean,
            name: userName,
        })
    }

    // function quit() {
    //     wsSend({
    //         eventType: eventMaps.Quit,
    //         name: userName
    //     })
    // }

    function createList(instance) {
        selfInstance = instance[userName];
        instanceGroup = instance ? Object.values(instance) : [];
        setCheckedScore(selfInstance);
        generateVotes(instanceGroup);
    }

    function setCheckedScore(selfInstance) {
        Array.from(ul.children).forEach(li => {
            const target = li.children[0] || {};
            target.classList?.remove('selected');
            if(target.getAttribute('value') === selfInstance.score) {
                target.classList?.add('selected');
            }
        })
    }

    function calcMode(validScoredInstance) {
        const countList = {};
        let mode, modeCount = 0;
        validScoredInstance.forEach(instance => {
            countList[instance.score] ? countList[instance.score] ++ : countList[instance.score] = 1
        })
        Object.keys(countList).forEach(score => {
            if(countList[score] > modeCount) {
                modeCount = countList[score]
                mode = score
            }
        })
        return mode
    }

    function calcAVG(validScoredInstance) {
        return (validScoredInstance.reduce((sum, instance) => {
            return sum + scroeValueMap[instance.score];
        }, 0) / validScoredInstance.length).toFixed(2);
    }

    function mountSums() {
        unMountSums();
        const validScoredInstance = instanceGroup.filter(instance => {
            return scroeValueMap[instance.score] || scroeValueMap[instance.score] === 0
        });
        const mode = calcMode(validScoredInstance);
        const avg = calcAVG(validScoredInstance);
        const sums = document.createElement("div");
        sums.id = "score-sum";
        sums.className="SiteNotification"
        sums.innerHTML = `AVG: ${avg}; Mode: ${mode}`;
        ActionsPart.after(sums);
    }

    function unMountSums() {
        const sums = document.querySelector("#score-sum");
        sums && sums.parentNode.removeChild(sums);
    }

    function generateVotes(instances) {
        const childs = instances.map(instance => {
            return `
                        <li class="fade-enter-done">
                            <dd>
                                <div class="
                                    Card 
                                    ${instance.status === 'scored' ? 'voted' : ''}
                                    ${instance.isShowScore ? 'show' : ''}">
                                    <div class="front face">${instance.isShowScore ? instance.score : ''}</div>
                                    <div class="back face">♡</div>
                                </div>
                            </dd>
                            <dt>${instance.name}</dt>
                        </li>
                    `;
        })
        VotesPart.innerHTML = `<ul>${childs.join('')}</ul>`;
    }

    function switchView() {
        JoinPart.style.display = 'none';
        ActionsPart.style.display = 'flex';
        VotesPart.style.display = 'block';
    }

    function switchButton(instance) {
        instanceGroup = instance ? Object.values(instance) : [];
        const showClear = instanceGroup.some(instance => instance.showManipulator);
        showClear ? mountSums() : unMountSums();
        showScoreBtn.style.display = showClear ? 'none' : 'block';
        clearScoreBtn.style.display = showClear ? 'block' : 'none';
    }
    
    form.addEventListener("submit", submitForm);

    ul.addEventListener('click', function(e) {
        score(e.target.value);
    })

    showScoreBtn.addEventListener('click', show)

    clearScoreBtn.addEventListener('click', clear)

    // window.addEventListener("unload", (event) => {
    //     quit()
    // });

    connection.addEventListener("error", function(error) {
        alert('websocket failed');
        wsIsOpen = false;
        console.error('WebSocket error: ', error);
    });
    
    // Listen for messages
    connection.addEventListener("message", function(e) {
        const data = e.data && JSON.parse(e.data);
        if(data.success) {
            const { instance } = data;
            switchView();
            switchButton(instance);
            createList(instance);
        } else if ( data.status === 'connectReturn' ) {
            console.log('connect success!');
        } else {
            console.error(data.error);
        }
    });

    connection.addEventListener('open', () => {
        wsIsOpen = true;
    });

    connection.addEventListener('close', function() {
        if(wsIsOpen) {
            window.alert('websocket disconnected');
            location.reload();
        }
    });
})()