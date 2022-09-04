import { DocumentData, DocumentReference } from "firebase-admin/firestore";
import {
  ICampaign,
  ICampaignCharacter,
  IUser,
} from "../../../interfaces/firebase";
import { database } from "../../../libs/firebaseAdmin";

class Campaign {
  private static readonly collection = database.collection("campaigns");

  static async get(uid: string): Promise<ICampaign | null> {
    const docRef = this.collection.doc(uid);
    const snapshot = await docRef.get();

    if (!snapshot.exists) return null;

    const charactersRef = await docRef.collection("characters").listDocuments();

    const characters = charactersRef.map((character) => character);

    const campaign = {
      ...(snapshot.data() as ICampaign),
      uid,
      characters: characters,
    };

    return campaign;
  }

  static async parse(campaign: ICampaign) {
    const characters = await Promise.all(
      campaign.characters.map(async (_character) => {
        const character = _character as DocumentReference;
        const campaignCharacterRef = await character.get();

        if (campaignCharacterRef.exists) {
          const campaignCharacter =
            campaignCharacterRef.data() as ICampaignCharacter;
          const characterRef = campaignCharacter.character as DocumentReference;
          const characterSnapshot = await characterRef.get();

          if (characterSnapshot.exists) {
            const characterData = characterSnapshot.data();

            return {
              ...campaignCharacter,
              character: characterData,
            };
          }
        }
      })
    );

    const dungeonMasterRef = campaign.dungeon_master as DocumentReference;
    const dungeonMaster = await dungeonMasterRef.get();

    return {
      ...campaign,
      dungeon_master: dungeonMaster.data(),
      characters: characters,
    };
  }

  static async getByUser(user: DocumentReference) {
    const campaignsRef = await database
      .collection("campaigns")
      .where("dungeon_master", "==", user)
      .get();

    const campaigns = await Promise.all(
      campaignsRef.docs.map((campaignDoc) => this.get(campaignDoc.id))
    );

    return campaigns;
  }
}

export default Campaign;
