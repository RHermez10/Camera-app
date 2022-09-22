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


