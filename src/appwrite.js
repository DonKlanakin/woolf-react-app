import {Client, Databases, ID, Query} from "appwrite";

const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

let client = new Client();
client.setEndpoint(ENDPOINT);
client.setProject(PROJECT_ID);

const db = new Databases(client);

export const upVote = async (item) =>
{
	const logPrefix = "upVote: ";

	if (!item)
	{
		return;
	}

	try
	{
		const itemId = item.id;
		const itemName = item.name;
		const itemImageUri = item.image_uris.small || `${window.location.href}/images/poster-not-available.png`;
		const result = await db.listDocuments(DATABASE_ID
			, COLLECTION_ID
			, [
				Query.equal("item_id", itemId)
			]);

		if (result.documents.length > 0)
		{
			const doc = result.documents[0];
			const data = {vote_count: doc.vote_count + 1};
			await db.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, data);
		}
		else
		{
			const data = {item_id: itemId, item_name: itemName, image_uri: itemImageUri};
			await db.createDocument(DATABASE_ID, COLLECTION_ID, itemId, data);
		}
	}
	catch (error)
	{
		console.debug(logPrefix + error.message);
	}
};