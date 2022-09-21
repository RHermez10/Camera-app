export const fetchUserPhotos = async (user: string | null) => {
    console.log('Gallery SessionStorage User: ', user);

    const response = await fetch('http://localhost:1337/gallery', {
        method: "GET",
        headers: { "Authorization": `Bearer ${user}` },
    });

    const result = await response.json();

    const data = result.data;

    console.log('USER PHOTOS: ', data);

    return data;
};

export const deletePhoto = async (_id: string | undefined) => {

    try {
        const response = await fetch('http://localhost:1337/gallery', {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id: _id}),
    });

    const result = await response.json();
    return result;
    
    } catch (err) {
        console.error('Error in deleting photo: ', err)
    };
};


