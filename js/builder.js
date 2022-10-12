let content = document.querySelector('.content');

function getDefaultBtn(id, text, callback) {
    return `<div id="${id}" class="default-btn btn unselectable" onclick="${callback}('./data/func_settings.json', id);">
                <span>${text}</span>
           </div>`;
}

async function buildButtons(buttonsJsonDataPath) {
    content.innerHTML = '';
    await fetch(buttonsJsonDataPath)
        .then(resp => resp.json())
        .then(json => json.forEach(btnData => {
                switch (btnData['class']) {
                    case 'default-btn':
                        content.innerHTML += getDefaultBtn(btnData['id'], btnData['text'], btnData['callback']);
                        break;
                }
            }
        ));
}

function getPromptTxtInput(name, setts) {
    return `<div class="node-container">
                <input name="${name}"
                       type="text"
                       class="prompt-txt-input" 
                       placeholder="${setts['placeholder']}"
                       pattern="${setts['valid']}"
                       ${setts['required'] ? 'required' : ''}>
                <div class="prompt unselectable" onclick="this.classList.toggle('open')">${setts['prompt']}</div>       
            </div>`;
}

function getDivBox(name, setts) {
    let templates = ''
    for (let template in setts['templates']) {
        templates += `<span class="box-operator"
                            onclick="this.parentNode.parentNode.querySelector('.div-box-prompt_values').innerHTML += '<span class=box-value-operator val=${setts['templates'][template]}>${template}</span>';"
                      >${template}</span>`;
    }
    return `<div class="node-container">
                <div class="div-box-prompt">
                    <div class="div-box-prompt_title">${setts['title']}</div>
                    <div class="div-box-prompt_values"></div>
                    <div class="div-box-prompt_templates">${templates}</div>
                    <div class="div-box-prompt_add">
                        <div class="div-box-prompt_input">
                            <input type="text" class="prompt-txt-input" placeholder="${setts['placeholder']}">
                        </div>
                        <div class="div-box-prompt_btns">
                            <div onclick="this.parentNode.parentNode.parentNode.querySelector('.div-box-prompt_values').innerHTML += '<span class=box-value val=' + this.parentNode.parentNode.parentNode.querySelector('.prompt-txt-input').value + '>' + this.parentNode.parentNode.parentNode.querySelector('.prompt-txt-input').value + '</span>'">Добавить</div>
                        </div>
                    </div>
                </div>
                <div class="prompt unselectable" onclick="this.classList.toggle('open')">${setts['prompt']}</div>
            </div>`;
}

function getToggle(name, setts) {
    return `<div class="node-container">
                <label class="default-toggle">
                    <input type="checkbox" name="${name}" ${setts['value'] ? 'checked' : ''}>
                    <div class="default-toggle_slider">
                        <div class="default-toggle_btn"></div>    
                    </div>
                    <div class="default-toggle_text">${setts['text']}</div>
                </label>    
            </div>`
}

async function buildFuncSettings(funcSettingsJsonDataPath, funcId) {
    content.innerHTML = '';
    await fetch(funcSettingsJsonDataPath)
        .then(resp => resp.json())
        .then(json => json.forEach(funcSettingsData => {
            if (funcSettingsData['id'] === funcId) {
                let args = funcSettingsData['args']
                for (let arg in args) {
                    let nodeClass = args[arg]['class']
                    if (nodeClass === 'prompt-txt-input') {
                        content.innerHTML += getPromptTxtInput(arg, args[arg]);
                    } else if (nodeClass === 'div-box-prompt') {
                        content.innerHTML += getDivBox(arg, args[arg]);
                    } else if (nodeClass === 'default-toggle') {
                        content.innerHTML += getToggle(arg, args[arg]);
                    }
                }
            }
        }));
}