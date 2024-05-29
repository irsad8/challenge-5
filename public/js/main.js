function hapus(id) {
        fetch(`http://localhost:8000/API/delete/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log('Item deleted successfully');
                window.location.reload();
            } else {
                console.error('Error deleting item');
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    }

async function ubah(e, id){
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
        const response = await fetch(`http://localhost:8000/API/edit/${id}`, {
            method: 'PATCH',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        alert(data.msg)
        window.location.href = "/list"
    } catch (error) {
            console.error('Error submitting form:', error);
    }
}

async function tambah(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
        const response = await fetch(`http://localhost:8000/API/add`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        alert(data.msg)
        window.location.href = "/list"
    } catch (error) {
            console.error('Error submitting form:', error);
    }
}
