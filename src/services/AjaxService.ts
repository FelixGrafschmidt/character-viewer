import { Character } from "@/models/Character";
import { List } from "@/models/List";
import axios, { AxiosResponse } from "axios";

let host: string;

if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
	host = "http://92.60.39.47:8081";
} else {
	host = "http://localhost:8081";
}
export function saveCharacters(characters: Array<Character>, id: string): Promise<AxiosResponse<string>> {
	return axios.post(host + "/saveCharacters/" + id, characters);
}
export function loadCharacters(id: string): Promise<AxiosResponse<Array<Character>>> {
	return axios.get(host + "/getCharacters/" + id);
}

export function saveCollection(collection: Array<List>, id: string): Promise<AxiosResponse<string>> {
	return axios.post(host + "/saveCollection/" + id, collection);
}
export function loadCollection(id: string): Promise<AxiosResponse<Array<List>>> {
	return axios.get(host + "/getCollection/" + id);
}
