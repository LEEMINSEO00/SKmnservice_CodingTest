let names = [];

function data() {
    return fetch('../data/name.csv')
        .then(response => response.text())
        .then(text => text.split('\n'));
}

function searchQuery(nameList, query) {
    if (!query.trim()) {
        return [];
    }
    
    return nameList.filter(name => 
        name.toLowerCase().includes(query.toLowerCase())
    );
}

function autoComplete(nameList, query) {
    if (!query.trim()) {
        return null;
    }
    
    const match = nameList.find(name => 
        name.toLowerCase().startsWith(query.toLowerCase())
    );
    
    return match || null;
}

function updateResults(query) {
    const filteredNames = searchQuery(names, query);
    const resultsList = document.getElementById('resultsList');
    if (resultsList) {
        resultsList.innerHTML = '';
        
        if (filteredNames.length === 0) {
            resultsList.innerHTML = `<li class="no-results">${query.trim() ? '검색 결과가 없습니다' : '검색어를 입력해주세요'}</li>`;
        } else {
            filteredNames.forEach((name) => {
                const resultItem = document.createElement('li');
                resultItem.textContent = name;
                resultItem.style.display = 'block';
                resultItem.style.padding = '8px 12px';
                resultItem.style.margin = '5px 0';
                resultsList.appendChild(resultItem);
            });
        }
    }
    
    const autoCompleteList = autoComplete(names, query);
    const autocompleteOverlay = document.getElementById('autocompleteOverlay');
    if (autocompleteOverlay) {
        autocompleteOverlay.innerHTML = '';
        
        if (autoCompleteList && query.length > 0) {
            const visiblePart = query;
            const hintPart = autoCompleteList.slice(query.length);
            const transparentSpan = document.createElement('span');
            transparentSpan.style.color = 'transparent';
            transparentSpan.textContent = visiblePart;
            autocompleteOverlay.appendChild(transparentSpan);
            
            const hintSpan = document.createElement('span');
            hintSpan.className = 'autocomplete-hint';
            hintSpan.textContent = hintPart;
            autocompleteOverlay.appendChild(hintSpan);
        }
    }
}

async function i() {
    names = await data();

    query = '';
    
    const body = document.body;
    const oldContainer = document.querySelector('.container');
    body.removeChild(oldContainer);
    body.offsetHeight;
    
    const newContainer = document.createElement('div');
    newContainer.className = 'container';
    newContainer.innerHTML = `
        <h1>이름 검색 시스템</h1>
        
        <div class="info">
            💡 이름을 입력하면 자동완성과 관련 결과를 확인할 수 있습니다.
        </div>

        <div class="search-container">
            <div id="autocompleteOverlay" class="autocomplete-overlay"></div>
            <input 
                type="text" 
                id="searchInput" 
                placeholder="이름을 입력하세요..."
                autocomplete="off"
                value="${query}"
            >
        </div>

        <div class="results-container">
            <div class="results-title">검색 결과:</div>
            <ul id="resultsList" class="results-list">
                <li class="no-results">검색어를 입력해주세요</li>
            </ul>
        </div>
    `;
    
    body.appendChild(newContainer);
    body.offsetHeight;
    
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        element.style.display = element.style.display || '';
        element.offsetHeight;
    });
    
    const currentContainer = document.querySelector('.container');
    if (currentContainer) {
        currentContainer.style.transform = 'scale(1)';
        currentContainer.style.opacity = '1';
        currentContainer.offsetHeight;
    }
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.style.width = '100%';
        searchInput.style.padding = '15px';
        searchInput.offsetHeight;
    }
    
    if (searchInput) {
        const clonedInput = searchInput.cloneNode(true);
        searchInput.parentNode.replaceChild(clonedInput, searchInput);
        
        clonedInput.addEventListener('input', (e) => {
            hQuery(e.target.value);
        });
        
        clonedInput.addEventListener('focus', () => {
            const refreshElements = document.querySelectorAll('*');
            refreshElements.forEach(element => {
                element.style.display = element.style.display || '';
                element.offsetHeight;
            });
            
            const animatedContainer = document.querySelector('.container');
            if (animatedContainer) {
                animatedContainer.style.transform = 'scale(1)';
                animatedContainer.style.opacity = '1';
                animatedContainer.offsetHeight;
            }
            
            const focusedInput = document.getElementById('searchInput');
            if (focusedInput) {
                focusedInput.style.width = '100%';
                focusedInput.style.padding = '15px';
                focusedInput.offsetHeight;
            }
        });
    }

    const filteredNames = searchQuery(names, query);
    
    const resultsList = document.getElementById('resultsList');
    if (resultsList) {
        while (resultsList.firstChild) {
            resultsList.removeChild(resultsList.firstChild);
            resultsList.offsetHeight;
        }
        
        if (filteredNames.length === 0) {
            const noResult = document.createElement('li');
            noResult.className = 'no-results';
            noResult.textContent = query.trim() ? '검색 결과가 없습니다' : '검색어를 입력해주세요';
            resultsList.appendChild(noResult);
            resultsList.offsetHeight;
        } else {
            filteredNames.forEach((name, index) => {
                const resultItem = document.createElement('li');
                resultItem.textContent = name;
                resultItem.style.display = 'block';
                resultsList.appendChild(resultItem);
                resultsList.offsetHeight;
                
                resultItem.style.padding = '8px 12px';
                resultItem.style.margin = '5px 0';
                resultItem.offsetHeight;
            });
        }
    }
    
    const autoCompleteList = autoComplete(names, query);
    const autocompleteOverlay = document.getElementById('autocompleteOverlay');
    if (autocompleteOverlay) {
        autocompleteOverlay.innerHTML = '';
        autocompleteOverlay.offsetHeight;
        
        if (autoCompleteList && query.length > 0) {
            const visiblePart = query;
            const hintPart = autoCompleteList.slice(query.length);
            
            const transparentSpan = document.createElement('span');
            transparentSpan.style.color = 'transparent';
            transparentSpan.textContent = visiblePart;
            autocompleteOverlay.appendChild(transparentSpan);
            autocompleteOverlay.offsetHeight;
            
            const hintSpan = document.createElement('span');
            hintSpan.className = 'autocomplete-hint';
            hintSpan.textContent = hintPart;
            autocompleteOverlay.appendChild(hintSpan);
            autocompleteOverlay.offsetHeight;
        }
    }
    
    console.log('애플리케이션이 초기화되었습니다.');
    console.log(`총 ${names.length}개의 이름이 로드되었습니다.`);
}

document.addEventListener('DOMContentLoaded', i);