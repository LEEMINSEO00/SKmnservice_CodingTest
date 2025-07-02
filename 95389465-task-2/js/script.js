let names = [];
let nameDetails = [];

function data() {
    return fetch('../data/name.csv')
        .then(response => response.text())
        .then(text => text.split('\n'));
}

function loadDetails() {
    return fetch('../API/dummy_detail.json')
        .then(response => response.json())
        .then(data => {
            nameDetails = data;
        });
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

function showDetails(filtered, index) {
    const detailDiv = document.getElementById('detailInfo');
    if (!detailDiv) return;

    const person = filtered [index];

    if (!person) {
        detailDiv.innerHTML = '<p>상세 정보를 찾을 수 없습니다.</p>';
        return;
    }

    detailDiv.innerHTML = `
        <div class="detail-card">
            <strong>이름:</strong> ${person.name}<br>
            <strong>생일:</strong> ${person.birth}<br>
            <strong>전화번호:</strong> ${person.phone}
        </div>
    `;
}

function updateResults(query) {
    const filteredNames = searchQuery(names, query);
    const resultsList = document.getElementById('resultsList');
    if (resultsList) {
        resultsList.innerHTML = '';
        
        if (filteredNames.length === 0) {
            resultsList.innerHTML = `<li class="no-results">${query.trim() ? '검색 결과가 없습니다' : '검색어를 입력해주세요'}</li>`;
        } else {
            const filteredPeople = nameDetails.filter(person =>
                person.name.toLowerCase().includes(query.toLowerCase())
            );

            filteredPeople.forEach((person, index) => {
                const resultItem = document.createElement('li');
                resultItem.textContent = person.name;
                resultItem.style.display = 'block';
                resultItem.style.padding = '8px 12px';
                resultItem.style.margin = '5px 0';

                resultItem.addEventListener('click', () => {
                    showDetails(filteredPeople, index);
                });

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
    await loadDetails();
    names = await data();
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            updateResults(e.target.value);
        });
        
        searchInput.addEventListener('focus', () => {
            const container = document.querySelector('.container');
            if (container) {
                container.style.transform = 'scale(1)';
                container.style.opacity = '1';
            }
            
            searchInput.style.width = '100%';
            searchInput.style.padding = '15px';
        });

        updateResults('');
    }
    
    console.log('애플리케이션이 초기화되었습니다.');
    console.log(`총 ${names.length}개의 이름이 로드되었습니다.`);
}

document.addEventListener('DOMContentLoaded', i);