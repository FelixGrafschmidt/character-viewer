import { Character } from "@/models/Character";
import axios, { AxiosResponse } from "axios";

let host: string;

if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
	host = "http://92.60.39.47:8081";
} else {
	host = "http://localhost:8081";
}
export function saveCharacters(characters: Array<Character>, id?: string): Promise<AxiosResponse<string>> {
	if (id !== undefined) {
		return axios.post(host + "/saveList/" + id, characters);
	} else {
		return axios.post(host + "/saveList", characters);
	}
}
export function loadCharacters(id: string): Promise<AxiosResponse<Array<Character>>> {
	return axios.get(host + "/getList/" + id);
}
