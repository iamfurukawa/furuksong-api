import { collection, doc, getDocs, limit, orderBy, query, setDoc } from "firebase/firestore";
import ReleaseRepositoryBase, { Release } from "../../../domain/definitions/release.interface";

import FirebaseConfig from "../../configurations/firebase.config";

class ReleaseRepository implements ReleaseRepositoryBase {

    private TABLE_NAME = "releases";

    async save(release: Release): Promise<void> {
        await setDoc(doc(FirebaseConfig.Database(), this.TABLE_NAME, release.date.toISOString()), release, { merge: true });
    }

    async retrieveLast(lasts: number): Promise<Release[]> {
        const releasesFilter = query(collection(FirebaseConfig.Database(), this.TABLE_NAME),
            orderBy('date', 'desc'), limit(lasts));

        const releaseResult = await getDocs(releasesFilter);

        const releases = releaseResult.docs.map(release => {
            const releaseData = release.data();
            return {
                uuid: release.id,
                description: releaseData.description,
                date: releaseData.date
            } satisfies Release;
        });

        return releases;
    }
}

export default new ReleaseRepository();