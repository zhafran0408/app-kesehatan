const sakitInput = document.getElementById('sakit');
const rawatInput = document.getElementById('rawat');
const masukkanBtn = document.getElementById('masukkan-btn');
const catatanList = document.getElementById('catatan');


let catatan = JSON.parse(localStorage.getItem('catatan')) || [];


function saveCatatan() {
    localStorage.setItem('catatan', JSON.stringify(catatan));
}


function renderCatatan() {
    catatanList.innerHTML = '';

    catatan.forEach(item => {
        const li = document.createElement('li');
        li.className = 'catatan-item';

        li.innerHTML = `
            <span><b>${item.sakit}</b> - ${item.rawat}</span>
            <div>
                <button class="edit-btn" data-id="${item.id}">Edit</button>
                <button class="delete-btn" data-id="${item.id}">Hapus</button>
            </div>
        `;

        catatanList.appendChild(li);
    });
}


renderCatatan();


masukkanBtn.addEventListener('click', function() {
    const sakitText = sakitInput.value.trim();
    const rawatText = rawatInput.value.trim();

    if (sakitText !== '' && rawatText !== '') {
        const newData = {
            id: Date.now(),
            sakit: sakitText,
            rawat: rawatText
        };

        catatan.push(newData);
        saveCatatan();

        sakitInput.value = '';
        rawatInput.value = '';

        renderCatatan();
    } else {
        alert('Isi nama santri dan kamar!');
    }
});


catatanList.addEventListener('click', function(event) {
    const target = event.target;


    if (target.classList.contains('delete-btn')) {
        const idToDelete = parseInt(target.getAttribute('data-id'));
        catatan = catatan.filter(item => item.id !== idToDelete);
        saveCatatan();
        renderCatatan();
    }

    
    if (target.classList.contains('edit-btn')) {
        const idToEdit = parseInt(target.getAttribute('data-id'));
        const itemToEdit = catatan.find(item => item.id === idToEdit);

        const newSakit = prompt('Edit nama santri sakit:', itemToEdit.sakit);
        const newRawat = prompt('Edit kamar santri:', itemToEdit.rawat);

        if (newSakit !== null && newSakit.trim() !== '' &&
            newRawat !== null && newRawat.trim() !== '') {
            itemToEdit.sakit = newSakit.trim();
            itemToEdit.rawat = newRawat.trim();
            saveCatatan();
            renderCatatan();
        }
    }
});

