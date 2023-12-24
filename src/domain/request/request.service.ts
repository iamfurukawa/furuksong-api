import { Request } from "../definitions/request.interface";

import RequestRepository from "../../infrastructrure/database/request";
import AccountRepository from "../../infrastructrure/database/account";
import Token from "../authentication/token.interface";
import { Role } from "../definitions/account.interface";

class RequestService {

    async retrieveAll(onlyMyRequests: boolean, token: Token) {
        console.log(`class=RequestService m=retrieveAll stage=init onlyMyRequests=${onlyMyRequests}`);
        try {
            let requests: Request[] = [];

            if(token.role === Role.ADMIN && !onlyMyRequests) {
                requests = await RequestRepository.findAll()
            }

            if(token.role === Role.ADMIN && onlyMyRequests) {
                requests = await RequestRepository.findMyRequestsBy(token.uuid);
            }

            if(token.role !== Role.ADMIN) {
                requests = await RequestRepository.findMyRequestsBy(token.uuid);
            }

            console.log(`class=RequestService m=retrieveAll stage=end`);
            return requests;
        } catch (error) {
            console.error(`class=RequestService m=retrieveAll stage=error error=${error}`);
            throw new Error("Error on retrieve all requests");
        }


    }

    async create(request: Request) {
        try {
            console.log(request)
            console.log(`class=RequestService m=create stage=init type=${request.type}`);
            await RequestRepository.save(request as Request);
            console.log(`class=RequestService m=create stage=end`);
        } catch (error) {
            console.error(`class=RequestService m=create stage=error error=${error}`);
            throw new Error("Error on create request");
        }
    }

    async delete(userId: string, uuid: string) {
        try {
            console.log(`class=RequestService m=delete stage=init userId=${userId} uuid=${uuid}`);
            const account = await AccountRepository.findBy(userId);
            if (!account) {
                console.error(`Account ${userId} not found`);
                return;
            }

            const request = await RequestRepository.findOneBy(uuid);

            if (!request) {
                console.error(`Request ${uuid} not found`);
                return;
            }

            if (account.uuid !== request.ownerId) {
                console.error(`Request ${uuid} is not owned by ${userId}`);
                return;
            }

            await RequestRepository.deleteBy(uuid);
            console.log(`class=RequestService m=delete stage=end`);
        } catch (error) {
            console.error(`class=RequestService m=delete stage=error error=${error}`);
            throw new Error("Error on delete request");
        }
    }
}

export default new RequestService();