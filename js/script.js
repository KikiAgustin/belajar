// Ambil tanggal hari ini

const getDate = new Date();
const getYear = getDate.getFullYear();
const getMont = getDate.getMonth() + 1;
const getDay = getDate.getDate();

function bulan() {
    if (getMont < 10) {
        bulan = `0${getMont}`;
    } else {
        bulan = getMont
    }
    return bulan
}

function hari() {
    if (getDay < 10) {
        hari = `0${getDay}`;
    } else {
        hari = getDay;
    }
    return hari;
}

const tanggal = `${getYear}-${bulan()}-${hari()}`;

// Ambil data dari localStorage
const judulKota = document.querySelector('.judul-kota');
judulKota.textContent = localStorage.namakota;

function getJadwalSholat() {
    fetch('https://api.banghasan.com/sholat/format/json/jadwal/kota/' + localStorage.idkota + '/tanggal/' + tanggal)
        .then(response => response.json())
        .then(data => {
            const jadwal = data.jadwal.data;
            document.querySelector('.imsak').textContent = jadwal.imsak;
            document.querySelector('.subuh').textContent = jadwal.subuh;
            document.querySelector('.terbit').textContent = jadwal.terbit;
            document.querySelector('.dzuhur').textContent = jadwal.dzuhur;
            document.querySelector('.ashar').textContent = jadwal.ashar;
            document.querySelector('.maghrib').textContent = jadwal.maghrib;
            document.querySelector('.isya').textContent = jadwal.isya;
            document.querySelector('.tanggal').textContent = jadwal.tanggal;
        });
}


// Pilih Lokasi
const inputSearch = document.querySelector('.input-search');
const cardList = document.querySelector('.card-list');

inputSearch.addEventListener('keyup', function () {
    const inputValue = inputSearch.value.length;

    if (inputValue > 0) {
        cardList.classList.remove('hidden-list');

        fetch(' https://api.banghasan.com/sholat/format/json/kota')
            .then(response => response.json())
            .then(response => {
                const kota = response.kota;
                let listKota = '';
                kota.forEach(k => {
                    listKota += `<a href="#" data-idkota="${k.id}" class="list-group-item list-group-item-action nama-kota">${k.nama}</a>`
                });
                const cardKota = document.querySelector('.card-list');
                cardKota.innerHTML = listKota;

                // Ketika Kota di klik
                const namaKota = document.querySelectorAll('.nama-kota');
                namaKota.forEach(kota => {

                    // Filter text
                    const filterText = namaKota.value.toLowerCase();
                    const itemText = kota.firstChild.textContent.toLowerCase();

                    if (itemText.indexOf(filterText) != -1) {
                        kota.setAttribute("style", "display : block;");
                    } else {
                        kota.setAttribute("style", "display : none !important;");
                    }

                    kota.addEventListener('click', function () {
                        const idkota = this.dataset.idkota;
                        const pilihKota = this.textContent;
                        window.localStorage.setItem('idkota', idkota);
                        window.localStorage.setItem('namakota', pilihKota);
                        cardList.classList.add('hidden-list');
                        inputSearch.value = '';
                        location.reload();
                        alert(`Kota ${pilihKota} Berhasil dipilih`);
                    });
                });

                console.log(kota);
            });

    } else {
        cardList.classList.add('hidden-list');
    }

})



getJadwalSholat();