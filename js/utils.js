export const listDatabase = [];

const getDatabase = async () => {
    const response = await firebase.firestore().collection('questions').get();
    response.docs.forEach((doc) => {
        listDatabase.push(doc.data());

    });
    console.log(listDatabase[0].a);
}

getDatabase();
